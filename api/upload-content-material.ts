import { join } from 'path';

import { app, ipcMain } from 'electron';
import { ensureDir, writeFile } from 'fs-extra';

export interface UploadContentMaterialPayload {
  name: string;
  size: number;
  type: string;
  content: ArrayBuffer;
}

function uploadContentMaterialHandler() {
  ipcMain.handle('upload-content-material', async (_, data: UploadContentMaterialPayload) => {
    try {
      const userDataPath = app.getPath('userData');
      const educationMaterialsPath = join(userDataPath, 'education-materials');

      // Dizin yoksa oluştur (fs-extra ensureDir otomatik recursive)
      await ensureDir(educationMaterialsPath);

      // ArrayBuffer'ı Buffer'a çevir
      const buffer = Buffer.from(data.content);

      // Dosya yolunu oluştur
      const filePath = join(educationMaterialsPath, data.name);

      // Dosyayı kaydet
      await writeFile(filePath, buffer);

      console.log('File saved to:', filePath);
      return { success: true, data: filePath };
    } catch (error) {
      console.error('upload content material error', error);
      throw error;
    }
  });
}
export default uploadContentMaterialHandler;
