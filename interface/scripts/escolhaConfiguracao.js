var escolhaConfiguracao = (function(){
    var self = {};
    var conf = {};
    var confName = null;

    self.GetConfiguration = function(nome){
        if(nome == null || nome == "")
            return confHelper.LoadConf('default');
        else
            return confHelper.LoadConf(nome);
    };

    self.LoadInterface = function(){
        self.GetConfiguration(confName).then((response) =>{
            conf = response;
            console.log(response);
        
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
        });
    };
    return self;
})();