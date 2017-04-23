var confirmacao = (function(){
    var self = {};
    
    self.LoadInterface = function(){
        var groups = escolhaGrupo.GetGroups();
        var professores = escolhaProfessor.GetTeachers();
        var materias = escolhaMateria.GetMaterias();
        TemplateHelper.Display("#content", 'confirmacao', { 
            grupos: groups,
            materias: materias,
            professores: professores
        });
    };

    self.confirm = function(){
        // TODO
    };
    return self;
})();