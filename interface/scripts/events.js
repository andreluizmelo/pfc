$(document).ready(function(){
    
    // load templates
    // $("section#templates div").each(function(index, elem){
    //     $(elem).load('./interface/templates/' + $(elem).data('path') + '.handlebars');
    // });
    
    $("#welcome-btn").click(function(event){
        $("#welcome").hide();
        escolhaProfessor.LoadInterface();
        $("#content").show();
    });
});