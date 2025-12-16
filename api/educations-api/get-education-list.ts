import { desc, eq, getTableColumns } from 'drizzle-orm';
import { alias } from 'drizzle-orm/sqlite-core';
import { ipcMain } from 'electron';
import type { ApiResponseProps } from 'types/api-response-types';

import { getCurrentUser } from '@api/user-session';
import { getDb } from '@db/client';
import { categories, educations, educationAssignees, educationMaterials, mediaFiles, type EducationListItem, type User, users } from '@db/schema';

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

      const assigneeUsers = alias(users, 'assignee_users');
      const materialContentFile = alias(mediaFiles, 'material_content_file');
      const materialCreatedBy = alias(users, 'material_created_by');

      const rows = await db
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
          assignee: getTableColumns(assigneeUsers),
        })
        .from(educations)
        .innerJoin(categories, eq(educations.categoryId, categories.id))
        .leftJoin(mediaFiles, eq(educations.coverImageId, mediaFiles.id))
        .innerJoin(educationMaterials, eq(educations.educationMaterial, educationMaterials.id))
        .innerJoin(users, eq(educations.createdBy, users.id))
        .leftJoin(educationAssignees, eq(educationAssignees.educationId, educations.id))
        .leftJoin(assigneeUsers, eq(educationAssignees.assigneeUserId, assigneeUsers.id))
        .innerJoin(materialContentFile, eq(educationMaterials.contentFileId, materialContentFile.id))
        .innerJoin(materialCreatedBy, eq(educationMaterials.createdBy, materialCreatedBy.id))
        .orderBy(desc(educations.createdAt));

      // Satır bazlı join sonucunu educationId’ye göre gruplayıp assignees listesini oluşturuyoruz.
      const educationList = rows.reduce<EducationListItem[]>((acc, row) => {
        const existing = acc.find(item => item.id === row.id);

        const assigneeId = row.assignee?.id;
        const assigneeUser = assigneeId ? (row.assignee as User) : undefined;

        if (!existing) {
          acc.push({
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
            assignees: assigneeUser ? [assigneeUser] : [],
          });
          return acc;
        }

        const assigneeAlreadyAdded = assigneeUser ? existing.assignees.some(user => user.id === assigneeId) : true;

        if (assigneeUser && !assigneeAlreadyAdded) {
          existing.assignees.push(assigneeUser);
        }

        return acc;
      }, []);

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
