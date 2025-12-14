import { join } from 'path';

import { app } from 'electron';
import { ensureDir } from 'fs-extra';

import type { MediaFileTypes } from '@db/schema';

const fileUploadPathMap: Record<MediaFileTypes, string> = {
  video: 'videos',
  stories: 'stories',
  pdfs: 'pdfs',
  images: 'images',
};

interface Props {
  mediaType: MediaFileTypes;
  fileName: string;
}

/**
 * Oluşturulacak dosyanın yolunu, dosya tipine göre oluşturur.
 */
async function getFilePath({ mediaType, fileName }: Props): Promise<string> {
  const userDataPath = app.getPath('userData');
  const contentRoot = join(userDataPath, 'content');
  const uploadFolder = fileUploadPathMap[mediaType];
  const uploadPath = join(contentRoot, uploadFolder);

  await ensureDir(uploadPath);

  // Dosya yolunu oluştur
  const filePath = join(uploadPath, fileName);
  return filePath;
}

export default getFilePath;
