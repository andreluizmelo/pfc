var _ = require('lodash');



function crossover(genome1, genome2){
    return [
        {
            x: genome1.x,
            y: genome2.y
        },
        {
            x: genome2.x,
            y: genome1.y
        }
    ];
}

function walk(currentPosition, bestLocalPosition, bestGlobalPosition, inertiaWeight, bestLocalPositionWeight, bestGlobalPositionWeight){
    var localRandomWeight = Math.random();
    var globalRandomWeight = Math.random();
    return {
        x: currentPosition.x * inertiaWeight + 
            ( bestLocalPosition.x - currentPosition.x  ) * bestLocalPositionWeight  * localRandomWeight +
            ( bestGlobalPosition.x - currentPosition.x ) * bestGlobalPositionWeight * globalRandomWeight,
        y: currentPosition.y * inertiaWeight +
            ( bestLocalPosition.y - currentPosition.y  ) * bestLocalPositionWeight  * localRandomWeight +
            ( bestGlobalPosition.y - currentPosition.y ) * bestGlobalPositionWeight * globalRandomWeight
    }
}

function distancia(pointA, pointB){
    return Math.sqrt(  (pointA.x - pointB.x) * (pointA.x - pointB.x) + (pointA.y - pointB.y) * (pointA.y - pointB.y));
}

function DistanciaProblem(width, height, pointList){ //dimensoes da area e lista de pontos nessa area    
    this.crossoverFunction = crossover;
    this.walkFunction = walk;
    this.mutateFunction = function mutate(genome){
        var newGenome = _.clone(genome);
        if (Math.random() >= 0.5){
            newGenome.x = Math.random() * width;
        }else{
            newGenome.y = Math.random() * height;
        }
        return newGenome;
    };
    this.fitnessFunction = function(genome){ // retorna 1 / (1 + soma das distancias ate os pontos)
        var total = 0;
         _.each(pointList, function(elem){
             total += distancia(elem, genome);
         });
         
         return 1 / ( 1 + total);
    };
    function randomGenome(){
        return {
            x: Math.random() * width,
            y: Math.random() * height
        };
    }
    this.generatePopulation = function(size){
        var i;
        population = [];
        for(i = 0; i < size; i++){
            population.push(randomGenome());
        }
        return population;
    }
}

module.exports = {
    DistanciaProblem: DistanciaProblem
};