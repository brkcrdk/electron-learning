import { ipcRenderer } from 'electron';

import type { CreateUserData } from './create-user';
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
  createUser: (data: CreateUserData) => ipcRenderer.invoke('create-user', data),
  getUserList: () => ipcRenderer.invoke('get-list-users'),
  createSuperAdmin: (data: NewUserPayload): ApiResponseProps<string> => ipcRenderer.invoke('create-super-admin', data),
  getCurrentUser: (): ApiResponseProps<User> => ipcRenderer.invoke('get-current-user'),
} as const;

export default apiEventList;

declare global {
  interface Window {
    electronAPI: typeof apiEventList;
  }
}
