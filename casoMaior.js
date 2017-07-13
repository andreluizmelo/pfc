var geneticPopulation = require('./genetic/population');
var psoPopulation = require('./pso/population');
var geneticProblem = require('./genetic/geneticAlgorithmProblem');
var Professor = require('./class_scheduling_problem/professor').Professor;
var Group = require('./class_scheduling_problem/group').Group;
var Subject = require('./class_scheduling_problem/subject').Subject;
var CSP = require('./class_scheduling_problem/cspProblem').CSProblem;
var Aula = require('./class_scheduling_problem/class').Class;
var Sala = require('./class_scheduling_problem/room');

var andre = new Professor(1, 'André', [
    [0,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,0,0,0,0,0],
    [0,1,1,1,1,0,0,0,0,0],
    [0,1,1,1,1,0,0,0,0,0]
]);
var thomas = new Professor(2, 'Thomas', [
    [0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,0,0,0,0,0],
    [0,1,1,1,1,0,0,0,0,0]
] );
var estolano = new Professor(3, 'Estolano', [
    [0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,0,0,0,0,0],
    [0,1,1,1,1,0,0,0,0,0],
    [0,1,1,1,1,0,0,0,0,0],
    [0,1,1,1,1,0,0,0,0,0]
] );

var ano5 = new Group( 1, '5 ano', [
    [0,1,1,1,1,0,0,0,0,0],
    [0,1,1,1,1,0,0,0,0,0],
    [0,1,1,1,1,0,0,0,0,0],
    [0,1,1,1,1,0,0,0,0,0],
    [0,1,1,1,1,0,0,0,0,0]
], 30);

var ano4 = new Group( 2, '4 ano', [
    [0,1,1,1,1,0,0,0,0,0],
    [0,1,1,1,1,0,0,0,0,0],
    [0,1,1,1,1,0,0,0,0,0],
    [0,1,1,1,1,0,0,0,0,0],
    [0,1,1,1,1,0,0,0,0,0]
], 20);


var sala1 = new Sala(1, 'sala 1', 32);
var sala2 = new Sala(2, 'xereu', 22);

var teachers = [andre, thomas, estolano];
var grupos = [ano5, ano4];
var salas = [sala1, sala2];
                    // id, nome, numClass, grupo, professor
var calculo = new Subject(1, 'Calculo', 3, 1, 1);
var algoritmos = new Subject(2, 'Algoritmos', 3, 1, 2);
var sistInfo = new Subject(3, 'Sistemas Info', 3, 1, 3);
var direito = new Subject(4, 'Direito', 3, 2, 1);

var materias = [calculo, algoritmos, sistInfo, direito];

var problemaCS = new CSP(teachers, materias, grupos, salas);

var gaCSP = new geneticProblem.GeneticAlgorithmProblem(problemaCS, 100, 0.4, 0.3);

console.log("problema csp");
gaCSP.solveByNumberOfIterations(1000, true);
//gaCSP.solve(100,true);
