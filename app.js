const electron = require('electron');
const path = require('path');
const url = require('url');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

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
        label: 'About ${name}',
        click: () =>{
          console.log('TODO about page');
        },
        role: 'about'
      },{
        type: 'separator'
      },{
        label: 'Quit',
        click: () => {
          app.quit();
        },
        accelerator: 'CommandOrControl+Q'
      }]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  // Open the DevTools.
  // not needed now :P, maybe yes 
  //win.webContents.openDevTools();

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