import { ipcMain } from 'electron';
import type { ApiResponseProps } from 'types/api-response-types';

import { cleanupStream } from './streamManager';

function cleanupPayloadHandler() {
  ipcMain.handle('cleanup-payload', async (_, uploadId: string): ApiResponseProps<string> => {
    try {
      await cleanupStream(uploadId);
      return { success: true, data: 'Upload temizlendi.' };
    } catch (error) {
      console.error('cleanup upload error', error);
      return { success: false, error: String(error) };
    }
  });
}

export default cleanupPayloadHandler;
