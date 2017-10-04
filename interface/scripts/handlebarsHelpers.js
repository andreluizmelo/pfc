$(document).ready(function(){
    handlebars.registerHelper('lookupById', function(collection, id) {
    var collectionLength = collection.length;

    for (var i = 0; i < collectionLength; i++) {
        if (collection[i].id === id) {
            return collection[i];
        }

    }

    return null;
    });
    handlebars.registerHelper('cmp', function(elem1, op, elem2, options) {
        if(op == '==') return elem1 == elem2 ? options.fn(this) : options.inverse(this);
        if(op == '<=') return elem1 <= elem2 ? options.fn(this) : options.inverse(this);
        if(op == '>=') return elem1 >= elem2 ? options.fn(this) : options.inverse(this);
        if(op == '!=') return elem1 != elem2 ? options.fn(this) : options.inverse(this);
        if(op == '===') return elem1 === elem2 ? options.fn(this) : options.inverse(this);
        if(op == '!==') return elem1 !== elem2 ? options.fn(this) : options.inverse(this);
        return "Operador não suportado";
    });
});