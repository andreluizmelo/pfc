var _ = require('lodash');
var constants = require('./constantes');
var helper = require('./helpers');
var Class = require('./class').Class;

function cspProblem(teachers, subjects, groups){
    this.teachers = teachers;
    this.subjects = subjects;
    this.groups = groups;

    function getTeacher(id){
        return _.find(teachers, t => t.id == id);
    }

    function getSubject(id){
        return _.find(subjects, s => s.id == id);
    }

    function getGroup(id){
        return _.find(groups, s => s.id == id);
    }

    function isGroupAvailable(groupId, day, time){
        var group = getGroup(groupId);
        if(group === null || group === undefined)
            throw new Error('id de grupo inválido: ' + groupId);
        return group.isAvailable(day, time);
    }

    function isTeacherAvailable( teacherId, day, time){
        var teacher = getTeacher(teacherId);
        if(teacher === null || teacher === undefined)
            throw new Error('id de professor inválido: ' + teacherId);
        return teacher.isAvailable(day, time);
    }

    function randomGenome(){
        var genome = [];
        var i;
        var j;

        for( i = 0; i < subjects.length; i++){
            for( j = 0; j < subjects[i].numClasses; j++){
                genome.push( new Class(subjects[i].id, subjects[i].idProfessor, subjects[i].idGroup,helper.randomDay(), helper.randomTime()));
            }
        }

        return genome;
    }

    function tooMuchClassesSameDayPenalty(genome, debug){
        var aboveLimit = 0;
        var limit = 3;
        //console.log(_.groupBy(genome, 'subjectId'));
        _.each(_.groupBy(genome, 'subjectId'), (classes) => {
            _.each(_.groupBy(classes, 'day'), (elem) => {
                if(elem.length > limit) aboveLimit++;
            });
        });
        return 2 * aboveLimit;
    }

    function teacherAvailabilityPenalty(genome, debug){
        var numberOfProblematicClasses = 0;
        _.each(genome, function(aula){
            if( !isTeacherAvailable(aula.teacherId, aula.day, aula.time))
                numberOfProblematicClasses++;
        });
        if(debug)
            console.log('teacher: ' + numberOfProblematicClasses);
        return constants.teacherNotAvailableWeight * numberOfProblematicClasses;
    }

    function OverlapPenalty(genome, debug){
        var numberOfOverlaps = 0;
        _.each(genome, function(aula){
             var eita = _.filter(genome, c => c.day == aula.day && c.time == aula.time && (c.groupId == aula.groupId || c.teacherId == aula.teacherId));
             //console.log(eita);
             numberOfOverlaps += eita.length - 1;
        });
        if(debug)
            console.log('overlaps: ' + (numberOfOverlaps / 2));
        return constants.overlapWeight * (numberOfOverlaps / 2); // divide por 2 pois cada sobreposição é contada duas vezes
    }

    function GroupAvailabilityPenalty(genome, debug){
        var numberOfProblematicClasses = 0;

        _.each(genome, function(aula){
            
            if( !isGroupAvailable(aula.groupId, aula.day, aula.time))
                numberOfProblematicClasses++;
        });
        if(debug)
            console.log('grupo: ' + numberOfProblematicClasses);
        return constants.groupNotAvailableWeight * numberOfProblematicClasses;
    }

    function TotalPenalty(genome, debug){
        return teacherAvailabilityPenalty(genome, debug) +
            OverlapPenalty(genome, debug) +
            GroupAvailabilityPenalty(genome, debug) +
            tooMuchClassesSameDayPenalty(genome,debug);
    }

    this.fitnessFunction = function fitness(genome, debug){
        return 1 / (1 + TotalPenalty(genome, debug));
    };

    this.mutateFunction = function mutate(genome){
        var newGenome = _.cloneDeep(genome);
        var index = Math.floor(Math.random() * newGenome.length);
        if( Math.random() >= 0.5){ // mudar dia
            // newGenome[index].day = (newGenome[index].day + (Math.random() >= 0.5 ? 1 : -1));
            // if(newGenome[index].day < 0)
            //     newGenome[index].day += constants.maxDay;
            // newGenome[index].day = newGenome[index].day % constants.maxDay;
            newGenome[index].day = helper.randomDay();
        }else{ // mudar horario
            // newGenome[index].time = (newGenome[index].time + (Math.random() >= 0.5 ? 1 : -1));
            // if(newGenome[index].time < 0)
            //     newGenome[index].time += constants.maxDay;
            // newGenome[index].time = newGenome[index].time % constants.maxTime;
            newGenome[index].time = helper.randomTime();
        }
        return newGenome;
    };

    this.crossoverFunction = function crossover(genome1, genome2){
        var middle = Math.floor(genome1.length / 2) - 1;
        length = genome1.length;

        var offspring1 = genome1.slice(0, middle).concat(genome2.slice(middle, length));
        var offspring2 = genome2.slice(0, middle).concat(genome1.slice(middle, length));

        return [offspring1, offspring2];
    };

    this.walkFunction = function walk(currentPosition, bestLocalPosition, bestGlobalPosition, inertiaWeight, bestLocalPositionWeight, bestGlobalPositionWeight){
         var classes = [];
        _.each(currentPosition, function(elem, index){ // iterates through classes
            var current = elem;
            var local = bestLocalPosition[index];
            var global = bestGlobalPosition[index];
            
            // apply diffs
            local = helper.timeDiff(local.day, local.time, current.day, current.time);
            global = helper.timeDiff(global.day, global.time, current.day, current.time);

            // apply weights
            current = helper.timeMultiply(current.day, current.time, inertiaWeight);
            local = helper.timeMultiply(local.day, local.time, bestLocalPositionWeight);
            global = helper.timeMultiply(global.day, global.time, bestGlobalPositionWeight);
            // apply random weights
            local = helper.timeMultiply(local.day, local.time, Math.random());
            global = helper.timeMultiply(global.day, global.time, Math.random());

            // sum weighted to get results
            var result = helper.timeSum(current.day, current.time, local.day, local.time);
            result = helper.timeSum(result.day, result.time, global.day, global.time);
            
            // push into array of classes
            classes.push(new Class(elem.subjectId,elem.teacherId,elem.groupId, result.day, result.time));
        });
        return classes;
    };

    this.generatePopulation = function(size){
        var i;
        population = [];
        for(i = 0; i < size; i++){
            population.push( randomGenome());
        }
        return population;
    };
}

module.exports = {
    CSProblem: cspProblem
};