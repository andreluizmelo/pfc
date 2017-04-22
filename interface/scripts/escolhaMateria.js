var escolhaMateria = (function(){
    var materias = [];
    var self = {};

    function GetNextIndex(){
        var max =  _.maxBy(materias, x => x.id);
        return max !== undefined ? max.id + 1 : 1;
    }

    self.GetMateria = function GetMateria(id){

    };
    self.GetMaterias = function GetMaterias(id){

    };

    self.LoadInterface = function(){
        var groups = escolhaGrupo.GetGroups();
        var professores = escolhaProfessor.GetTeachers();
        TemplateHelper.Display("#content", 'class', { 
            grupos: groups,
            materias: materias,
            professores: professores
        }).then((response) => {
            if(response){
                TemplateHelper.Display("#escolha-materia-div", 'lista-materias', 
                    { 
                        grupos: groups,
                        materias: materias,
                        professores: professores
                    });
            }else{
                console.log("Deu ruim :(");
            }
        });
    };
    self.AddMateria = function AddMateria(id){
        var id = GetNextIndex();
        var nome = $('nome-materia-input').val();
        var numClasses = $('aula-materia-input').val();
        var grupo = $('materia-grupo-input').val();
        var professor = $('materia-professor-input').val();
        
        $('nome-materia-input').val('');
        $('aula-materia-input').val(1);
        $('materia-grupo-input').val('');
        $('materia-professor-input').val('');
    };
    self.RemoveMateria = function RemoveMateria(id){

    };
    self.reset = function reset(){
        materias = [];
    };
    return self;
})();