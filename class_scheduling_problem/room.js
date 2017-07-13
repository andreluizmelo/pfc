var _ = require('lodash');


function Room(id, nome, capacidade){
    this.id = id;
    this.nome = nome;
    this.capacidade = capacidade;
}


module.exports = Room;