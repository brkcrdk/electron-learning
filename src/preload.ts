import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  createUserEvent: (data: string) => ipcRenderer.send('create-user', data),
});
