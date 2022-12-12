const { contextBridge, ipcRenderer } = require('electron');

const createPreloadEventsBridge = require('./preload/events.js');
const createPreloadMqttBridge = require('./preload/mqtt.js');
const constants = require('./constants');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
const internalBridge = {
  constants,
  events: createPreloadEventsBridge(ipcRenderer),
  mqtt: createPreloadMqttBridge()
};
contextBridge.exposeInMainWorld('internal', internalBridge);

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});
