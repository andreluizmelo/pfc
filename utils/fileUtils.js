var fs = require('fs');

var fileUtils = (function(){
    var self = {};

    function readFolder(folder){
        var files = [];
        fs.readdirSync('./' + folder).forEach((file) => files.push(file));
        return files;
    }

    self.GetListOfConfs = function(){
        return readFolder('configuration');
    };

    return self;
})();

module.exports = fileUtils;