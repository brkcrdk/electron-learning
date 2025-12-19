import { desc, eq, getTableColumns } from 'drizzle-orm';
import { alias } from 'drizzle-orm/sqlite-core';
import { ipcMain } from 'electron';
import type { ApiResponseProps } from 'types/api-response-types';

import { getCurrentUser } from '@api/user-session';
import { mapStandardRowToEducationListItem } from '@api/utils/education-list-item-mapper';
import { getDb } from '@db/client';
import {
  categories,
  educations,
  educationAssignees,
  educationAssignments,
  educationMaterials,
  mediaFiles,
  type EducationListItem,
  userEducationFavorites,
  users,
} from '@db/schema';

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

      // Get user's favorite education IDs
      const userFavorites = await db
        .select({ educationId: userEducationFavorites.educationId })
        .from(userEducationFavorites)
        .where(eq(userEducationFavorites.userId, currentUser.id));

      const favoriteEducationIds = new Set(userFavorites.map(fav => fav.educationId));

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
        .innerJoin(educationAssignments, eq(educationAssignments.educationId, educations.id))
        .innerJoin(educationAssignees, eq(educationAssignees.assignmentId, educationAssignments.id))
        .innerJoin(categories, eq(educations.categoryId, categories.id))
        .leftJoin(mediaFiles, eq(educations.coverImageId, mediaFiles.id))
        .innerJoin(educationMaterials, eq(educations.educationMaterial, educationMaterials.id))
        .innerJoin(materialContentFile, eq(educationMaterials.contentFileId, materialContentFile.id))
        .innerJoin(materialCreatedBy, eq(educationMaterials.createdBy, materialCreatedBy.id))
        .innerJoin(users, eq(educations.createdBy, users.id))
        .where(eq(educationAssignees.assigneeUserId, currentUser.id))
        .orderBy(desc(educations.createdAt));

      // Filter only favorite educations and map them
      const educationList: EducationListItem[] = rows
        .filter(row => favoriteEducationIds.has(row.id))
        .map(row =>
          mapStandardRowToEducationListItem({
            ...row,
            isFavorite: true,
          })
        );

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
