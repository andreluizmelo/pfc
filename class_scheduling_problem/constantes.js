module.exports = {
    //maxDay: 2, // apenas 3 dias para teste
    //maxTime: 3, // apenas 4 tempos para teste
    maxDay: 4, // seg = 0, sex = 4
    maxTime: 9, // 7:30 = 0, 8:25, 9:20, 10:25, 11:15, 12:10, 13:.., 14:.., 15:.. 16:.. = 10
    teacherNotAvailableWeight: 35,
    groupNotAvailableWeight: 35,
    overlapWeight: 25,
    roomOverlapWeight: 20,
    roomCapacityWeight: 25,
    restricaoMinimoAulas: "Número mínimo de aulas por dia",
    restricaoMaximoAulas: "Número máximo de aulas por dia",
    restricaoBuracosMesmaMateria: "Evitar buracos entre aulas da mesma matéria",
    restricaoBuracos: "Evitar buracos entre aulas",
    restricaoDescolamentos: "Deslocamentos entre salas"
};