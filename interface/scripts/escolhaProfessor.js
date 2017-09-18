var escolhaProfessor = (function(){
    var teachers = [];
    var self = {};

    function GetNextIndex(){
        var max =  _.maxBy(teachers, x => x.id);
        return max !== undefined ? max.id + 1 : 1;
    }

    self.set = function(profs){
        teachers = profs;
    };

    self.GetTeachers = function GetTeachers(){
        return teachers;
    };

    self.GetTeacher = function GetTeacher(id){
        return _.find(teachers, x => x.id == id);
    };

    self.LoadInterface = function(){
        TemplateHelper.Display("#content", 'teacher', { professores: teachers});
    };

    self.ActivateTeacher = function(id, lock){
        $("#lista-professores button").removeClass("active");
        $("#teacher-escolhe-" + id).addClass("active");
        self.LoadGradeDisponibilidade(id, lock);
    };
    self.LoadGradeDisponibilidade = function(id, lock){
        var editable = true;
        if(lock == true)
            editable = false;
        TemplateHelper.Display("#grade-horario-escolha-professores", 
            'grade-disponibilidade', {
                diasDaSemana: diasDaSemana,
                horarios: horarios,
                elem: self.GetTeacher(id),
                type: 'professor',
                typeCapitalized: 'Professor',
                'type-plural': 'professores',
                editable: editable
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
        $("#escolha-professor-tempo-" + day + '-' + time).toggleClass("available");
        var prof = self.GetTeacher(id);
        var disp = _.cloneDeep(prof.disponibilidade);
        disp[day][time] = 1 - disp[day][time];
        prof.disponibilidade = disp;
    };
    self.MakeDayAvailable = function MakeDayAvailable(id, day){
        var prof = self.GetTeacher(id);
        var disp = _.cloneDeep(prof.disponibilidade);
        var i;
        for(i = 0; i < disp[day].length; i++){
            $("#escolha-professor-tempo-" + day + '-' + i).addClass("available");
            disp[day][i] = 1;
        }
        prof.disponibilidade = disp;
    };

    self.reset = function reset(){
        this.teachers = [];
    };

    return self;
})();