const electron = require('electron');
const path = require('path');
const url = require('url');

const _ = require('lodash');
const Grupo = require('./class_scheduling_problem/group').Group;
const Materia = require('./class_scheduling_problem/subject').Subject;
const Professor = require('./class_scheduling_problem/professor').Professor;
const Sala = require('./class_scheduling_problem/room');
const cspProblem = require('./class_scheduling_problem/cspProblem').CSProblem;
const gaProblem = require('./genetic/geneticAlgorithmProblem').GeneticAlgorithmProblem;
const psoProblem = require('./pso/psoProblem').PsoProblem;

const fileUtils = require('./utils/fileUtils');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const Tray = electron.Tray;
const ipc = electron.ipcMain;
let win;


const name = electron.app.getName();

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600});
  win.maximize();
  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  const template = [
    {
      label: name,
      submenu: [{
        label: 'About ' + name,
        click: () =>{
          console.log('TODO about page');
        },
        role: 'about',
        accelerator: 'CommandOrControl+A'
      },{
        label: 'Developer Tools',
        click: () => {
          win.webContents.openDevTools();
        },
         accelerator: 'CommandOrControl+Shift+I'
      },{
        label: 'Recarregar Página',
        click: () => {
          win.reload();
        },
         accelerator: 'CommandOrControl+R'
      },{
        type: 'separator'
      },{
        label: 'Quit',
        click: () => {
          app.quit();
        },
        accelerator: 'CommandOrControl+Q'
      }]
    },{
      label: 'Ações',
      submenu: [{
          label: 'Grupos',
          click: () => {
            win.webContents.send('groups', null);
          },
          accelerator: 'CommandOrControl+G'
        },{
          label: 'Professores',
          click: () => {
            win.webContents.send('teachers', null);
          },
          accelerator: 'CommandOrControl+P'
        },{
          label: 'Matérias',
          click: () => {
            win.webContents.send('subjects', null);
          },
          accelerator: 'CommandOrControl+M'
        },{
          label: 'Configuração',
          click: () => {
            win.webContents.send('configuration', null);
          },
          accelerator: 'CommandOrControl+S' // TODO arrumar outro atalho melhor
        },{
          type: 'separator'
        },{
          label: 'Limpar',
          click: () => {
            win.webContents.send('reset', null);
          },
          accelerator: 'CommandOrControl+L'
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  
  // sem uso :(
  // const tray = new Tray('./interface/images/csps2.png');
  // tray.setContextMenu(menu);

  // Emitted when the window is closed.
  win.on('closed', () => {
    // quando fechar coloca como null
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});


ipc.on('envio-params', (event, arg) =>{
  var grupos = _.map(arg.grupos, (g) => new Grupo(g.id, g.nome, g.disponibilidade, g.numeroAlunos));
  var professores = _.map(arg.professores, (t) => new Professor(t.id, t.nome, t.disponibilidade));
  var materias = _.map( arg.materias, (m) => new Materia(m.id, m.nome, m.numClasses, m.grupo, m.professor));
  var salas = _.map(arg.salas, (s) => new Sala(s.id, s.nome, s.capacidade));
  var configuracao = arg.configuracao;
  var nomeSolucao = arg.nome;
  var id = arg.id;
  
  var flexiveis = configuracao.flexible;
  var minSeq = flexiveis.minclasses;
  var maxSeq = flexiveis.maxclasses;
  var index = 0;
  var pesosPadrao = [10, 8, 7, 5, 4, 3, 2, 1,1,1,1,1,1,1,1,1];
  var pesos = {};
  _.forEach(flexiveis.used, (elem) => {
    pesos[elem] = pesosPadrao[index++];
  });
  console.log("pesos: " + pesos);
  var prob = new cspProblem(professores, materias, grupos, salas,{
    pesos: pesos,
    maximoAulas: maxSeq,
    minimoAulas: minSeq
  });
  //var gaProb = new gaProblem(prob, configuracao.population, 0.4, 0.3);

  var problema;

  console.log("algoritmo: " + configuracao.algorithm);
  console.log("populacao: " + configuracao.population);
  if(configuracao.algorithm == 0){
    console.log("mutacao: " + configuracao.genetic.mutation);
    console.log("crossover: " + configuracao.genetic.crossover);
    problema = new gaProblem(prob, configuracao.population, configuracao.genetic.mutation, configuracao.genetic.crossover);
  }
  else{
    console.log("inertia: " + configuracao.pso.inertia);
    console.log("local: " + configuracao.pso.local);
    console.log("global: " + configuracao.pso.global);
    problema = new psoProblem(prob, configuracao.population, configuracao.pso.inertia, configuracao.pso.local, configuracao.pso.global);
  }
  var start = new Date();
  console.log("starting...");
  console.log("criterio de parada: " + configuracao.stopcriteria);
  if(configuracao.stopcriteria == 0){ // numero de iteracoes
    console.log("iteracoes: " + configuracao.iterations);
    problema.solveByNumberOfIterations(1000, true).then((solution) =>{
      console.log("should be wrapping up...");
      console.log(JSON.stringify(solution.bestSolution, null, 4));
      fileUtils.SaveProblem(nomeSolucao || null, {
        configuracao: arg.configuracao,
        info: {
          grupos: arg.grupos,
          professores: arg.professores,
          materias: arg.materias,
          salas: arg.salas,
        },
        solucoes: [{
            solucao: solution.bestSolution,
            geracao: solution.iteration,
          },
        ]
      }).then((promessa) =>{
        win.webContents.send('resultado', {
          id: id,
          solucao: solution.bestSolution,
          geracao: solution.iteration,
          tempoExecucao: new Date() - start
        });  
      });
    });
  }else{ // ate repetir x vezes
    console.log("iteracoes sem melhora: " + configuracao.stabilization);
    problema.solve(1000).then((solution) =>{
      console.log("should be wrapping up...");
      console.log(JSON.stringify(solution.bestSolution, null, 4));
      fileUtils.SaveProblem(nomeSolucao || null, {
        configuracao: arg.configuracao,
        info: {
          grupos: arg.grupos,
          professores: arg.professores,
          materias: arg.materias,
          salas: arg.salas,
        },
        solucoes: [{
            solucao: solution.bestSolution,
            geracao: solution.iteration,
          },
        ]
      }).then((promessa) =>{
        win.webContents.send('resultado', {
          id: id,
          solucao: solution.bestSolution,
          geracao: solution.iteration,
          tempoExecucao: new Date() - start
        });
      });
    });
  }
});

ipc.on('get-list-confs',function(event, args){
  win.webContents.send('lista-configuracao', fileUtils.GetListOfConfs());
});
ipc.on('get-list-confs-escolha',function(event, args){
  win.webContents.send('lista-configuracao-escolha', fileUtils.GetListOfConfs());
});
ipc.on('save-conf', function(event, args){
  console.log(args);
  fileUtils.SaveConf(args.fileName, args.conf).then(function(result){
    win.webContents.send('save-configuracao', result);
  });

});

ipc.on('get-list-hist', function(event, args){
  //console.log(args);
  console.log('pedido de lista dos historicos');
  win.webContents.send('lista-historicos', fileUtils.GetListOfHistoricos());
});