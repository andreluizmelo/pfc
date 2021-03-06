function reset(event, arg){
    window.home = true;
    $("#content").hide();
    $("#welcome").show();

    escolhaGrupo.reset();
    escolhaProfessor.reset();
    escolhaMateria.reset();
    escolhaSala.reset();
}


$(document).ready(function(){
    
    // load templates
    // $("section#templates div").each(function(index, elem){
    //     $(elem).load('./interface/templates/' + $(elem).data('path') + '.handlebars');
    // });
    
    $('#confirmacao-tabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

    function showContent(){
        $("#welcome").hide();
        $("#content").show();
    }

    $("#welcome-btn").click(function(event){
        window.home = false;
        showContent();
        escolhaGrupo.LoadInterface();
        
    });

    $("#config-btn").click(function(event){
        window.home = false;
        showContent();
        listaConfiguracao.LoadInterface();
        
    });

    $("#historico-btn").click(function(event){
        window.home = false;
        showContent();
        listaHistoricos.LoadInterface();
        
    });

    ipc.on('groups', function(event, arg){
        escolhaGrupo.LoadInterface();
        if(window.home) showContent();
    });
    ipc.on('teachers', function(event, arg){
        escolhaProfessor.LoadInterface();
        if(window.home) showContent();
    });
    ipc.on('subjects', function(event, arg){
        escolhaMateria.LoadInterface();
        if(window.home) showContent();
    });
    ipc.on('configuration', function(event, arg){
        listaConfiguracao.LoadInterface();
        if(window.home) showContent();
    });
    ipc.on('salas', function(event, arg){
        escolhaSala.LoadInterface();
        if(window.home) showContent();
    });
    ipc.on('reset', reset);
    ipc.on('resultado',function(evt, arg){
        resultado.ShowSolution(arg.id, arg.geracao, arg.solucao, arg.tempoExecucao);
    });
    ipc.on('escolha-configuracao', function(evt, arg){
        escolhaConfiguracao.LoadInterface(arg);
        if(window.home) showContent();
    });
    ipc.on('lista-configuracao', function(evt, arg){
        listaConfiguracao.LoadList(arg);
    });

    ipc.on('save-configuracao', function(evt, arg){
        editarConfiguracao.OnSaved(arg);
    });

    ipc.on('lista-configuracao-escolha', function(evt, arg){
        escolhaConfiguracao.LoadList(arg);
    });

    ipc.on('lista-historicos', function(evt, arg){
        console.log('historicos recebidos:');
        console.log(arg);
        listaHistoricos.LoadList(arg);
    });
});