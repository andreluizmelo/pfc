var _ = require('lodash');
var individual = require('./individual.js');

function Population( populationSize, populationGenerationFunction, mutationFunction, crossoverFunction, fitnessFunction, mutationProbability, crossoverProbability){
    this.individuals = _.map(populationGenerationFunction(populationSize), function(elem){ 
        return new individual.Individual(elem, fitnessFunction,mutationFunction, crossoverFunction);
    });
    this.bestSolution = null;

    this.breed = function(){
        var numberOfDeadGuys = Math.round(crossoverProbability * populationSize);
        // manter numero par pois de cada crossover saem dois filhos
        if(numberOfDeadGuys % 2 !== 0)
            numberOfDeadGuys += 1;

        var numberOfCrossovers = numberOfDeadGuys / 2;

        var i;

        var mates = this.individuals.slice(1, 1 + numberOfCrossovers);
        var bestGuy = this.individuals[0];
        var offsprings = _.flatMap(mates, function(mate){ return bestGuy.crossover(mate); });

        this.individuals.splice(this.individuals.length - numberOfDeadGuys, numberOfDeadGuys);
        this.individuals = this.individuals.concat(offsprings);
    };

    this.mutate = function(){
        
        this.individuals = _.map(this.individuals, function(elem){
            var coin = Math.random();
            if(coin < mutationProbability)
                return elem.mutate();
            else
                return elem;
        });
    };

    this.sortByFitness = function(){
        this.individuals = _.sortBy(this.individuals, x => -x.fitness); // ordena do maior pro menor fitness
    };

    this.iterate = function(displayBest){
        
        this.breed();
        this.mutate();
        this.sortByFitness();

        // compara com melhor solucao anterior
        if( (this.individuals[0]).fitness > (this.bestSolution != null ? this.bestSolution.fitness : -Math.min() ))
            this.bestSolution = _.clone(this.individuals[0]);
        if(displayBest)
            console.log(this.bestSolution.fitness);
    };
}

module.exports = {
    Population: Population
};