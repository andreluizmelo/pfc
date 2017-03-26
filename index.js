var knapsack = require('./problems/knapsack.js');
var population = require('./genetic/population');

var list = [
    { weight: 5, value: 10},
    { weight: 3, value: 8},
    { weight: 4, value: 7},
    { weight: 8, value: 14},
    { weight: 5, value: 11},
    { weight: 6, value: 7},
];

var problem = new knapsack.KnapsackProblem( 13, list);

var pop = new population.Population(100,
    problem.generatePopulation, problem.mutateFunction, problem.crossoverFunction,
    problem.fitnessFunction, 0.2, 0.2);

var i;

for(i = 0; i < 1000; i++){
    pop.iterate(false);
}

console.log("ACABOU");
console.log(pop.bestSolution.genome);
console.log(pop.bestSolution.fitness);