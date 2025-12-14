import { desc, eq, getTableColumns } from 'drizzle-orm';
import { alias } from 'drizzle-orm/sqlite-core';
import { ipcMain } from 'electron';
import type { ApiResponseProps } from 'types/api-response-types';

import { getCurrentUser } from '@api/user-session';
import { getDb } from '@db/client';
import { educations, type EducationListItem } from '@db/schema';
import { mediaFiles } from '@db/schema';
import { users } from '@db/schema';

function getEducationList() {
  ipcMain.handle('get-education-list', async (): ApiResponseProps<EducationListItem[]> => {
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
      const coverImage = alias(mediaFiles, 'cover_image');
      const contentFile = alias(mediaFiles, 'content_file');

      const educationList = await db
        .select({
          id: educations.id,
          name: educations.name,
          description: educations.description,
          contentType: educations.contentType,
          coverImage: getTableColumns(coverImage),
          contentFile: getTableColumns(contentFile),
          createdBy: getTableColumns(users),
          createdAt: educations.createdAt,
          updatedAt: educations.updatedAt,
        })
        .from(educations)
        .innerJoin(coverImage, eq(educations.coverImageId, coverImage.id))
        .innerJoin(contentFile, eq(educations.contentFileId, contentFile.id))
        .innerJoin(users, eq(educations.createdBy, users.id))
        .orderBy(desc(educations.createdAt));

      return {
        success: true,
        data: educationList,
      };
    } catch (error) {
      console.error('get education list error', error);
      throw error;
    }
  });
}

export default getEducationList;
