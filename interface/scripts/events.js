$(document).ready(function(){
    
    // load templates
    // $("section#templates div").each(function(index, elem){
    //     $(elem).load('./interface/templates/' + $(elem).data('path') + '.handlebars');
    // });
    
    $("#welcome-btn").click(function(event){
        $("#welcome").hide();
        $("#content").show();
    });

    TemplateHelper.Display("#content", 'teacher', { professores: [
        {
            id: 1,
            nome: 'andre'
        },
        {
            id: 2,
            nome: 'thomas'
        }
    ]});
});