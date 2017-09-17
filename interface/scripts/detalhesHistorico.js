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
        toastr.warning('not implemented yet');
    };

    return self;
})(jQuery);