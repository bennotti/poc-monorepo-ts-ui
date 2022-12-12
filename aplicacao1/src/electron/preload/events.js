const createSendEvent = require('./events/send.event.js');
const createReceiveEvent = require('./events/receive.event.js');
const constants = require('../constants');

module.exports = function createPreloadEventsBridge(ipcRenderer) {
    return {
        handle: async (channel, data) => {
          let validChannels = [];
          if (validChannels.includes(channel)) {
            const result = await ipcRenderer.invoke(channel, data);
            return result;
          }
          return undefined;
        },
        send: createSendEvent(ipcRenderer),
        receive: createReceiveEvent(ipcRenderer),
      };
}