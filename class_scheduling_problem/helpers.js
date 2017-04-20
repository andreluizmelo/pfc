var _ = require('lodash');
var cspConsts = require('./constantes');

function randomDay(){
    return Math.floor( (cspConsts.maxDay + 1) * Math.random());
}

function randomTime(){
    return Math.floor( (cspConsts.maxTime+1) * Math.random());
}

function dayAndTimeToInt(day, time){
    return day * (cspConsts.maxTime + 1) + time;
}

function intToDayAndTime(number){ // na falta de nome melhor, TODO mudar esse nome
    var day = Math.floor( number / (cspConsts.maxTime + 1));
    var time = number % (cspConsts.maxTime + 1);
    return {
        day: day,
        time: time
    };
}

function timeMultiply( day, time, multiplier){
    var number = dayAndTimeToInt(day, time);
    number = Math.round(number * multiplier);
    while(number < 0)
        number += (cspConsts.maxTime + 1) * (cspConsts.maxTime + 1);
    number = number % ((cspConsts.maxTime + 1) * (cspConsts.maxTime + 1));
    return intToDayAndTime(number);
}

function timeDiff( day1, time1, day2, time2){
    var num1 = dayAndTimeToInt(day1, time1);
    var num2 = dayAndTimeToInt(day2, time2);
    var diff = num1 - num2;
    while(diff < 0)
        diff += (cspConsts.maxDay + 1) * (cspConsts.maxTime + 1);
    return intToDayAndTime(diff);
}

function timeSum( day1, time1, day2, time2){
    var num1 = dayAndTimeToInt(day1, time1);
    var num2 = dayAndTimeToInt(day2, time2);
    var sum = num1 + num2;
    
    sum = sum % ((cspConsts.maxDay + 1) * (cspConsts.maxTime + 1));
    
    return intToDayAndTime(sum);
}

function EmptyDisponibility(){
    var disp = [];
    var i;
    for(i = 0; i < cspConsts.maxDay + 1; i++)
        disp.push( (new Array(cspConsts.maxTime+1)).fill(0));
    return disp;
}

module.exports = {
    randomDay: randomDay,
    randomTime: randomTime,
    dayAndTimeToInt: dayAndTimeToInt,
    intToDayAndTime: intToDayAndTime ,
    timeMultiply: timeMultiply,
    timeDiff: timeDiff,
    timeSum: timeSum,
    EmptyDisponibility: EmptyDisponibility
};