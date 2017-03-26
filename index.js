var knapsack = require('./problems/knapsack.js');
var population = require('./genetic/population');


// capacidade 13 maximo 29
var list = [
    { weight: 5, value: 10},
    { weight: 3, value: 8},
    { weight: 4, value: 7},
    { weight: 8, value: 14},
    { weight: 5, value: 11},
    { weight: 6, value: 7},
];


// capacidade 6404180 maximo 13549094
var list2 = [
    { weight: 382745, value: 825594},
    { weight: 799601, value: 1677009},
    { weight: 909247, value: 1676628},
    { weight: 729069, value: 1523970},
    { weight: 467902, value: 943972},
    { weight: 44328, value: 97426},
    { weight: 34610, value: 69666},
    { weight: 698150, value: 1296457},
    { weight: 823460, value: 1679693},
    { weight: 903959, value: 1902996},
    { weight: 853665, value: 1844992},
    { weight: 551830, value: 1049289},
    { weight: 610856, value: 1252836},
    { weight: 670702, value: 1319836},
    { weight: 488960, value: 953277},
    { weight: 951111, value: 2067538},
    { weight: 323046, value: 675367},
    { weight: 446298, value: 853655},
    { weight: 931161, value: 1826027},
    { weight: 31385, value: 65731},
    { weight: 496951, value: 901489},
    { weight: 264724, value: 577243},
    { weight: 224916, value: 466257},
    { weight: 169684, value: 369261},
];

var problem = new knapsack.KnapsackProblem( 6404180, list2);

var pop = new population.Population(100,
    problem.generatePopulation, problem.mutateFunction, problem.crossoverFunction,
    problem.fitnessFunction, 0.3, 0.5);

var i;

for(i = 0; i < 1000; i++){
    pop.iterate(false);
}

console.log("ACABOU");
console.log(pop.bestSolution.genome);
console.log(pop.bestSolution.fitness);