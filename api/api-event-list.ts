import { ipcRenderer } from 'electron';

import type {
  Category,
  EducationListItem,
  EducationMaterialsListItem,
  MutateCategoryPayload,
  MutateEducationPayload,
  MutateEducationMaterialsPayload,
  MutateUserPayload,
  User,
  CategoryWithChildren,
} from '@db/schema';

import type { LoginPayload } from './session-api/login';
import type { UploadFilePayload } from './upload-file-api';
import type { ApiResponseProps } from '../types/api-response-types';
import type { FileUploadResponseType } from './upload-file-api/types';

const apiEventList = {
  // Auth services
  /**
   * Veritabanında super admin var mı kontrolü yapılır. Eğer tabanında super admin yoksa,
   * ilk kurulum yapılıyor demektir.
   *
   * NOTE: Super admin veritabnında sadece bir tane olmalıdır.
   */
  checkSuperAdminExists: (): ApiResponseProps<boolean> => ipcRenderer.invoke('check-super-admin-exists'),
  createSuperAdmin: (data: MutateUserPayload): ApiResponseProps<string> => ipcRenderer.invoke('create-super-admin', data),

  login: (data: LoginPayload): ApiResponseProps<User> => ipcRenderer.invoke('login', data),
  logout: (): ApiResponseProps<string> => ipcRenderer.invoke('logout'),

  // User services
  createUser: (data: MutateUserPayload) => ipcRenderer.invoke('create-user', data),
  getUserList: (): ApiResponseProps<User[]> => ipcRenderer.invoke('get-user-list'),
  getCurrentUser: (): ApiResponseProps<User> => ipcRenderer.invoke('current-user'),
  updateUser: (data: MutateUserPayload): ApiResponseProps<string> => ipcRenderer.invoke('update-user', data),
  deleteUser: (data: User['id']): ApiResponseProps<string> => ipcRenderer.invoke('delete-user', data),

  // Category services
  getCategoryList: (): ApiResponseProps<CategoryWithChildren[]> => ipcRenderer.invoke('get-category-list'),
  createCategory: (data: MutateCategoryPayload): ApiResponseProps<string> => ipcRenderer.invoke('create-category', data),
  updateCategory: (data: MutateCategoryPayload): ApiResponseProps<string> => ipcRenderer.invoke('update-category', data),
  deleteCategory: (data: Category['id']): ApiResponseProps<string> => ipcRenderer.invoke('delete-category', data),
  getCategoryDetail: (data: Category['id']): ApiResponseProps<Category> => ipcRenderer.invoke('get-category-detail', data),

  // File Upload services
  uploadFile: (data: UploadFilePayload): FileUploadResponseType => ipcRenderer.invoke('upload-file', data),
  cleanupUpload: (uploadId: string) => ipcRenderer.invoke('cleanup-upload', uploadId),
  deleteFile: (fileId: number): ApiResponseProps<string> => ipcRenderer.invoke('delete-file', fileId),

  // Education material services
  getEducationMaterialList: (): ApiResponseProps<EducationMaterialsListItem[]> => ipcRenderer.invoke('get-material-list'),
  createEducationMaterial: (data: MutateEducationMaterialsPayload): ApiResponseProps<string> => ipcRenderer.invoke('create-material', data),
  updateEducationMaterial: (data: MutateEducationMaterialsPayload): ApiResponseProps<string> => ipcRenderer.invoke('update-material', data),
  deleteEducationMaterial: (data: EducationMaterialsListItem['id']): ApiResponseProps<string> => ipcRenderer.invoke('delete-material', data),

  // Education services
  getEducationList: (): ApiResponseProps<EducationListItem[]> => ipcRenderer.invoke('get-education-list'),
  createEducation: (data: MutateEducationPayload): ApiResponseProps<string> => ipcRenderer.invoke('create-education', data),
  updateEducation: (data: MutateEducationPayload): ApiResponseProps<string> => ipcRenderer.invoke('update-education', data),
  deleteEducation: (data: EducationListItem['id']): ApiResponseProps<string> => ipcRenderer.invoke('delete-education', data),
  getUsersEducation: (): ApiResponseProps<EducationListItem[]> => ipcRenderer.invoke('get-users-education'),
} as const;

export default apiEventList;

declare global {
  interface Window {
    electronAPI: typeof apiEventList;
  }
}
