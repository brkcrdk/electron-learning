import { contextBridge, ipcRenderer } from 'electron';

import storeEventList from '../store/store-event-list';

contextBridge.exposeInMainWorld('electronAPI', {
  getCurrentUser: (): Promise<string> => ipcRenderer.invoke('get-current-user'),
});

contextBridge.exposeInMainWorld('store', storeEventList);

declare global {
  interface Window {
    electronAPI: {
      getCurrentUser: () => Promise<string>;
    };
  }
}
