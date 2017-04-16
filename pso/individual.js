var _ = require('lodash');

function Individual(genome, fitnessFunction, walkFunction){
    this.genome = genome;
    this.walkFunction = walkFunction;
    this.fitnessFunction = fitnessFunction;
    this.bestLocalPosition = _.clone(genome);
    this.bestLocalFitness = fitnessFunction(genome);
    this.fitness = fitnessFunction(genome);
}

Individual.prototype.walk = function(bestGlobalPosition, inertiaWeight, bestLocalWeight, bestGlobalWeight){
    this.genome = this.walkFunction(this.genome, this.bestLocalPosition, bestGlobalPosition, inertiaWeight, bestLocalWeight, bestGlobalWeight); 
    this.fitness = this.fitnessFunction(this.genome);
    if(this.fitnessFunction(this.genome) > this.bestLocalFitness){
        this.bestLocalFitness = this.fitnessFunction(this.genome);
        this.bestLocalPosition = _.clone(this.genome);
    }
};

module.exports = {
    Individual: Individual
};