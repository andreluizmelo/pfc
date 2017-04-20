var TemplateHelper = (function(handlebars, $){
    function LoadTemplate(templateName){
        return $.get('./interface/templates/' + templateName + '.handlebars');
    }

    function GetCompiledTemplate(templateName){
        return LoadTemplate(templateName).then(function(response){
            return Promise.resolve(handlebars.compile(response));
        });
    }

    function Display( selector, templateName, data){
        GetCompiledTemplate(templateName).then(function(template){
            console.log(data);
            var content = template(data);
            console.log(content);
            $(selector).html(content);
        });
    }


    return {
        LoadTemplate: this.LoadTemplate,
        GetCompiledTemplate: GetCompiledTemplate,
        Display: Display
    };
})(window.handlebars, window.jQuery);