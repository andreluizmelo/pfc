var _ = require('lodash');
var cspConsts = require('./constantes');

function randomDay(){
    return Math.floor(cspConsts.maxDay * Math.random());
}

function randomTime(){
    return Math.floor( cspConsts.maxTime * Math.random());
}

module.exports = {
    randomDay: randomDay,
    randomTime: randomTime
};