import type { FileUploadTypes } from './types';

/**
 * MIME type'dan dosya tipini belirler
 */
export function getFileUploadType(fileType: string): FileUploadTypes {
  if (fileType.startsWith('video/')) {
    return 'video';
  }
  if (fileType.startsWith('image/')) {
    return 'images';
  }
  if (fileType === 'application/pdf') {
    return 'pdfs';
  }
  // Stories için özel bir MIME type yoksa, default olarak stories
  return 'stories';
}
