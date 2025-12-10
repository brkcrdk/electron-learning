import { ipcRenderer } from 'electron';

import type { LoginPayload } from './login';
import type { NewUserPayload, User } from '../db/schema/users';
import type { ApiResponseProps } from '../types/api-response-types';

const apiEventList = {
  /**
   * Veritabanında super admin var mı kontrolü yapılır. Eğer tabanında super admin yoksa,
   * ilk kurulum yapılıyor demektir.
   *
   * NOTE: Super admin veritabnında sadece bir tane olmalıdır.
   */
  checkSuperAdminExists: (): ApiResponseProps<boolean> => ipcRenderer.invoke('check-super-admin-exists'),
  login: (data: LoginPayload): ApiResponseProps<User> => ipcRenderer.invoke('login', data),
  logout: (): ApiResponseProps<string> => ipcRenderer.invoke('logout'),
  createUser: (data: NewUserPayload) => ipcRenderer.invoke('create-user', data),
  getUserList: (): ApiResponseProps<User[]> => ipcRenderer.invoke('get-user-list'),
  createSuperAdmin: (data: NewUserPayload): ApiResponseProps<string> => ipcRenderer.invoke('create-super-admin', data),
  getCurrentUser: (): ApiResponseProps<User> => ipcRenderer.invoke('get-current-user'),
  updateUser: (data: NewUserPayload): ApiResponseProps<string> => ipcRenderer.invoke('update-user', data),
} as const;

export default apiEventList;

declare global {
  interface Window {
    electronAPI: typeof apiEventList;
  }
}
