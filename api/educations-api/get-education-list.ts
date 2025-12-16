import { desc, eq, getTableColumns } from 'drizzle-orm';
import { alias } from 'drizzle-orm/sqlite-core';
import { ipcMain } from 'electron';
import type { ApiResponseProps } from 'types/api-response-types';

import { getCurrentUser } from '@api/user-session';
import { getDb } from '@db/client';
import { categories, educations, educationMaterials, mediaFiles, type EducationListItem, users } from '@db/schema';

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

      const materialContentFile = alias(mediaFiles, 'material_content_file');
      const materialCreatedBy = alias(users, 'material_created_by');

      const educationList = await db
        .select({
          id: educations.id,
          name: educations.name,
          description: educations.description,
          category: {
            ...getTableColumns(categories),
          },
          coverImage: getTableColumns(mediaFiles),
          educationMaterial: getTableColumns(educationMaterials),
          educationMaterialContentFile: getTableColumns(materialContentFile),
          educationMaterialCreatedBy: getTableColumns(materialCreatedBy),
          createdBy: getTableColumns(users),
          createdAt: educations.createdAt,
          updatedAt: educations.updatedAt,
        })
        .from(educations)
        .innerJoin(categories, eq(educations.categoryId, categories.id))
        .leftJoin(mediaFiles, eq(educations.coverImageId, mediaFiles.id))
        .innerJoin(educationMaterials, eq(educations.educationMaterial, educationMaterials.id))
        .innerJoin(users, eq(educations.createdBy, users.id))
        .innerJoin(materialContentFile, eq(educationMaterials.contentFileId, materialContentFile.id))
        .innerJoin(materialCreatedBy, eq(educationMaterials.createdBy, materialCreatedBy.id))
        .orderBy(desc(educations.createdAt));

      const mappedEducationList: EducationListItem[] = educationList.map(row => ({
        id: row.id,
        name: row.name,
        description: row.description,
        category: row.category,
        coverImage: row.coverImage ?? null,
        educationMaterial: {
          id: row.educationMaterial.id,
          name: row.educationMaterial.name,
          description: row.educationMaterial.description,
          contentType: row.educationMaterial.contentType,
          contentFile: row.educationMaterialContentFile,
          createdBy: row.educationMaterialCreatedBy,
          createdAt: row.educationMaterial.createdAt,
          updatedAt: row.educationMaterial.updatedAt,
        },
        createdBy: row.createdBy,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      }));

      return {
        success: true,
        data: mappedEducationList,
      };
    } catch (error) {
      console.error('get education list error', error);
      throw error;
    }
  });
}

export default getEducationList;
