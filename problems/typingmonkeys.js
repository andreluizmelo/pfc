var _ = require('lodash');

var letterA = 'a'.charCodeAt(0);

function randomCharacter(){
    return String.fromCharCode( Math.floor(Math.random() * 26) + letterA);
}

function mutate(genome){
    var newGenome = _.clone(genome);
    var index = Math.floor(Math.random() * newGenome.length);
    if(genome[index] === ' ')
        index += Math.random() >= 0.5 ? 1 : -1;
    newGenome = genome.substr(0, index) + 
        //String.fromCharCode( letterA + (newGenome.charCodeAt(index) + (Math.random() >= 0.5 ? 1 : -1)) % 26) + 
        randomCharacter() + 
        genome.substr(index+ 1);
    return newGenome;
}

function crossover(monkey1, monkey2){
    var middle = Math.floor(monkey1.length / 2) - 1;
    length = monkey1.length;

    var offspring1 = monkey1.slice(0, middle) + monkey2.slice(middle, length);
    var offspring2 = monkey2.slice(0, middle) + monkey1.slice(middle, length);

    return [offspring1, offspring2];
}

function TypingMonkeys(sentence){
    this.crossoverFunction = crossover;
    this.mutateFunction = mutate;
    var lengthWithoutSpaces = _.filter(sentence, x => x !== ' ').length;
    this.fitnessFunction = function(genome){
        var score = 0;
        _.each(sentence, function(elem, index){
            if(elem == genome[index] && elem !== ' ')
                score += 1;
        });
        return score / lengthWithoutSpaces; // retornar fitness entre 0 e 1
    };
    function randomGenome(){
        var length = sentence.length;
        var i;
        var genome = [];
        for(i = 0; i < length; i++){
            if(sentence[i] === ' ')
                genome.push(' ');
            else
            genome.push(randomCharacter());
        }
        return genome.join('');
    }
    this.generatePopulation = function(size){
        var i;
        population = [];
        for(i = 0; i < size; i++){
            population.push(randomGenome());
        }
        return population;
    };
}

module.exports = {
    TypingMonkeys: TypingMonkeys
};