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
            if(configuracaoFromForm == null)
                return confHelper.LoadConf('default').then((configuracao) => { return self.LoadForm(configuracao);});
            else
                return self.LoadForm(configuracaoFromForm);
            // confHelper.LoadConf('default').then((conf) => 
            //     return TemplateHelper.Display("#escolha-configuracao-form", 'escolha-configuracao-form', configuracaoFromForm || conf);
            // });
        }).then((response) => {
            $("#conf-input-select").val('default');
        });
    };

    self.LoadSavedConfiguration = function(){
        confHelper.LoadConf($("#conf-input-select").val())
            .then((configuracao) => { return self.LoadForm(configuracao);})
            .then((response) => { toastr.success("cofiguração carregada com sucesso"); });
    };
    self.LoadForm = function(configuracao){
        
        //console.log(configuracao);
        return TemplateHelper.Display("#escolha-configuracao-form", 'escolha-configuracao-form', configuracao)
            .then((response) => {
                // console.log("wat");
                // console.log("alg: " + configuracao.algorithm);
                // console.log("stopcrit: " + configuracao.stopcriteria);
                $("#conf-algoritmo-input").val(configuracao.algorithm);
                $("#conf-parada-input").val(configuracao.stopcriteria);
                $("#conf-accordion a").on("click", (event) =>{
                    var $elem = $(event.currentTarget);
                    var $target = $($elem.attr("href"));
                    if($target)
                        $target.collapse("toggle");
                    else
                        console.log("deu ruim: " + $elem.attr("href"));
                });
                $( "#sortable1, #sortable2" ).sortable({
                  connectWith: ".connectedSortable"
                });//.disableSelection();
                $('#escolha-configuracao-form input, #escolha-configuracao-form input').change((evt) => {
                    self.SaveConfigurationFromForm();
                });
            });
    };
    self.SaveConfigurationFromForm = function(){
        configuracaoFromForm = self.GetConfigurationFromForm();
    };
    self.GetConfigurationFromForm = function(){
        var used = [];
        var notused = [];
        $("#sortable1 li").each(function(index){
            notused.push($(this).attr('value'));
        });
        $("#sortable2 li").each(function(index){
            used.push($(this).attr('value'));
        });
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
                maxclasses: $('#conf-max-aulas-input').val(),
                minclasses : $('#conf-min-aulas-input').val(),
                used: used,
                notused: notused
            }
        };
    };

    self.set = function(conf){
        console.log(conf);
        configuracaoFromForm = conf;
    };

    return self;
})();