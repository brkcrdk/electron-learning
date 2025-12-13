import { ipcRenderer } from 'electron';

import type { User } from '@db/schema';

import type { ApiResponseProps } from '../types/api-response-types';

const apiEventList = {
  // Auth services
  /**
   * Veritabanında super admin var mı kontrolü yapılır. Eğer tabanında super admin yoksa,
   * ilk kurulum yapılıyor demektir.
   *
   * NOTE: Super admin veritabnında sadece bir tane olmalıdır.
   */
  checkSuperAdminExists: (): ApiResponseProps<boolean> => ipcRenderer.invoke('check-super-admin-exists'),

  // User services
  getCurrentUser: (): ApiResponseProps<User> => ipcRenderer.invoke('get-current-user'),
  // createUser: (data: NewUserPayload) => ipcRenderer.invoke('create-user', data),
  // getUserList: (): ApiResponseProps<User[]> => ipcRenderer.invoke('get-user-list'),
  // createSuperAdmin: (data: NewUserPayload): ApiResponseProps<string> => ipcRenderer.invoke('create-super-admin', data),
  // updateUser: (data: NewUserPayload): ApiResponseProps<string> => ipcRenderer.invoke('update-user', data),
  // deleteUser: (data: User['id']): ApiResponseProps<string> => ipcRenderer.invoke('delete-user', data),
} as const;

export default apiEventList;

declare global {
  interface Window {
    electronAPI: typeof apiEventList;
  }
}
