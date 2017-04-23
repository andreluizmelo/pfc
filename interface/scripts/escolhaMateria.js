var escolhaMateria = (function(){
    var materias = [];
    var self = {};

    function GetNextIndex(){
        var max =  _.maxBy(materias, x => x.id);
        return max !== undefined ? max.id + 1 : 1;
    }

    self.GetMateria = function GetMateria(id){
        return _.find(materias, x => x.id == id);
    };
    self.GetMaterias = function GetMaterias(id){
        return materias;
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
                self.LoadListaMaterias();
            }else{
                console.log("Deu ruim :(");
            }
        });
    };
    self.LoadListaMaterias = function(){
        var groups = escolhaGrupo.GetGroups();
        var professores = escolhaProfessor.GetTeachers();
        console.log(materias);
        TemplateHelper.Display("#escolha-materia-div", 'lista-materias', 
            { 
                grupos: groups,
                materias: materias,
                professores: professores
            });
    };
    self.AddMateria = function AddMateria(){
        var id = GetNextIndex();
        var nome = $('#nome-materia-input').val();
        var numClasses = $('#aula-materia-input').val();
        var grupo = $('#materia-grupo-input').val() * 1;
        var professor = $('#materia-professor-input').val() * 1; // transformar em inteiro rs
        
        if(nome == null || nome == ''){
            toastr.warning("Nome não pode estar vazio");
            return;
        }
        if(grupo == null || grupo == ''){
            toastr.warning("Escolha um grupo");
            return;
        }
        if(professor == null || professor == ''){
            toastr.warning("Escolha um professor");
            return;
        }

        materias.push({
            id: id,
            nome: nome,
            numClasses: numClasses,
            grupo: grupo,
            professor: professor
        });
        self.LoadListaMaterias();
        $('#nome-materia-input').val('');
        $('#aula-materia-input').val(1);
        $('#materia-grupo-input').val('');
        $('#materia-professor-input').val('');
    };
    self.RemoveMateria = function RemoveMateria(id){
        _.remove(materias, (materia) => materia.id == id);
        self.LoadListaMaterias();
    };
    self.LimparMaterias = function(){
        self.reset();
        self.LoadListaMaterias();
    };
    self.reset = function reset(){
        materias = [];
    };
    return self;
})();