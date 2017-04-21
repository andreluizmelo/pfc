var escolhaProfessor = (function(){
    var teachers = [];
    var self = {};

    function GetNextIndex(){
        var max =  _.maxBy(teachers, x => x.id);
        return max !== undefined ? max.id + 1 : 1;
    }

    self.GetTeachers = function GetTeachers(){
        return teachers;
    };

    self.GetTeacher = function GetTeacher(id){
        return _.find(teachers, x => x.id == id);
    };

    self.LoadInterface = function(){
        TemplateHelper.Display("#content", 'teacher', { professores: teachers});
    };

    self.ActivateTeacher = function(id){
        $("#lista-professores button").removeClass("active");
        $("#teacher-escolhe-" + id).addClass("active");
        self.LoadGradeDisponibilidade(id);
    };
    self.LoadGradeDisponibilidade = function(id){
        TemplateHelper.Display("#grade-horario-escolha-professores", 
            'grade-disponibilidade', {
                diasDaSemana: diasDaSemana,
                elem: self.GetTeacher(id),
                type: 'professor',
                typeCapitalized: 'Professor',
                'type-plural': 'professores'
            });
    };
    self.AddTeacher = function AddTeacher(){
        var id = GetNextIndex();
        var nome = $("#nome-professor-input").val();
        var disponibilidade = helpers.EmptyDisponibility();
        if(nome == undefined || nome == null || nome == ""){
            toastr.warning("nome não pode ser vazio");
            return;
        }
        teachers.push({
            id: id,
            nome: nome,
            disponibilidade: disponibilidade
        });
        $("#lista-professores").append(
            $("<button>").attr("id","teacher-escolhe-" + id)
                .attr("class", "btn btn-sm btn-escolha-professor")
                .on("click", function(event){
                    escolhaProfessor.ActivateTeacher(id);
                }).html(nome));
        $("#nome-professor-input").val(''); // esvazia
    };
    self.ChangeDisponibility = function ChangeDisponibility(id, day, time){
        console.log(id + '-' + day + '-' + time);
        $("#escolha-professor-tempo-" + day + '-' + time).toggleClass("available");
        //console.log(self.GetTeacher(id));
        var prof = self.GetTeacher(id);
        var disp = _.cloneDeep(prof.disponibilidade);
        disp[day][time] = 1 - disp[day][time];
        prof.disponibilidade = disp;
    };
    return self;
})();