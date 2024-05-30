"use strict";
const electron = require("electron");
const mainAvailChannels = ["msgRequestGetVersion", "msgOpenExternalLink", "msgOpenFile"];
const rendererAvailChannels = [];
electron.contextBridge.exposeInMainWorld("mainApi", {
  send: (channel, ...data) => {
    if (mainAvailChannels.includes(channel)) {
      electron.ipcRenderer.send.apply(null, [channel, ...data]);
      if (process.env.NODE_ENV === "development") {
        console.log({ type: "send", channel, request: data });
      }
    } else {
      throw new Error(`Unknown ipc channel name: ${channel}`);
    }
  },
  on: (channel, listener) => {
    if (rendererAvailChannels.includes(channel)) {
      electron.ipcRenderer.on(channel, listener);
    } else {
      throw new Error(`Unknown ipc channel name: ${channel}`);
    }
  },
  once: (channel, listener) => {
    if (rendererAvailChannels.includes(channel)) {
      electron.ipcRenderer.once(channel, listener);
    } else {
      throw new Error(`Unknown ipc channel name: ${channel}`);
    }
  },
  off: (channel, listener) => {
    if (rendererAvailChannels.includes(channel)) {
      electron.ipcRenderer.off(channel, listener);
    } else {
      throw new Error(`Unknown ipc channel name: ${channel}`);
    }
  },
  invoke: async (channel, ...data) => {
    if (mainAvailChannels.includes(channel)) {
      const result = await electron.ipcRenderer.invoke.apply(null, [channel, ...data]);
      if (process.env.NODE_ENV === "development") {
        console.log({ type: "invoke", channel, request: data, result });
      }
      return result;
    }
    throw new Error(`Unknown ipc channel name: ${channel}`);
  }
});
