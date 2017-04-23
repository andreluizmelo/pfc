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
});