var detalhesHistorico = (function($){
    var self = {};

    var solucao = {};
    var materias = [];
    var salas = [];
    var grupos = [];
    var professores = [];

    self.reset = function(){
        solucao = {};
        materias = [];
        salas = [];
        grupos = [];
        professores = [];
    }

    self.LoadInterface = function(nome){
        self.reset();
        historicoHelper.getHistorico(nome).then((hist) =>{
            
            solucao = hist.solucoes[0].solucao;
            materias = hist.info.materias;
            salas = hist.info.salas;
            grupos = hist.info.grupos;
            professores = hist.info.professores;

            var solucaoPorGrupos = _.groupBy(solucao.genome, (aula) => { return aula.groupId; });
            var gruposSolucao = [];
            for(var g in solucaoPorGrupos){
                gruposSolucao.push({
                    id: g * 1,// transforma em inteiro
                    aulas: solucaoPorGrupos[g], // lista aulas daquele grupo
                    aulasPordia: _.map(helpers.EmptyDisponibility(), (aulasDoDia, dia) => {
                        return _.map(aulasDoDia, (aulaNoHorario, horario) => {
                            return _.find(solucaoPorGrupos[g], (variavel) => { return variavel.day == dia && variavel.time == horario;}) || 0;
                        });
                    })
                });
            }
            
            TemplateHelper.Display('#content', 'detalhe-historico', {
                nome: nome,
                grupos: grupos,
                professores: professores,
                materias: materias,
                salas: salas,
                conf: hist.configuracao,
                //geracao: geracao,
                solucao: solucao,
                gruposSolucao: gruposSolucao,
                diasDaSemana: diasDaSemana,
                horarios: horarios,
                //tempoExecucao: tempoExecucao
            }).then(function(response){
                $("#confirmacao-tabs a").on("click", function(e){
                    e.preventDefault();
                    $(this).tab('show');
                });
                //console.log($("#confirmacao-tabs").length);
                $("#grupos-tabs a").on("click", function(e){
                    e.preventDefault();
                    $(this).tab('show');
                });
            });
        });
    };



    self.EditarHistorico = function(nome){
        historicoHelper.getHistorico(nome).then((hist) =>{
            escolhaGrupo.set(hist.info.grupos);
            escolhaMateria.set(hist.info.materias);
            escolhaProfessor.set(hist.info.professores);
            escolhaSala.set(hist.info.salas);
            escolhaConfiguracao.set(hist.configuracao);
            escolhaGrupo.LoadInterface();
        });
    };

    self.Voltar = function(){
        listaHistoricos.LoadInterface();
    }

 

    self.GetTeacher = function GetTeacher(id){
        return _.find(professores, x => x.id == id);
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

    self.GetGroup = function GetGroup(id){
        return _.find(grupos, x => x.id == id);
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

    return self;
})(jQuery);