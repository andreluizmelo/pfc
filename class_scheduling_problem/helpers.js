var _ = require('lodash');
var cspConsts = require('./constantes');

function randomDay(){
    return Math.floor( (cspConsts.maxDay + 1) * Math.random());
}

function randomTime(){
    return Math.floor( (cspConsts.maxTime+1) * Math.random());
}

module.exports = {
    randomDay: randomDay,
    randomTime: randomTime
};