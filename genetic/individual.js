var _ = require('lodash');

function Individual(genome, fitnessFunction, mutationFunction, combineFunction){
    this.genome = genome;
    this.fitnessFunc = fitnessFunction;
    this.fitness = fitnessFunction(genome);
    this.mutationFunc = mutationFunction;
    this.crossoverFunc = combineFunction;

    this.crossover = function( individual){
        
        return _.map(combineFunction(this.genome, individual.genome), 
            function(elem) {   
                return new Individual( elem, fitnessFunction, mutationFunction, combineFunction); 
            } );
    };
}

module.exports = {
    Individual: Individual
};