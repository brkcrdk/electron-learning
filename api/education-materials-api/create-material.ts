import { ipcMain } from 'electron';
import type { ApiResponseProps } from 'types/api-response-types';

import { getCurrentUser } from '@api/user-session';
import { getDb } from '@db/client';
import { educationMaterials, type MutateEducationMaterialsPayload } from '@db/schema';

function createMaterial() {
  ipcMain.handle('create-material', async (_, data: MutateEducationMaterialsPayload): ApiResponseProps<string> => {
    try {
      const db = getDb();
      const currentUser = getCurrentUser();

      if (!currentUser) {
        return {
          success: false,
          error: 'Giriş yapmış kullanıcı bulunamadı.',
        };
      }
      if (currentUser.role === 'user') {
        return {
          success: false,
          error: 'Bu işlemi yapmak için yetkiniz yok.',
        };
      }

      await db.insert(educationMaterials).values({
        ...data,
        createdBy: currentUser.id,
      });

      return {
        success: true,
        data: 'Eğitim materyali oluşturuldu.',
      };
    } catch (error) {
      console.error('create material error', error);
      throw error;
    }
  });
}

export default createMaterial;
