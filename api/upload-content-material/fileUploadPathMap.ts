import type { FileUploadTypes } from './types';

export const fileUploadPathMap: Record<FileUploadTypes, string> = {
  video: 'videos',
  stories: 'stories',
  pdfs: 'pdfs',
  images: 'images',
};
