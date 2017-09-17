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

    self.GetListOfHistoricos = function(){
        return readFolder('historico');
    };

    self.SaveConf = function(fileName, conf){
        console.log(fileName);
        return new Promise(function(resolve,reject){
            fs.writeFile('configuration/' + fileName + '.json', JSON.stringify(conf, null, 4), function(err){
                if(err) {
                    console.log(err);
                    resolve(false);
                }
                else resolve(true);
            });
        });
    };


    self.SaveProblem = function( fileName, prob){
        console.log(fileName);
        console.log(prob);
        if(fileName == null || fileName == ""){
            var date = new Date();
            fileName = "historico_" + (date / 1000);
        }
        prob.nome = fileName;
        return new Promise(function(resolve,reject){
            fs.writeFile('historico/' + fileName + '.json', JSON.stringify(prob, null, 4), function(err){
                if(err) {
                    console.log(err);
                    resolve(false);
                }
                else resolve(true);
            });
        });
    };

    return self;
})();

module.exports = fileUtils;