import { desc, eq, getTableColumns } from 'drizzle-orm';
import { alias } from 'drizzle-orm/sqlite-core';
import { ipcMain } from 'electron';
import type { ApiResponseProps } from 'types/api-response-types';

import { getCurrentUser } from '@api/user-session';
import { getDb } from '@db/client';
import { educationMaterials, type EducationMaterialsListItem } from '@db/schema';
import { mediaFiles } from '@db/schema';
import { users } from '@db/schema';

function getMaterialList() {
  ipcMain.handle('get-material-list', async (): ApiResponseProps<EducationMaterialsListItem[]> => {
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

      // Aynı tabloyu iki kez join etmek için alias kullanıyoruz
      const contentFile = alias(mediaFiles, 'content_file');

      const materialList = await db
        .select({
          id: educationMaterials.id,
          name: educationMaterials.name,
          description: educationMaterials.description,
          contentType: educationMaterials.contentType,
          contentFile: getTableColumns(contentFile),
          createdBy: getTableColumns(users),
          createdAt: educationMaterials.createdAt,
          updatedAt: educationMaterials.updatedAt,
        })
        .from(educationMaterials)
        .innerJoin(contentFile, eq(educationMaterials.contentFileId, contentFile.id))
        .innerJoin(users, eq(educationMaterials.createdBy, users.id))
        .orderBy(desc(educationMaterials.createdAt));

      return {
        success: true,
        data: materialList,
      };
    } catch (error) {
      console.error('get material list error', error);
      throw error;
    }
  });
}

export default getMaterialList;
