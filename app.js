const electron = require('electron');
const path = require('path');
const url = require('url');

const _ = require('lodash');
const Grupo = require('./class_scheduling_problem/group').Group;
const Materia = require('./class_scheduling_problem/subject').Subject;
const Professor = require('./class_scheduling_problem/professor').Professor;
const cspProblem = require('./class_scheduling_problem/cspProblem').CSProblem;
const gaProblem = require('./genetic/geneticAlgorithmProblem').GeneticAlgorithmProblem;

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
  var grupos = _.map(arg.grupos, (g) => new Grupo(g.id, g.nome, g.disponibilidade));
  var professores = _.map(arg.professores, (t) => new Professor(t.id, t.nome, t.disponibilidade));
  var materias = _.map( arg.materias, (m) => new Materia(m.id, m.nome, m.numClasses, m.grupo, m.professor));
  var id = arg.id;
  var prob = new cspProblem(professores, materias, grupos);
  var gaProb = new gaProblem(prob, 100,0.4,0.3);
  console.log("starting...");
  gaProb.solveByNumberOfIterations(1000).then((solution) =>{
    console.log("should be wrapping up...");
    console.log(JSON.stringify(solution.bestSolution, null, 4));
    win.webContents.send('resultado', {
      id: id,
      solucao: solution.bestSolution,
      geracao: solution.iteration
    });  
  });
});
