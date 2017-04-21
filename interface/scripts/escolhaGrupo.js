var escolhaGrupo = (function(){
    var groups = [];
    var self = {};

    function GetNextIndex(){
        var max =  _.maxBy(groups, x => x.id);
        return max !== undefined ? max.id + 1 : 1;
    }

    self.GetGroups = function GetGroups(){
        return groups;
    };

    self.GetGroup = function GetGroup(id){
        return _.find(groups, x => x.id == id);
    };

    self.LoadInterface = function(){
        TemplateHelper.Display("#content", 'group', { grupos: groups});
    };

    self.ActivateGroup = function(id){
        $("#lista-grupos button").removeClass("active");
        $("#grupo-escolhe-" + id).addClass("active");
        self.LoadGradeDisponibilidade(id);
    };
    self.LoadGradeDisponibilidade = function(id){
        TemplateHelper.Display("#grade-horario-escolha-grupos", 
            'grade-disponibilidade', {
                diasDaSemana: diasDaSemana,
                elem: self.GetGroup(id),
                type: 'grupo',
                typeCapitalized: 'Grupo',
                'type-plural': 'grupos'
            });
    };
    self.AddGroup = function AddGroup(){
        var id = GetNextIndex();
        var nome = $("#nome-grupo-input").val();
        if(nome == undefined || nome == null || nome == ""){
            toastr.warning("nome não pode ser vazio");
            return;
        }
        var disponibilidade = helpers.EmptyDisponibility();
        groups.push({
            id: id,
            nome: nome,
            disponibilidade: disponibilidade
        });
        $("#lista-grupos").append(
            $("<button>").attr("id","grupo-escolhe-" + id)
                .attr("class", "btn btn-sm btn-escolha-grupo")
                .on("click", function(event){
                    escolhaGrupo.ActivateGroup(id);
                }).html(nome));
        $("#nome-grupo-input").val(''); // esvazia
    };
    self.ChangeDisponibility = function ChangeDisponibility(id, day, time){
        console.log(id + '-' + day + '-' + time);
        $("#escolha-grupo-tempo-" + day + '-' + time).toggleClass("available");
        //console.log(self.GetTeacher(id));
        var grupo = self.GetGroup(id);
        var disp = _.cloneDeep(grupo.disponibilidade);
        disp[day][time] = 1 - disp[day][time];
        grupo.disponibilidade = disp;
    };
    return self;
})();