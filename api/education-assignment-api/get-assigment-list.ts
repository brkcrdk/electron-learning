import { count, desc, eq, getTableColumns } from 'drizzle-orm';
import { alias } from 'drizzle-orm/sqlite-core';
import { ipcMain } from 'electron';
import type { ApiResponseProps, PaginatedData, PaginationParams } from 'types/api-response-types';

import { getCurrentUser } from '@api/user-session';
import { mapAssignmentRowToEducationListItem } from '@api/utils/education-list-item-mapper';
import { buildPaginatedResponse, getCount, normalizePaginationParams } from '@api/utils/pagination';
import { getDb } from '@db/client';
import {
  categories,
  educationAssignments,
  educationAssignees,
  educationMaterials,
  educations,
  mediaFiles,
  users,
  type EducationAssignmentListItem,
} from '@db/schema';

function getAssigmentList() {
  ipcMain.handle('get-education-assignment-list', async (_, params: PaginationParams = {}): ApiResponseProps<PaginatedData<EducationAssignmentListItem>> => {
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

      const { page, limit, offset } = normalizePaginationParams(params);

      // User aliases for assignments
      const createdByUser = alias(users, 'assignment_created_by_user');
      const assigneeUser = alias(users, 'assignment_assignee_user');

      // User and file aliases for education relations
      const educationCreatedBy = alias(users, 'education_created_by');
      const materialContentFile = alias(mediaFiles, 'material_content_file');
      const materialCreatedBy = alias(users, 'material_created_by');

      const dataQuery = db
        .select({
          // Assignment fields
          id: educationAssignments.id,
          title: educationAssignments.title,
          description: educationAssignments.description,
          createdAt: educationAssignments.createdAt,
          updatedAt: educationAssignments.updatedAt,
          createdBy: getTableColumns(createdByUser),
          assignee: getTableColumns(assigneeUser),
          // Education fields
          education: {
            id: educations.id,
            name: educations.name,
            description: educations.description,
            createdAt: educations.createdAt,
            updatedAt: educations.updatedAt,
          },
          category: getTableColumns(categories),
          coverImage: getTableColumns(mediaFiles),
          educationMaterial: getTableColumns(educationMaterials),
          educationMaterialContentFile: getTableColumns(materialContentFile),
          educationMaterialCreatedBy: getTableColumns(materialCreatedBy),
          educationCreatedBy: getTableColumns(educationCreatedBy),
        })
        .from(educationAssignments)
        // Assignment joins
        .innerJoin(createdByUser, eq(educationAssignments.createdBy, createdByUser.id))
        .leftJoin(educationAssignees, eq(educationAssignments.id, educationAssignees.assignmentId))
        .leftJoin(assigneeUser, eq(educationAssignees.assigneeUserId, assigneeUser.id))
        // Education joins
        .innerJoin(educations, eq(educationAssignments.educationId, educations.id))
        .innerJoin(categories, eq(educations.categoryId, categories.id))
        .leftJoin(mediaFiles, eq(educations.coverImageId, mediaFiles.id))
        .innerJoin(educationCreatedBy, eq(educations.createdBy, educationCreatedBy.id))
        // Education material joins
        .innerJoin(educationMaterials, eq(educations.educationMaterial, educationMaterials.id))
        .innerJoin(materialContentFile, eq(educationMaterials.contentFileId, materialContentFile.id))
        .innerJoin(materialCreatedBy, eq(educationMaterials.createdBy, materialCreatedBy.id))
        .orderBy(desc(educationAssignments.createdAt))
        .limit(limit)
        .offset(offset);

      const countQuery = db.select({ count: count() }).from(educationAssignments);

      const [rows, total] = await Promise.all([dataQuery, getCount(countQuery)]);

      const assignmentMap = new Map<number, EducationAssignmentListItem>();

      for (const row of rows) {
        const assignee = row.assignee?.id ? row.assignee : null;
        const existing = assignmentMap.get(row.id);

        if (!existing) {
          assignmentMap.set(row.id, {
            id: row.id,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
            title: row.title,
            description: row.description,
            createdBy: row.createdBy,
            assignees: assignee ? [assignee] : [],
            education: mapAssignmentRowToEducationListItem(row),
          });
        } else if (assignee) {
          existing.assignees.push(assignee);
        }
      }

      const assignmentList = Array.from(assignmentMap.values());
      const paginatedResponse = buildPaginatedResponse(assignmentList, total, page, limit);

      return {
        success: true,
        data: paginatedResponse,
      };
    } catch (error) {
      console.error('get education assignment list error', error);
      throw error;
    }
  });
}

export default getAssigmentList;
