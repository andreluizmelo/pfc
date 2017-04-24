var confirmacao = (function(){
    var self = {};
    
    self.LoadInterface = function(){
        var groups = escolhaGrupo.GetGroups();
        var professores = escolhaProfessor.GetTeachers();
        var materias = escolhaMateria.GetMaterias();
        TemplateHelper.Display("#content", 'confirmacao', { 
            grupos: groups,
            materias: materias,
            professores: professores
        });
    };

    self.confirm = function(){
        // TODO
    };
    return self;
})();

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}