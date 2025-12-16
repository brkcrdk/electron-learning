import { join, parse, relative } from 'path';

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
  uploadId: string;
}

interface GetRelativeFilePathProps {
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
 * Sadece uploadId ve extension kullanarak dosya adı oluşturur
 * uploadId (UUID) kullanarak her zaman unique ve kısa isim garantiler
 * Örnek: document.pdf -> a1b2c3d4-e5f6-7890-abcd-ef1234567890.pdf
 */
function generateUniqueFileName(fileName: string, uploadId: string): string {
  const parsed = parse(fileName);

  // Extension varsa: uploadId + ext
  // Extension yoksa: sadece uploadId
  return parsed.ext ? `${uploadId}${parsed.ext}` : uploadId;
}

/**
 * Dosya yazmak için full path oluşturur ve dizini oluşturur
 * uploadId kullanarak her zaman unique isim oluşturur (extension korunur)
 * Örnek: C:\Users\...\AppData\Roaming\app\content\videos\file_a1b2c3d4-e5f6-7890-abcd-ef1234567890.mp4
 */
export async function getFullFilePath({ mediaType, fileName, uploadId }: GetFilePathProps): Promise<string> {
  const contentRoot = getContentRootPath();
  const uploadFolder = fileUploadPathMap[mediaType];
  const uploadPath = join(contentRoot, uploadFolder);

  await ensureDir(uploadPath);

  // uploadId kullanarak unique dosya adı oluştur
  const uniqueFileName = generateUniqueFileName(fileName, uploadId);
  const filePath = join(uploadPath, uniqueFileName);

  return filePath;
}

/**
 * Veritabanına kaydetmek için relative path oluşturur
 * Örnek: content/videos/file.mp4
 */
export function getRelativeFilePath({ mediaType, fileName }: GetRelativeFilePathProps): string {
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
