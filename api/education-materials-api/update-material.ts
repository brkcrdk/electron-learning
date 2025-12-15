import { eq, sql } from 'drizzle-orm';
import { ipcMain } from 'electron';
import type { ApiResponseProps } from 'types/api-response-types';

import { getDb } from '@db/client';
import { educationMaterials, type MutateEducationMaterialsPayload } from '@db/schema';

import { getCurrentUser } from '../user-session';

function updateMaterial() {
  ipcMain.handle('update-material', async (_, data: MutateEducationMaterialsPayload): ApiResponseProps<string> => {
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

      if (!data.id) {
        return {
          success: false,
          error: 'Eğitim materyali ID bulunamadı.',
        };
      }

      await db
        .update(educationMaterials)
        .set({
          ...data,
          updatedAt: sql`(unixepoch())`,
        })
        .where(eq(educationMaterials.id, data.id));

      return {
        success: true,
        data: 'Eğitim materyali güncellendi.',
      };
    } catch (error) {
      console.error('update material error', error);
      throw error;
    }
  });
}

export default updateMaterial;
