import { join, relative } from 'path';

import { app } from 'electron';
import { ensureDir } from 'fs-extra';

import type { MediaFileTypes } from '@db/schema';

const fileUploadPathMap: Record<MediaFileTypes, string> = {
  video: 'videos',
  stories: 'stories',
  pdfs: 'pdfs',
  images: 'images',
};

interface GetFilePathProps {
  mediaType: MediaFileTypes;
  fileName: string;
}

/**
 * UserData path'ini döndürür
 */
function getUserDataPath(): string {
  return app.getPath('userData');
}

/**
 * Content root path'ini döndürür (userData/content)
 */
function getContentRootPath(): string {
  return join(getUserDataPath(), 'content');
}

/**
 * Dosya yazmak için full path oluşturur ve dizini oluşturur
 * Örnek: C:\Users\...\AppData\Roaming\app\content\videos\file.mp4
 */
export async function getFullFilePath({ mediaType, fileName }: GetFilePathProps): Promise<string> {
  const contentRoot = getContentRootPath();
  const uploadFolder = fileUploadPathMap[mediaType];
  const uploadPath = join(contentRoot, uploadFolder);

  await ensureDir(uploadPath);

  // Dosya yolunu oluştur
  const filePath = join(uploadPath, fileName);
  return filePath;
}

/**
 * Veritabanına kaydetmek için relative path oluşturur
 * Örnek: content/videos/file.mp4
 */
export function getRelativeFilePath({ mediaType, fileName }: GetFilePathProps): string {
  const uploadFolder = fileUploadPathMap[mediaType];
  return join('content', uploadFolder, fileName).replace(/\\/g, '/'); // Windows için / kullan
}

/**
 * Relative path'i full path'e çevirir
 * Örnek: content/videos/file.mp4 -> C:\Users\...\AppData\Roaming\app\content\videos\file.mp4
 */
export function getFullPathFromRelative(relativePath: string): string {
  const userDataPath = getUserDataPath();
  return join(userDataPath, relativePath);
}

/**
 * Full path'i relative path'e çevirir
 * Örnek: C:\Users\...\AppData\Roaming\app\content\videos\file.mp4 -> content/videos/file.mp4
 */
export function getRelativePathFromFull(fullPath: string): string {
  const userDataPath = getUserDataPath();
  const relativePath = relative(userDataPath, fullPath);
  return relativePath.replace(/\\/g, '/'); // Windows için / kullan
}
