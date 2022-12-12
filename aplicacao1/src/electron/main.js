const {
  app,
  BrowserWindow,
  dialog,
  ipcMain, Tray, Menu
} = require('electron');
const path = require('path');
const os = require('os');
const Store = require('electron-store');
const { setupElectron } = require('./setup.js');

// const {sample} = require('@pocs/sample-pkg');
// sample.execute();

const constants = require('./constants.js');

const store = new Store();

const rootPath = path.join(__dirname, '../../');

const isDevelopment = process.env.NODE_ENV !== 'production';
var iconpath = path.join(rootPath, 'public/icons/Web/icons8-fund-accounting-office-32.png');

function createWindow() {
  const settings = store.get('settings') ?? {
    execPath: app.getAppPath(),
    desktopPath: app.getPath('desktop'),
    computerName: os.hostname(),
  };

  const mainWin = new BrowserWindow({
    title: process.env.VITE_APP_TITLE ?? 'POC - Aplicacao1',
    resizable: false,
    width: 1024,
    show: false,
    height: 700,
    minimizable: false,
    maximizable: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false,
      preload: path.join(rootPath, './src/electron/preload.js'),
    },
    icon: iconpath
  });
  if (!isDevelopment) {
    mainWin.removeMenu();
    mainWin.loadURL(`file://${rootPath}dist/index.html`);
  } else {
    mainWin.loadURL(`http://localhost:3000/`);
  }
  mainWin.once('ready-to-show', () => {
    mainWin.show();
  });

  ipcMain.handle(constants.CHECK_SETTINGS, async () => {
    return settings;
  });

  ipcMain.handle('close-app', async () => {
    app.isQuiting = true;
    app.quit();
    mainWin.destroy();
  });

  var appIcon = new Tray(iconpath);

  const dependencias = {
    settings,
    mainWin,
    ipcMain,
    dialog,
    store
  };

  app.on('second-instance', (event, commandLine, workingDirectory, additionalData) => {
    if (mainWin) {
      if (mainWin.isMinimized()) mainWin.restore();
      mainWin.show();
      mainWin.focus();
    }
  });

  var contextMenu = Menu.buildFromTemplate([
    {
      label: 'Abrir POC Aplicacao1', click: function () {
        mainWin.show();
      }
    },
    {
      label: 'Encerrar POC Aplicacao1', click: function () {
        try{
          if (dependencias && dependencias.db && dependencias.sqlite) {
            dependencias.sqlite.close(dependencias.db);
          }
        }catch(e){
          console.log(e);
        }
        app.isQuiting = true;
        app.quit();
        mainWin.destroy();
      }
    }
  ]);

  appIcon.setContextMenu(contextMenu);

  dependencias.update = (key, value) => {
    dependencias[key] = value;
  };

  dependencias.get = (key) => {
    return dependencias[key];
  };

  mainWin.on('close', function (e) {
    e.preventDefault();
    if(!app.isQuiting){
      e.preventDefault();
        mainWin.hide();
    }

    return false;
  });
  // mainWin.on('close', async e => {
  //   e.preventDefault();

  //   confirmClose(mainWin);
  // });
  mainWin.on('minimize',function(event){
    event.preventDefault();
    mainWin.hide();
  });
  mainWin.on('show', function () {
    // appIcon.setHighlightMode('always');
  });
}

const error = function(error) {
  // debugger;
  console.error(error);
  var msg = {
    /*type : "error",
    title : "Uncaught Exception",
    buttons:["ok", "close"],*/
    width : 400
  };

  switch (typeof error) {
    case "object":
        msg.title = "Uncaught Exception: " + error.code;
        msg.message = error.message;
        break;
    case "string":
        msg.message = error;
        break;
  }
  msg.detail = "Please check the console log for more details.";

  // ipc.send('electron-toaster-message', msg);
}

process.on('uncaughtException', error);

setupElectron(BrowserWindow, app, createWindow);