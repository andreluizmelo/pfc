var detalhesHistorico = (function($){
    var self = {};

    self.LoadInterface = function(nome){
        historicoHelper.getHistorico(nome).then((hist) =>{
            TemplateHelper.Display("#content", 'detalhe-historico', {
                nomeHistorico: nome,
                historico: hist
            });
        });
    };

    self.ReRun = function(nome){
        toastr.warning('not implemented yet');
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

    return self;
})(jQuery);