var listaHistoricos = (function($){
    var self = {};
    // self.editarConfiguracao = function(name){
    //     editarConfiguracao.LoadInterface(name);
    // };

    self.LoadInterface = function(){
        console.log('enviando pedido');
        ipc.send('get-list-hist');
    };

    self.LoadList = function(historicos){
        hists = _.map(historicos, (elem) => elem.replace('.json', ''));
        TemplateHelper.Display("#content", 'lista-historicos', {
            historicos: hists
        });
    };

    self.LoadHistorico = function(nome){
        historicoHelper.getHistorico(nome).then((h) => {console.log(h);});
    };

    self.DetalhesHistorico = function(nome){
        detalhesHistorico.LoadInterface(nome);
    };
    return self;
})(jQuery);