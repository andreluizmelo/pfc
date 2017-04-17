var _ = require('lodash');
var Population = require('./population.js');

const defaultNumberOfSameResultToStop = 10;
const maxNumberOfGenerations = 1000000; 

function CheckProblem(problem){
    if( problem.generatePopulation == null || problem.generatePopulation == undefined)
        throw new Error('função de geração de população nula');
    if( problem.walkFunction == null || problem.walkFunction == undefined)
        throw new Error('função de walk nula');
    if( problem.fitnessFunction == null || problem.fitnessFunction == undefined)
        throw new Error('função de fitness nula');
}

function PsoProblem(problem, populationSize, inertiaWeight, localPositionWeight, globalPositionWeight){
    CheckProblem(problem);

    this.population = new Population.Population( populationSize,
        problem.generatePopulation, problem.walkFunction, problem.fitnessFunction,
        inertiaWeight, localPositionWeight, globalPositionWeight);

    this.displayCurrentSolution = function(){
        console.log('fitness: ' + this.population.bestSolution.fitness);
        console.log('solução: ' + JSON.stringify(this.population.bestSolution.genome, null, 4));
    };
}

PsoProblem.prototype.solveByNumberOfIterations = function(numberOfIterations, displayCurrentBest){
    var i;
    
    for(i = 0; i < numberOfIterations; i++){
        this.population.iterate(displayCurrentBest);
    }
    this.displayCurrentSolution();
};

PsoProblem.prototype.solve = function( numberOfSameResultToStop, displayCurrentBest){
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
    console.log("geração: " + generation);
    this.displayCurrentSolution();
};

module.exports = {
    PsoProblem: PsoProblem
};