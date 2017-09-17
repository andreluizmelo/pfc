var historicoHelper = (function($){
    var self = {};

    self.getHistorico = function LoadHistorico(name){
        return $.getJSON('historico/' + name + ".json"); // this is a promisse
    };

    return self;
})(jQuery);