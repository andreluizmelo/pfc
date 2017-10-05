var _ = require('lodash');

function Individual(genome, fitnessFunction, walkFunction){
    this.genome = genome;
    this.walkFunction = walkFunction;
    this.fitnessFunction = fitnessFunction;
    this.bestLocalPosition = _.cloneDeep(genome);
    this.bestLocalFitness = fitnessFunction(genome);
    this.fitness = fitnessFunction(genome);
    this.velocity = _.map(genome, function(elem){return {day: 0, time: 0};});
}

Individual.prototype.walk = function(bestGlobalPosition, inertiaWeight, bestLocalWeight, bestGlobalWeight){
    var newState = this.walkFunction(this.genome, this.velocity, this.bestLocalPosition, bestGlobalPosition, inertiaWeight, bestLocalWeight, bestGlobalWeight);
    this.genome = newState.genome;
    this.velocity = newState.velocity;
    this.fitness = this.fitnessFunction(this.genome);
    if(this.fitnessFunction(this.genome) > this.bestLocalFitness){
        this.bestLocalFitness = this.fitnessFunction(this.genome);
        this.bestLocalPosition = _.cloneDeep(this.genome);
    }
};

module.exports = {
    Individual: Individual
};