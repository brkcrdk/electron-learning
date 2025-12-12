import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  getCurrentUser: (): Promise<string> => ipcRenderer.invoke('get-current-user'),
});

declare global {
  interface Window {
    electronAPI: {
      getCurrentUser: () => Promise<string>;
    };
  }
}
