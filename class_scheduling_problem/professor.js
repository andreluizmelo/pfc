var _ = require('lodash');

function Professor(id, nome, disponibilidade){
    this.id = id;
    this.nome = nome;
    this.disponibilidade = _.clone(disponibilidade);
}

Professor.prototype.isAvailable = function( day, time){
    if( this.disponibilidade[day] === null || this.disponibilidade[day] === undefined)
        throw new Error('dia inválido: ' + day);
    if( this.disponibilidade[day][time] === null || this.disponibilidade[day][time] === undefined)
        throw new Error('tempo inválido: ' + time);

    return this.disponibilidade[day][time] !== 0;
};

module.exports = {
    Professor: Professor
};