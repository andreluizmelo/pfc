var editarConfiguracao = (function(){
    var self = {};
    var conf = {};
    var confName = null;

    self.GetConfiguration = function(nome){
        if(nome == null || nome == "")
            return confHelper.LoadConf('default');
        else
            return confHelper.LoadConf(nome);
    };

    self.LoadInterface = function(nome){
        confName = nome;
        self.GetConfiguration(confName).then((response) =>{
            conf = response;
            //console.log(response);
            return Promise.resolve(conf);
        }).then((configuration) => {
            configuration.nome = nome;
            conf = configuration;
            return TemplateHelper.Display("#content", 'configuracao', configuration);
        }).then((response) => {
                $("#conf-algoritmo-input").val(conf.algorithm);
                $("#conf-parada-input").val(conf.stopcriteria);
                $( "#sortable1, #sortable2" ).sortable({
                  connectWith: ".connectedSortable"
                });
                // $("#conf-accordion a").on("click", (event) =>{
                //     var $elem = $(event.currentTarget);
                //     var $target = $($elem.attr("href"));
                //     if($target)
                //         $target.collapse("toggle");
                //     else
                //         console.log("deu ruim: " + $elem.attr("href"));
                // });
            });
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
            name: $('#nome-configuracao-input').val(),
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

    self.Save = function(nome){
        var conf = self.GetConfigurationFromForm();
        confName = $("#nome-configuracao-input").val();
        console.log(conf);
        ipc.send('save-conf',{
            fileName: confName,
            conf: conf
        });
    };

    self.OnSaved = function(success){
        if(success){
            toastr.success("Configuração salva com sucesso");
            listaConfiguracao.LoadInterface();
        }else{
            toastr.error("Erro ao salvar configuração");
        }
    };

    return self;
})();