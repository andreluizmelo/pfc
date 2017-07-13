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

    self.SaveConf = function(fileName, conf){
        return new Promise(function(resolve,reject){
            fs.writeFile(fileName + '.json', JSON.stringify(conf, null, 4), function(err){
                if(err) resolve(false);
                else resolve(true);
            });
        });
    };

    return self;
})();

module.exports = fileUtils;