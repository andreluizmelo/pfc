var escolhaConfiguracao = (function(){
    self = {};
    var configuracaoFromForm = null;
    
    self.GetConfiguration = function(){
        return configuracaoFromForm;
    };

    self.LoadInterface = function(){
        ipc.send('get-list-confs-escolha');
    };

    self.LoadList = function(lista){
        confs = _.map(lista, (elem) => elem.replace('.json', ''));
        TemplateHelper.Display("#content", 'escolha-configuracao', {
            configurations: confs
        }).then((response) => {
            return TemplateHelper.Display("#escolha-configuracao-salva", 'escolha-configuracao-salva', {configurations: confs});
        }).then((response) => {
            confHelper.LoadConf('default').then((conf) => {
                return TemplateHelper.Display("#escolha-configuracao-form", 'escolha-configuracao-form', configuracaoFromForm || conf);
            });
        }).then((response) => {
            $("#conf-input-select").val('default');
        });
    };

    self.LoadForm = function(){
        var conf = null;
        confHelper.LoadConf($("#conf-input-select").val()).then((configuracao) => {
                conf = configuracao;
                return TemplateHelper.Display("#escolha-configuracao-form", 'escolha-configuracao-form', conf);
            }).then((response) => {
                $("#conf-algoritmo-input").val(conf.algorithm);
                $("#conf-parada-input").val(conf.stopcriteria);
                $("#conf-accordion a").on("click", (event) =>{
                    var $elem = $(event.currentTarget);
                    var $target = $($elem.attr("href"));
                    if($target)
                        $target.collapse("toggle");
                    else
                        console.log("deu ruim: " + $elem.attr("href"));
                });
                $('#escolha-configuracao-form input, #escolha-configuracao-form input').change((evt) => {
                    self.SaveConfigurationFromForm();
                });
            });
    };
    self.SaveConfigurationFromForm = function(){
        configuracaoFromForm = self.GetConfigurationFromForm();
    };
    self.GetConfigurationFromForm = function(){
        return {
            //name: $('#conf-algoritmo-input').val(),
            algorithm: $('#conf-algoritmo-input').val(),
            population: $('#conf-populacao-input').val(),
            stopcriteria: $('#conf-parada-input').val(),
            iterations: $('#conf-iteracoes-input').val(),
            stabilization: $('#conf-estabilizacao-input').val(),
            pso:{
                inertia: $('#conf-inertia-input').val(),
                local: $('#conf-local-input').val(),
                global: $('#conf-global-input').val()
            },
            genetic:{
                mutation: $('#conf-mutacao-input').val(),
                crossover: $('#conf-crossover-input').val()
            },
            flexible:{
                usemaxsequence: true,//$('#').val(),
                maxsequence: $('#conf-max-aulas-input').val()
            }
        };
    };

    return self;
})();