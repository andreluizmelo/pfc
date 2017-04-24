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
        }).then(function(response){
            console.log($("#confirmacao-tabs").length);
            $("#confirmacao-tabs a").on("click", function(e){
                e.preventDefault();
                $(this).tab('show');
            });
        });
    };

    self.confirm = function(){
        // TODO
    };
    return self;
})();