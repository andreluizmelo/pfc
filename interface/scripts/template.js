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
        return GetCompiledTemplate(templateName).then(function(template){
            try{
                //console.log(data);
                var content = template(data);
                //console.log(content);
                $(selector).html(content);
                return Promise.resolve(true);
            }catch(err){
                console.log(err);
                return Promise.resolve(false);
            }
        });
    }


    return {
        LoadTemplate: this.LoadTemplate,
        GetCompiledTemplate: GetCompiledTemplate,
        Display: Display
    };
})(window.handlebars, window.jQuery);