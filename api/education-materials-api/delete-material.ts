import { eq } from 'drizzle-orm';
import { ipcMain } from 'electron';

import { getDb } from '@db/client';
import { educationMaterials, type EducationMaterialsListItem } from '@db/schema';

import type { ApiResponseProps } from '../../types/api-response-types';
import { getCurrentUser } from '../user-session';

function deleteMaterial() {
  ipcMain.handle('delete-material', async (_, materialId: EducationMaterialsListItem['id']): ApiResponseProps<string> => {
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

      await db.delete(educationMaterials).where(eq(educationMaterials.id, materialId));

      return {
        success: true,
        data: 'Eğitim materyali silindi.',
      };
    } catch (error) {
      console.error('delete material error', error);
      throw error;
    }
  });
}

export default deleteMaterial;
