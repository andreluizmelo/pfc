var _ = require('lodash');

function Individual(genome, fitnessFunction, mutationFunction, combineFunction){
    this.genome = genome;
    this.fitnessFunc = fitnessFunction;
    this.fitness = this.fitnessFunc(this.Genome);
    this.mutationFunc = mutationFunction;
    this.crossoverFunc = combineFunction;
}

Individual.prototype.mutate = function(){
    return new Individual(this.mutationFunc(this.genome), this.fitnessFunc, this.mutationFunc, this.combineFunc);
};

Individual.prototype.crossover = function( individual){
    return _.map(this.crossoverFunc(this.genome, individual.genome), 
        function(elem) { return new Individual( elem, this.fitnessFunc, this.mutationFunc, this.combineFunc); } );
};

module.exports = {
    Individual: Individual
};