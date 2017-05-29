var listaConfiguracao = (function($){
    var self = {};
    self.editarConfiguracao = function(name){
        editarConfiguracao.LoadInterface(name);
    };

    self.LoadInterface = function(){
        ipc.send('get-list-confs');
    };

    self.LoadList = function(confs){
        TemplateHelper.Display("#content", 'lista-configuracao', {
            configurations: confs
        });
    };
    return self;
})(jQuery);