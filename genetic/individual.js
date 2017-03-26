function Individual(genome, fitnessFunction, mutationFunction, combineFunction){
    this.genome = genome;
    this.fitnessFunc = fitnessFunction;
    this.fitness = this.fitnessFunc(this.Genome);
    this.mutationFunc = mutationFunction;
    this.combineFunc = combineFunction;
}

Individual.prototype.mutate = function(){
    return new Individual(this.mutationFunc(this.genome), this.fitnessFunc, this.mutationFunc, this.combineFunc);
};

Individual.prototype.combine = function( individual){
    return new Individual( this.combineFunc(this.genome, individual.genome), 
        this.fitnessFunc, this.mutationFunc, this.combineFunc);
};

module.exports = {
    Individual: Individual
};