import { contextBridge } from 'electron';
import { ipcRenderer } from 'electron';

import type { CreateUserData } from './api/create-user';

const apiEventList = {
  createUserEvent: (data: CreateUserData) => ipcRenderer.send('create-user', data),
} as const;

contextBridge.exposeInMainWorld('electronAPI', apiEventList);

declare global {
  interface Window {
    electronAPI: typeof apiEventList;
  }
}
