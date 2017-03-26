function Individual(genome, fitnessFunc){
    this.Genome = genome;
    this.fitnessFunc = fitnessFunc(this.Genome);
}

module.exports = {
    Individual: Individual
};