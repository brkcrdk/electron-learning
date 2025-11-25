import { contextBridge } from 'electron';
import { ipcRenderer } from 'electron';

import type { CreateUserData } from './api/create-user';

const apiEventList = {
  createUser: (data: CreateUserData) => ipcRenderer.send('create-user', data),
  getUserList: () => ipcRenderer.invoke('get-list-users'),
} as const;

contextBridge.exposeInMainWorld('electronAPI', apiEventList);

declare global {
  interface Window {
    electronAPI: typeof apiEventList;
  }
}
