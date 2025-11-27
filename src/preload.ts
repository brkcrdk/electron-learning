import { contextBridge } from 'electron';
import { ipcRenderer } from 'electron';

import type { CreateUserData } from '../api/create-user';
import type { ApiResponse } from '../types/api-response-types';

const apiEventList = {
  createUser: (data: CreateUserData) => ipcRenderer.send('create-user', data),
  getUserList: () => ipcRenderer.invoke('get-list-users'),
  checkSuperAdmin: (): Promise<ApiResponse<boolean>> => ipcRenderer.invoke('check-super-admin'),
} as const;

contextBridge.exposeInMainWorld('electronAPI', apiEventList);

declare global {
  interface Window {
    electronAPI: typeof apiEventList;
  }
}
