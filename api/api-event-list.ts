import { ipcRenderer } from 'electron';

import type { Category, NewCategoryPayload, NewUserPayload, User } from '@db/schema';

import type { LoginPayload } from './login';
import type { UploadFilePayload } from './upload-file';
import type { ApiResponseProps } from '../types/api-response-types';
import type { FileUploadResponseType } from './upload-file/types';

const apiEventList = {
  // Auth services
  /**
   * Veritabanında super admin var mı kontrolü yapılır. Eğer tabanında super admin yoksa,
   * ilk kurulum yapılıyor demektir.
   *
   * NOTE: Super admin veritabnında sadece bir tane olmalıdır.
   */
  checkSuperAdminExists: (): ApiResponseProps<boolean> => ipcRenderer.invoke('check-super-admin-exists'),
  login: (data: LoginPayload): ApiResponseProps<User> => ipcRenderer.invoke('login', data),
  logout: (): ApiResponseProps<string> => ipcRenderer.invoke('logout'),

  // User services
  createUser: (data: NewUserPayload) => ipcRenderer.invoke('create-user', data),
  getUserList: (): ApiResponseProps<User[]> => ipcRenderer.invoke('get-user-list'),
  createSuperAdmin: (data: NewUserPayload): ApiResponseProps<string> => ipcRenderer.invoke('create-super-admin', data),
  getCurrentUser: (): ApiResponseProps<User> => ipcRenderer.invoke('get-current-user'),
  updateUser: (data: NewUserPayload): ApiResponseProps<string> => ipcRenderer.invoke('update-user', data),
  deleteUser: (data: User['id']): ApiResponseProps<string> => ipcRenderer.invoke('delete-user', data),

  // Category services
  getCategoryList: (): ApiResponseProps<Category[]> => ipcRenderer.invoke('get-category-list'),
  createCategory: (data: NewCategoryPayload): ApiResponseProps<string> => ipcRenderer.invoke('create-category', data),
  updateCategory: (data: NewCategoryPayload): ApiResponseProps<string> => ipcRenderer.invoke('update-category', data),
  deleteCategory: (data: Category['id']): ApiResponseProps<string> => ipcRenderer.invoke('delete-category', data),

  // File Upload services
  uploadFile: (data: UploadFilePayload): FileUploadResponseType => ipcRenderer.invoke('upload-file', data),
  cleanupUpload: (uploadId: string) => ipcRenderer.invoke('cleanup-upload', uploadId),
} as const;

export default apiEventList;

declare global {
  interface Window {
    electronAPI: typeof apiEventList;
  }
}
