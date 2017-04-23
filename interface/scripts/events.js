
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

    ipc.on('groups', function(event, arg){
        escolhaGrupo.LoadInterface();
        if(window.home) showContent();
    });
    ipc.on('teachers', function(event, arg){
        escolhaProfessor.LoadInterface();
        if(window.home) showContent();
    });
    ipc.on('subjects', function(event, arg){
        console.log('TODO materias');
    });
    ipc.on('reset', function(event, arg){
        window.home = true;
        $("#content").hide();
        $("#welcome").show();

        escolhaGrupo.reset();
        escolhaProfessor.reset();
    });
});