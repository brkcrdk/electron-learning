import { desc, eq, getTableColumns } from 'drizzle-orm';
import { alias } from 'drizzle-orm/sqlite-core';
import { ipcMain } from 'electron';
import type { ApiResponseProps } from 'types/api-response-types';

import { getCurrentUser } from '@api/user-session';
import { getDb } from '@db/client';
import { categories, educations, educationAssignees, educationMaterials, mediaFiles, type EducationListItem, users } from '@db/schema';

function getUsersEducation() {
  ipcMain.handle('get-users-education', async (): ApiResponseProps<EducationListItem[]> => {
    try {
      const db = getDb();

      const currentUser = getCurrentUser();

      if (!currentUser) {
        return {
          success: false,
          error: 'Giriş yapmış kullanıcı bulunamadı.',
        };
      }

      const materialContentFile = alias(mediaFiles, 'material_content_file');
      const materialCreatedBy = alias(users, 'material_created_by');

      const rows = await db
        .select({
          id: educations.id,
          name: educations.name,
          description: educations.description,
          category: getTableColumns(categories),
          coverImage: getTableColumns(mediaFiles),
          educationMaterial: getTableColumns(educationMaterials),
          educationMaterialContentFile: getTableColumns(materialContentFile),
          educationMaterialCreatedBy: getTableColumns(materialCreatedBy),
          createdBy: getTableColumns(users),
          createdAt: educations.createdAt,
          updatedAt: educations.updatedAt,
        })
        .from(educations)
        .innerJoin(educationAssignees, eq(educationAssignees.educationId, educations.id))
        .innerJoin(categories, eq(educations.categoryId, categories.id))
        .leftJoin(mediaFiles, eq(educations.coverImageId, mediaFiles.id))
        .innerJoin(educationMaterials, eq(educations.educationMaterial, educationMaterials.id))
        .innerJoin(materialContentFile, eq(educationMaterials.contentFileId, materialContentFile.id))
        .innerJoin(materialCreatedBy, eq(educationMaterials.createdBy, materialCreatedBy.id))
        .innerJoin(users, eq(educations.createdBy, users.id))
        .where(eq(educationAssignees.assigneeUserId, currentUser.id))
        .orderBy(desc(educations.createdAt));

      const educationList: EducationListItem[] = rows.map(row => ({
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
        data: educationList,
      };
    } catch (error) {
      console.error('get users education error', error);
      throw error;
    }
  });
}

export default getUsersEducation;
