var resultado = (function(){
    var self = {};
    var id = 0;
    self.Start = function Start(){
        id = Math.floor(Math.random() * 9999) + 1; // numero aleatorio
        ipc.send('envio-params', {
            grupos: escolhaGrupo.GetGroups(),
            professores: escolhaProfessor.GetTeachers(),
            materias: escolhaMateria.GetMaterias(),
            id: id
        });
        TemplateHelper.Display('#content', 'resultado-espera', {});
    };

    self.ShowSolution = function ShowSolution(idSolucao, geracao, solucao, tempoExecucao){
        if(!CheckId(idSolucao)){
            console.log("id zumbi");
            return;
        }
        console.log("geracao: " + geracao);
        console.log("solucao: " + solucao);
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
        console.log(gruposSolucao);
        TemplateHelper.Display('#content', 'resultado-exibicao', {
            grupos: escolhaGrupo.GetGroups(),
            professores: escolhaProfessor.GetTeachers(),
            materias: escolhaMateria.GetMaterias(),
            geracao: geracao,
            solucao: solucao,
            gruposSolucao: gruposSolucao,
            diasDaSemana: diasDaSemana,
            horarios: horarios,
            tempoExecucao: tempoExecucao
        }).then(function(response){
            console.log($("#confirmacao-tabs").length);
            $("#resultado-tabs a").on("click", function(e){
                e.preventDefault();
                $(this).tab('show');
            });
        });
    };

    function CheckId(idToCheck){
        return id == idToCheck;
    }

    return self;
})();