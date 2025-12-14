import { fileUploadPathMap } from './fileUploadPathMap';
import { getFileUploadType } from './getFileUploadType';

/**
 * Dosya tipine göre klasör yolunu döndürür
 */
export function getUploadPath(fileType: string): string {
  const uploadType = getFileUploadType(fileType);
  return fileUploadPathMap[uploadType];
}
