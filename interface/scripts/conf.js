var confHelper = (function($){
    var self = {};
    
    self.LoadConf = function LoadConf(nome){
        return $.getJSON('configuration/' + nome + ".json"); // this is a promisse
    };

    return self;
})(jQuery);