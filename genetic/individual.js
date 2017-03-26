var _ = require('lodash');

function Individual(genome, fitnessFunction, mutationFunction, combineFunction){
    this.genome = genome;
    this.fitnessFunc = fitnessFunction;
    this.fitness = this.fitnessFunc(this.genome);
    this.mutationFunc = mutationFunction;
    this.crossoverFunc = combineFunction;
}

Individual.prototype.mutate = function(){
    return new Individual(this.mutationFunc(this.genome), this.fitnessFunc, this.mutationFunc, this.crossoverFunc);
};

Individual.prototype.crossover = function( individual){
    var fitnessFunc =this.fitnessFunc;
    var mutationFunc = this.mutationFunc;
    var crossoverFunc = this.crossoverFunc;
    return _.map(this.crossoverFunc(this.genome, individual.genome), 
        function(elem) {   
            return new Individual( elem, fitnessFunc, mutationFunc, crossoverFunc); 
        } );
};

module.exports = {
    Individual: Individual
};