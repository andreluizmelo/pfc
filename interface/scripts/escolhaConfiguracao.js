var escolhaConfiguracao = (function(){
    var self = {};
    var conf = {};

    self.GetConfiguration = function(){
        return conf;
    };

    self.LoadInterface = function(){
        TemplateHelper.Display("#content", 'configuracao', conf).then((response) => {
            $("#conf-accordion a").on("click", (event) =>{
                var $elem = $(event.currentTarget);
                var $target = $($elem.attr("href"));
                if($target)
                    $target.collapse("toggle");
                else
                    console.log("deu ruim: " + $elem.attr("href"));
            });
        });
    };
    return self;
})();