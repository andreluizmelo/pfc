var escolhaSala = (function(){
    var self = {};
    var salas = [];


    function GetNextIndex(){
        var max =  _.maxBy(salas, x => x.id);
        return max !== undefined ? max.id + 1 : 1;
    }

    self.set = function(rooms){
        salas = rooms;
    };

    self.GetSalas = function(){
        return salas;
    };

    self.reset = function(){
        salas = [];
    };
    self.Limpar = function(){
        self.reset();
        self.LoadListaSalas();
    };

    self.LoadInterface = function(){
        
        TemplateHelper.Display("#content", 'salas', { 
            salas: salas
        }).then((response) => {
            if(response){
                self.LoadListaSalas();
            }else{
                console.log("Deu ruim :(");
            }
        });
    };

    self.LoadListaSalas = function(){
        var salas = self.GetSalas();
        
        TemplateHelper.Display("#escolha-sala-div", 'lista-sala', 
            { 
                salas: salas
            });
    };

    self.RemoveSala = function(id){
        _.remove(salas, (sala) => { sala.id == id});
        self.LoadListaSalas();
    };
    self.AdicionarSala = function(){
        var id = GetNextIndex();

        salas.push({
            id: id,
            nome: $("#nome-sala-input").val(),
            capacidade: $("#capacidade-sala-input").val()
        });

        self.LoadListaSalas();

        $("#nome-sala-input").val('');
        $("#capacidade-sala-input").val('');
    };
    return self;
})();