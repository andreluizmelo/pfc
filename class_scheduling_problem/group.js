function Group( id, nome, disponibilidade, numeroAlunos){
    this.id = id;
    this.nome = nome;
    this.disponibilidade = disponibilidade;
    this.numeroAlunos = numeroAlunos;
}

Group.prototype.isAvailable = function(day, time){
    if( this.disponibilidade[day] === null || this.disponibilidade[day] === undefined)
        throw new Error('dia inválido');
    if( this.disponibilidade[day][time] === null || this.disponibilidade[day][time] === undefined)
        throw new Error('tempo inválido');

    return this.disponibilidade[day][time] !== 0;
};

module.exports = {
    Group: Group
}