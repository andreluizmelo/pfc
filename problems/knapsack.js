var _ = require('lodash');

function mutate(genome){
    var newGenome = _.clone(genome);
    var index = Math.floor(Math.random() * newGenome.length);
    newGenome[index] = 1 - newGenome[index];
    return newGenome;
}

function crossover(genome1, genome2){
    var middle = Math.floor(genome1.length / 2) - 1;

    var offspring1 = genome1.slice(0, middle).concat(genome2.slice(middle, length - 1));
    var offspring2 = genome2.slice(0, middle).concat(genome1.slice(middle, length - 1));

    return [offspring1, offspring2];
}

function KnapsackProblem( maxWeight, objectList){
    this.crossoverFunction = crossover;
    this.mutateFunction = mutate;
    this.fitnessFunction = function(genome){
        var weight = 0;
        var score = 0;
        var length = genome.length;
        var i;
        for(i = 0; i < length; i++){
            if(genome[i]){
                weight += (objectList[i]).weight;
                score += (objectList[i]).value;
            }
        }
        if(weight > maxWeight)
            return -weight;
        else
            return score;
    };
    this.randomGenome = function(){
        var length = objectList.length;
        var i;
        var genome = [];
        for(i = 0; i < length; i++){
            genome.push(Math.random() >= 0.5 ? 1 : 0);
        }
        return genome;
    };
    this.generatePopulation = function(size){
        var i;
        population = [];
        for(i = 0; i < size; i++){
            population.push(this.randomGenome());
        }
        return population;
    };
    this.display = function(genome){
        console.log(genome);
    };
}

module.exports = {
    KnapsackProblem: KnapsackProblem
};