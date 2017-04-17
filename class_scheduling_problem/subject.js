var _ = require('lodash');

function Subject(id, nome, numClasses, idGroup, idProfessor){
    this.id = id;
    this.nome = nome;
    this.numClasses = numClasses;
    this.idGroup = idGroup;
    this.idProfessor = idProfessor;
}

module.exports = {
    Subject: Subject
};