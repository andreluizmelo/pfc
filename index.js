var knapsack = require('./problems/knapsack');
var geneticPopulation = require('./genetic/population');
var typing = require('./problems/typingmonkeys');
var menorDistancia = require('./problems/menorSomaDistancia');
var psoPopulation = require('./pso/population');
var geneticProblem = require('./genetic/geneticAlgorithmProblem');
var Professor = require('./class_scheduling_problem/professor').Professor;
var Group = require('./class_scheduling_problem/group').Group;
var Subject = require('./class_scheduling_problem/subject').Subject;
var CSP = require('./class_scheduling_problem/cspProblem').CSProblem;


/*
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

var pointList = [
    {
        x: 40,
        y: 40
    },
    {
        x: 60,
        y: 80
    },
    {
        x: 50,
        y: 60
    }
];

var problem = new knapsack.KnapsackProblem(13, list);
var problemBigger = new knapsack.KnapsackProblem( 6404180, list2);
var problemMonkeys = new typing.TypingMonkeys('hello world');

var gp1 = new geneticProblem.GeneticAlgorithmProblem(problem, 100, 0.3, 0.5);
var gp2 = new geneticProblem.GeneticAlgorithmProblem(problemBigger, 100, 0.6, 0.7);
var gp3 = new geneticProblem.GeneticAlgorithmProblem(problemMonkeys, 100, 0.3, 0.5);


var problem3 = new menorDistancia.DistanciaProblem(100,100,pointList);



var pop3 = new psoPopulation.Population(100, problem3.generatePopulation, problem3.walkFunction, problem3.fitnessFunction, 1.0, 0.6, 0.6);
var i;

console.log("problema 1");
gp1.solveByNumberOfIterations(1000, false);

console.log(" ");
console.log("problema 2");
gp2.solve(100);

console.log(" ");
console.log("problema macacos digitadores");
gp3.solve();

//console.log(pop3.individuals);
for(i = 0; i < 50; i++){
    pop3.iterate(false);
}

console.log(" ");
console.log("problema 3");
console.log(pop3.bestSolution.genome);
console.log(pop3.bestSolution.fitness);
*/

var andre = new Professor(1, 'André', [
    [0,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
]);
var thomas = new Professor(2, 'Thomas', [
    [0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
] );
var estolano = new Professor(3, 'Estolano', [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,0,0,0,0,0,0]
] );

var teachers = [andre, thomas, estolano];

var ano5 = new Group( 1, '5 ano', [
    [0,1,1,1,0,0,0,0,0,0],
    [0,1,1,1,0,0,0,0,0,0],
    [0,1,1,1,0,0,0,0,0,0]
]);

var grupos = [ano5];

var calculo = new Subject(1, 'Calculo', 3, 1, 1);
var algoritmos = new Subject(2, 'Algoritmos', 3, 1, 2);
var sistInfo = new Subject(3, 'Sistemas Info', 3, 1, 3);

var materias = [calculo, algoritmos, sistInfo];

var problemaCS = new CSP(teachers, materias, grupos);

var gaCSP = new geneticProblem.GeneticAlgorithmProblem(problemaCS, 500, 0.3, 0.5);

console.log("problema csp");
gaCSP.solveByNumberOfIterations(1000, true);