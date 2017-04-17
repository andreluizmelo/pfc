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
                genome.push( new Class(subjects[i].idProfessor, subjects[i].id, subjects[i].idGroup,helper.randomDay(), helper.randomTime()));
            }
        }

        return genome;
    }


    function teacherAvailabilityPenalty(genome){
        var numberOfProblematicClasses = 0;
        _.each(genome, function(aula){
            if( isTeacherAvailable(aula.teacherId, aula.day, aula.time))
                numberOfProblematicClasses++;
        });
        return constants.teacherNotAvailableWeight * numberOfProblematicClasses;
    }

    function OverlapPenalty(genome){
        var numberOfOverlaps = 0;
        _.each(genome, function(aula){
            numberOfOverlaps += _.filter(genome, c => c.day == aula.day && c.time == aula.time).length;
        });
        return constants.overlapWeight * (numberOfOverlaps / 2); // divide por 2 pois cada sobreposição é contada duas vezes
    }

    function GroupAvailabilityPenalty(genome){
        var numberOfProblematicClasses = 0;

        _.each(genome, function(aula){
            
            if( isGroupAvailable(aula.groupId, aula.day, aula.time))
                numberOfProblematicClasses++;
        });
        return constants.groupNotAvailableWeight * numberOfProblematicClasses;
    }

    function TotalPenalty(genome){
        return teacherAvailabilityPenalty(genome) +
            OverlapPenalty(genome) +
            GroupAvailabilityPenalty(genome);
    }

    this.fitnessFunction = function fitness(genome){
        return 1 / (1 + TotalPenalty(genome));
    };

    this.mutateFunction = function mutate(genome){
        var newGenome = _.clone(genome);
        var index = Math.floor(Math.random() * newGenome.length);
        if( Math.random() >= 0.5){ // mudar dia
            newGenome[index].day = (newGenome[index].day + (Math.random() >= 0.5 ? 1 : -1));
            if(newGenome[index].day < 0)
                newGenome[index].day += constants.maxDay;
            newGenome[index].day = newGenome[index].day % constants.maxDay;
        }else{ // mudar horario
            newGenome[index].time = (newGenome[index].time + (Math.random() >= 0.5 ? 1 : -1));
            if(newGenome[index].time < 0)
                newGenome[index].time += constants.maxDay;
            newGenome[index].time = newGenome[index].time % constants.maxTime;
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
        throw new Error('not implemented yet');
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