var _ = require('lodash');
var constants = require('./constantes');
var helper = require('./helpers');
var Class = require('./class').Class;

function cspProblem(teachers, subjects, groups, rooms, constantesAdicionais){
    this.teachers = teachers;
    this.subjects = subjects;
    this.groups = groups;
    this.rooms = rooms;
    console.log("peso max aulas" + constantesAdicionais.pesos[constants.restricaoMaximoAulas]);
    console.log("peso min aulas" + constantesAdicionais.pesos[constants.restricaoMinimoAulas]);
    console.log("peso buracos mesma materia: " + constantesAdicionais.pesos[constants.restricaoBuracosMesmaMateria]);
    function getTeacher(id){
        return _.find(teachers, t => t.id == id);
    }

    function getSubject(id){
        return _.find(subjects, s => s.id == id);
    }

    function getGroup(id){
        return _.find(groups, s => s.id == id);
    }

    function getRoom(id){
        return _.find(rooms, s => s.id == id);
    }

    function getRandomRoom(){
        return rooms[Math.floor(Math.random() * rooms.length)];
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
                genome.push( new Class(subjects[i].id, subjects[i].idProfessor, subjects[i].idGroup, getRandomRoom().id, helper.randomDay(), helper.randomTime()));
            }
        }

        return genome;
    }

    function roomCapacityPenalty(genome, debug){
        var numberOfProblems = 0;
        _.each(genome, (classe) => {
            if(getRoom(classe.roomId).capacidade < getGroup(classe.groupId).numeroAlunos)
                numberOfProblems++;
        });
        return numberOfProblems * constants.roomCapacityWeight;
    }

    function roomOverlapPenalty(genome, debug){
        var numberOfOverlaps = 0;
        _.each(genome, function(aula){
            var aulasNaMesmaSala = _.filter(genome, c => c.day == aula.day && c.time == aula.time && c.roomId == aula.roomId);
            numberOfOverlaps += aulasNaMesmaSala.length - 1; // tira ele mesmo
        });
        return (numberOfOverlaps / 2) * constants.roomOverlapWeight;
    }

    function classQuantityPenalty(genome, debug){
        if(constantesAdicionais.pesos[constants.restricaoMaximoAulas] == null && constantesAdicionais.pesos[constants.restricaoMinimoAulas] == null)
            return 0;
        var belowLimit = 0
        var aboveLimit = 0;
        var highLimit = constantesAdicionais.maximoAulas || 100000;
        var lowLimit = constantesAdicionais.minimoAulas || -1;
        //console.log(_.groupBy(genome, 'subjectId'));
        _.each(_.groupBy(genome, 'subjectId'), (classes) => {
            _.each(_.groupBy(classes, 'day'), (elem) => {
                if(elem.length > highLimit) aboveLimit++;
                if(elem.length < lowLimit) belowLimit++;
            });
        });
        return (constantesAdicionais.pesos[constants.restricaoMaximoAulas] != null ? constantesAdicionais.pesos[constants.restricaoMaximoAulas] : 0) * aboveLimit + 
            (constantesAdicionais.pesos[constants.restricaoMinimoAulas] != null ? constantesAdicionais.pesos[constants.restricaoMinimoAulas] : 0) * belowLimit;
    }


    function classWindowsPenalty(genome, debug){
        if(constantesAdicionais.pesos[constants.restricaoBuracosMesmaMateria] == null)
            return 0;
        var numberOfWindows = 0;
        _.each(_.groupBy(genome, 'subjectId'), (classes) => {
            _.each(_.groupBy(classes, 'day'), (elem) => {
                var ordered = _.sortBy(elem, ['time']);
                if( ordered.length > 1){
                    var i;
                    for( i = 1; i < ordered.length; i++){
                        //console.log(ordered[i].time);
                        if( (ordered[i].time - ordered[i-1].time) > 1) numberOfWindows++;
                    }
                }
                //console.log(ordered + '\n' + 'para cima materia dia');
            });
            //console.log('para cima materia apenas')
        });
        //console.log(numberOfWindows + '\n');
        return constantesAdicionais.pesos[constants.restricaoBuracosMesmaMateria] * numberOfWindows;
    }

    function classWindowsByGroupPenalty(genome, debug){
        if(constantesAdicionais.pesos[constants.restricaoBuracos] == null)
            return 0;
        var numberOfWindows = 0;
        _.each(_.groupBy(genome, 'groupId'), (classes) => {
            _.each(_.groupBy(classes, 'day'), (elem) => {
                var ordered = _.sortBy(elem, ['time']);
                if( ordered.length > 1){
                    var i;
                    for( i = 1; i < ordered.length; i++){
                        //console.log(ordered[i].time);
                        if( (ordered[i].time - ordered[i-1].time) > 1) numberOfWindows++;
                    }
                }
                //console.log(ordered + '\n' + 'para cima materia dia');
            });
            //console.log('para cima materia apenas')
        });
        //console.log(numberOfWindows + '\n');
        return constantesAdicionais.pesos[constants.restricaoBuracos] * numberOfWindows;
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

    function overlapPenalty(genome, debug){
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

    function groupAvailabilityPenalty(genome, debug){
        var numberOfProblematicClasses = 0;

        _.each(genome, function(aula){
            
            if( !isGroupAvailable(aula.groupId, aula.day, aula.time))
                numberOfProblematicClasses++;
        });
        if(debug)
            console.log('grupo: ' + numberOfProblematicClasses);
        return constants.groupNotAvailableWeight * numberOfProblematicClasses;
    }

    function roomChangePenalty(genome, debug){
        var numberOfChanges = 0;
        
        if(constantesAdicionais.pesos[constants.restricaoDescolamentos] == null)
            return 0;
        _.each(_.groupBy(genome, 'groupId'), (classes) => {
            _.each(_.groupBy(classes, 'day'), (elem) => {
                var ordered = _.sortBy(elem, ['time']);
                if( ordered.length > 1){
                    var i;
                    var n = 0;
                    for( i = 1; i < ordered.length; i++){
                        //console.log(ordered[i].time);
                        if( ordered[i].roomId != ordered[i-1].roomId) n++;
                    }
                    if(n > 1) numberOfChanges++;
                }
                //console.log(ordered + '\n' + 'para cima materia dia');
            });
        });
        return numberOfChanges * constantesAdicionais.pesos[constants.restricaoDescolamentos];
    }

    function TotalPenalty(genome, debug){
        return teacherAvailabilityPenalty(genome, debug) +
            overlapPenalty(genome, debug) +
            groupAvailabilityPenalty(genome, debug) +
            roomCapacityPenalty(genome, debug) + 
            roomOverlapPenalty(genome, debug) +
            classQuantityPenalty(genome, debug) +
            classWindowsPenalty(genome, debug) +
            roomChangePenalty(genome,debug) +
            classWindowsByGroupPenalty(genome, debug);
    }

    this.fitnessFunction = function fitness(genome, debug){
        return 1 / (1 + TotalPenalty(genome, debug));
    };

    this.mutateFunction = function mutate(genome){
        var newGenome = _.cloneDeep(genome);
        var index = Math.floor(Math.random() * newGenome.length);
        var dice = Math.random();
        if( dice <= 0.33333){ // mudar dia
            // newGenome[index].day = (newGenome[index].day + (Math.random() >= 0.5 ? 1 : -1));
            // if(newGenome[index].day < 0)
            //     newGenome[index].day += constants.maxDay;
            // newGenome[index].day = newGenome[index].day % constants.maxDay;
            newGenome[index].day = helper.randomDay();
        }else if(dice <= 0.66666){ // mudar horario
            // newGenome[index].time = (newGenome[index].time + (Math.random() >= 0.5 ? 1 : -1));
            // if(newGenome[index].time < 0)
            //     newGenome[index].time += constants.maxDay;
            // newGenome[index].time = newGenome[index].time % constants.maxTime;
            newGenome[index].time = helper.randomTime();
        }else{ // troca a sala
            newGenome[index].roomId = getRandomRoom().id;
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

    this.walkFunction = function walk(currentPosition, currentVelocity, bestLocalPosition, bestGlobalPosition, inertiaWeight, bestLocalPositionWeight, bestGlobalPositionWeight){
         var classes = [];
         var newVelocity = [];
         //console.log("velocidade atual: " + currentVelocity);
        _.each(currentPosition, function(elem, index){ // iterates through classes
            var current = elem;
            var local = bestLocalPosition[index];
            var global = bestGlobalPosition[index];
            var vi = currentVelocity[index];

            // apply diffs
            var currentTime = {
                day: current.day,
                time: current.time
            };
            var localTimeDiff = helper.timeDiff(local.day, local.time, currentTime.day, currentTime.time);
            var globalTimeDiff = helper.timeDiff(global.day, global.time, currentTime.day, currentTime.time);

            // apply weights
            var velocity = helper.timeMultiply(vi.day, vi.time, inertiaWeight);
            localTimeDiff = helper.timeMultiply(localTimeDiff.day, localTimeDiff.time, bestLocalPositionWeight);
            globalTimeDiff = helper.timeMultiply(globalTimeDiff.day, globalTimeDiff.time, bestGlobalPositionWeight);
            // apply random weights
            localTime = helper.timeMultiply(localTimeDiff.day, localTimeDiff.time, Math.random());
            globalTimeDiff = helper.timeMultiply(globalTimeDiff.day, globalTimeDiff.time, Math.random());

            var vi_next = helper.timeSum(velocity.day, velocity.time, localTimeDiff.day, localTimeDiff.time); 
            vi_next = helper.timeSum(vi_next.day, vi_next.time, globalTimeDiff.day, globalTimeDiff.time);
            // sum weighted to get results
            var result = helper.timeSum(currentTime.day, currentTime.time, vi_next.day, vi_next.time);
            //result = helper.timeSum(result.day, result.time, globalTime.day, globalTime.time);
            
            //room id
            var dice = Math.random() * (inertiaWeight + bestGlobalPositionWeight + bestLocalPositionWeight);
            var newRoom;
            if(dice <= inertiaWeight)
                newRoom = elem.roomId;
            else if( dice <= bestGlobalPositionWeight + inertiaWeight)
                newRoom = global.roomId;
            else
                newRoom = local.roomId;
            
            // push into array of classes
            classes.push(new Class(elem.subjectId,elem.teacherId,elem.groupId, newRoom, result.day, result.time));
            newVelocity.push(vi_next);
        });
        return {genome: classes, velocity: newVelocity};
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