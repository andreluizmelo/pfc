$(document).ready(function(){
    
    // load templates
    $("section#templates div").each(function(index, elem){
        $(elem).load('./interface/templates/' + $(elem).data('path') + '.html');
    });
    
    $("#welcome-btn").click(function(event){
        $("#welcome").hide();
        $("#content").show();
    });
});