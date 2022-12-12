const os = require('os');

function setupElectron(BrowserWindow, app, createWindows) {
    if (os.release().startsWith('6.1')) app.disableHardwareAcceleration();
    if (process.platform === 'win32') app.setAppUserModelId(app.getName());
    const additionalData = { algumValor: 'algumValor' }
    if (!app.requestSingleInstanceLock(additionalData)) {
        app.quit();
        process.exit(0);
    }
    app.disableHardwareAcceleration();

    app.whenReady().then(() => {
        createWindows?.();
      
        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindows?.();
            }
        });
    });
      
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
};

async function confirmCloseWindow(janela) {
    const { response } = await dialog.showMessageBox(janela, {
        type: 'question',
        title: '  Confirmação  ',
        message: 'Deseja realmente sair?',
        buttons: ['Sim', 'Não'],
    });
  
    response === 0 && janela.destroy();
}

module.exports = {
    setupElectron,
    confirmCloseWindow,
};