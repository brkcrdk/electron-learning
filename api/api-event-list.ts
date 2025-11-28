import { ipcRenderer } from 'electron';

import type { CreateUserData } from './create-user';
import type { NewUserPayload } from '../db/schema/users';
import type { ApiResponseProps } from '../types/api-response-types';

const apiEventList = {
  createUser: (data: CreateUserData) => ipcRenderer.send('create-user', data),
  getUserList: () => ipcRenderer.invoke('get-list-users'),
  checkSuperAdmin: (): ApiResponseProps<boolean> => ipcRenderer.invoke('check-super-admin'),
  createSuperAdmin: (data: NewUserPayload): ApiResponseProps<string> => ipcRenderer.invoke('create-super-admin', data),
} as const;

export default apiEventList;

declare global {
  interface Window {
    electronAPI: typeof apiEventList;
  }
}
