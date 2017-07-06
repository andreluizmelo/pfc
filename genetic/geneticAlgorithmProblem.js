var _ = require('lodash');
var Population = require('./population.js');

const defaultNumberOfSameResultToStop = 10;
const maxNumberOfGenerations = 1000000; 

function CheckProblem(problem){
    if( problem.generatePopulation == null || problem.generatePopulation == undefined)
        throw new Error('função de geração de população nula');
    if( problem.mutateFunction == null || problem.mutateFunction == undefined)
        throw new Error('função de mutação nula');
    if( problem.crossoverFunction == null || problem.crossoverFunction == undefined)
        throw new Error('função de crossover nula');
    if( problem.fitnessFunction == null || problem.fitnessFunction == undefined)
        throw new Error('função de fitness nula');
}

function GeneticAlgorithmProblem(problem, populationSize, mutationProbability, crossoverProbability){
    CheckProblem(problem);

    this.population = new Population.Population(populationSize,
        problem.generatePopulation, problem.mutateFunction, problem.crossoverFunction,
        problem.fitnessFunction, mutationProbability, crossoverProbability);

    this.displayCurrentSolution = function(){
        console.log('fitness: ' + this.population.bestSolution.fitness);
        console.log('solução: ' + JSON.stringify(this.population.bestSolution, null, 4));
    };
}

GeneticAlgorithmProblem.prototype.solveByNumberOfIterations = function(numberOfIterations, displaySolution, displayCurrentBest){
    var i;
    
    for(i = 0; i < numberOfIterations; i++){
        this.population.iterate(displayCurrentBest);
    }
    if(displaySolution) this.displayCurrentSolution();
    return Promise.resolve({
        bestSolution: this.population.bestSolution,
        iteration: i
    });
};

GeneticAlgorithmProblem.prototype.solve = function( numberOfSameResultToStop, displaySolution, displayCurrentBest){
    var minimumRepetition = numberOfSameResultToStop || defaultNumberOfSameResultToStop;
    var generation = 0;
    var numberOfRepetitions = 0;
    var bestFitness = null;
    while( generation < maxNumberOfGenerations && numberOfRepetitions < minimumRepetition){
        generation++;
        this.population.iterate(false);
        
        if(this.population.bestSolution.fitness == bestFitness){
            numberOfRepetitions++;
        }else{
            numberOfRepetitions = 0;
        }
        bestFitness = this.population.bestSolution.fitness;
        if(displayCurrentBest)
            this.displayCurrentSolution();
    }

    //var orderedSolution = _.sortBy(this.population.bestSolution, ['subjectId', 'groupId', 'day', 'time']);
    //this.population.bestSolution = orderedSolution;
    //console.log(orderedSolution);

    if(displaySolution) console.log("geração: " + generation - minimumRepetition);
    if(displaySolution) this.displayCurrentSolution();

    return Promise.resolve({
        bestSolution: this.population.bestSolution,
        iteration: generation - minimumRepetition
    });
};

module.exports = {
    GeneticAlgorithmProblem: GeneticAlgorithmProblem
};