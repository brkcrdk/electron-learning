import { desc, eq, getTableColumns } from 'drizzle-orm';
import { alias } from 'drizzle-orm/sqlite-core';
import { ipcMain } from 'electron';

import { getCurrentUser } from '@api/user-session';
import { mapStandardRowToEducationListItem } from '@api/utils/education-list-item-mapper';
import { getDb } from '@db/client';
import { categories, educations, educationMaterials, mediaFiles, userEducationFavorites, users } from '@db/schema';
import type { CurrentUserFavoritesListItem } from '@db/schema/user-education-favorites';

import type { ApiResponseProps } from '../../types/api-response-types';

function getCurrentUserFavorites() {
  ipcMain.handle('get-current-user-favorites', async (): ApiResponseProps<CurrentUserFavoritesListItem[]> => {
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
          favoriteId: userEducationFavorites.id,
          favoriteCreatedAt: userEducationFavorites.createdAt,
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
        .from(userEducationFavorites)
        .innerJoin(educations, eq(userEducationFavorites.educationId, educations.id))
        .innerJoin(categories, eq(educations.categoryId, categories.id))
        .leftJoin(mediaFiles, eq(educations.coverImageId, mediaFiles.id))
        .innerJoin(educationMaterials, eq(educations.educationMaterial, educationMaterials.id))
        .innerJoin(materialContentFile, eq(educationMaterials.contentFileId, materialContentFile.id))
        .innerJoin(materialCreatedBy, eq(educationMaterials.createdBy, materialCreatedBy.id))
        .innerJoin(users, eq(educations.createdBy, users.id))
        .where(eq(userEducationFavorites.userId, currentUser.id))
        .orderBy(desc(userEducationFavorites.createdAt));

      const favoritesList: CurrentUserFavoritesListItem[] = rows.map(row => ({
        id: row.favoriteId,
        createdAt: row.favoriteCreatedAt,
        education: mapStandardRowToEducationListItem({
          id: row.id,
          name: row.name,
          description: row.description,
          category: row.category,
          coverImage: row.coverImage,
          educationMaterial: row.educationMaterial,
          educationMaterialContentFile: row.educationMaterialContentFile,
          educationMaterialCreatedBy: row.educationMaterialCreatedBy,
          createdBy: row.createdBy,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt,
        }),
      }));

      return {
        success: true,
        data: favoritesList,
      };
    } catch (error) {
      console.error('get current user favorites error', error);
      throw error;
    }
  });
}

export default getCurrentUserFavorites;
