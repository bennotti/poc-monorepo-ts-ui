module.exports = function createSendEvent(ipcRenderer) {
    return (channel, data) => {
        // whitelist channels
        let validChannels = [];
        if (validChannels.includes(channel)) {
          ipcRenderer.send(channel, data);
        }
    };
};