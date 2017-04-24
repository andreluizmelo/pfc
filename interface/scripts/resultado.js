var resultado = (function(){
    var self = {};
    var id = 0;
    self.Start = function Start(){
        id = Math.floor(Math.random() * 9999) + 1; // numero aleatorio
        ipc.send('envio-params', {
            grupos: escolhaGrupo.GetGroups(),
            professores: escolhaProfessor.GetTeachers(),
            materias: escolhaMateria.GetMaterias(),
            id: id
        });
        TemplateHelper.Display('#content', 'resultado-espera', {});
    };

    self.CheckId = function(idToCheck){
        return id == idToCheck;
    };

    return self;
})();