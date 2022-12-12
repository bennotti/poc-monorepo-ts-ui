module.exports = function createReceiveEvent(ipcRenderer) {
    return (channel, func) => {
        let validChannels = [];
        if (validChannels.includes(channel)) {
          // Deliberately strip event as it includes `sender`
          ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    };
};