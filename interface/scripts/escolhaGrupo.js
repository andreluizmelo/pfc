var escolhaGrupo = (function(){
    var groups = [];
    var self = {};

    function GetNextIndex(){
        var max =  _.maxBy(groups, x => x.id);
        return max !== undefined ? max.id + 1 : 1;
    }

    self.set = function(grupos){
        groups = grupos;
    };

    self.GetGroups = function GetGroups(){
        return groups;
    };

    self.GetGroup = function GetGroup(id){
        return _.find(groups, x => x.id == id);
    };

    self.LoadInterface = function(){
        TemplateHelper.Display("#content", 'group', { grupos: groups});
    };

    self.ActivateGroup = function(id, lock){
        $("#lista-grupos button").removeClass("active");
        $("#grupo-escolhe-" + id).addClass("active");
        self.LoadGradeDisponibilidade(id, lock);
    };
    self.LoadGradeDisponibilidade = function(id, lock){
        var editable = true;
        if(lock == true)
            editable = false;
        TemplateHelper.Display("#grade-horario-escolha-grupos", 
            'grade-disponibilidade', {
                diasDaSemana: diasDaSemana,
                horarios: horarios,
                elem: self.GetGroup(id),
                type: 'grupo',
                typeCapitalized: 'Grupo',
                'type-plural': 'grupos',
                editable: editable,
                aditionalText: self.GetGroup(id).numeroAlunos + ' alunos'
            });
    };
    self.AddGroup = function AddGroup(){
        var id = GetNextIndex();
        var nome = $("#nome-grupo-input").val();
        var numeroAlunos = $("#alunos-grupo-input").val() * 1;
        if(nome == undefined || nome == null || nome == ""){
            toastr.warning("nome não pode ser vazio");
            return;
        }
        var disponibilidade = helpers.EmptyDisponibility();
        groups.push({
            id: id,
            nome: nome,
            disponibilidade: disponibilidade,
            numeroAlunos: numeroAlunos
        });
        $("#lista-grupos").append(
            $("<button>").attr("id","grupo-escolhe-" + id)
                .attr("class", "btn btn-sm btn-escolha-grupo")
                .on("click", function(event){
                    escolhaGrupo.ActivateGroup(id);
                }).html(nome));
        $("#nome-grupo-input").val(''); // esvazia
        $("#alunos-grupo-input").val('');
    };
    self.ChangeDisponibility = function ChangeDisponibility(id, day, time){
        $("#escolha-grupo-tempo-" + day + '-' + time).toggleClass("available");
        //console.log(self.GetTeacher(id));
        var grupo = self.GetGroup(id);
        var disp = _.cloneDeep(grupo.disponibilidade);
        disp[day][time] = 1 - disp[day][time];
        grupo.disponibilidade = disp;
    };
    self.MakeDayAvailable = function MakeDayAvailable(id, day){
        var grupo = self.GetGroup(id);
        var disp = _.cloneDeep(grupo.disponibilidade);
        var i;
        for(i = 0; i < disp[day].length; i++){
            $("#escolha-grupo-tempo-" + day + '-' + i).addClass("available");
            disp[day][i] = 1;
        }
        grupo.disponibilidade = disp;
    };
    
    self.reset = function reset(){
        groups = [];
    };

    return self;
})();