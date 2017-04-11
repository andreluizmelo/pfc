var _ = require('lodash');
var individual = require('./individual.js');

function Population( populationSize, populationGenerationFunction, walkFunction, fitnessFunction, globalPositionWeight){
    this.individuals = _.map(populationGenerationFunction(populationSize), function(elem){ 
        return new individual.Individual(elem, fitnessFunction, walkFunction);
    });
    
    this.sortByFitness = function(){
        this.individuals = _.sortBy(this.individuals, x => -x.fitness); // ordena do maior pro menor fitness
    };
    
    this.bestSolution = null;

    this.sortByFitness();
    this.bestSolution = this.individuals[0];
    this.iterate = function(displayBest){
        var best = this.bestSolution;
        _.each(this.individuals, function(elem){
            elem.walk(best.genome, globalPositionWeight);
        });      
        this.sortByFitness();

        // compara com melhor solucao anterior
        if( (this.individuals[0]).fitness > (this.bestSolution != null ? this.bestSolution.fitness : -Math.min() ))
            this.bestSolution = _.clone(this.individuals[0]);
        if(displayBest)
            console.log(this.bestSolution);
    };
}

module.exports = {
    Population: Population
};