var confirmacao = (function(){
    var self = {};
    
    self.LoadInterface = function(){
        var groups = escolhaGrupo.GetGroups();
        var professores = escolhaProfessor.GetTeachers();
        var materias = escolhaMateria.GetMaterias();
        var salas = escolhaSala.GetSalas();
        TemplateHelper.Display("#content", 'confirmacao', { 
            grupos: groups,
            materias: materias,
            professores: professores,
            salas: salas
        }).then(function(response){
            $("#confirmacao-tabs a").on("click", function(e){
                e.preventDefault();
                $(this).tab('show');
            });
        });
    };

    self.confirm = function(){
        resultado.Start();
    };
    return self;
})();