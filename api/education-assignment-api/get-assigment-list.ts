import { count, desc, eq, getTableColumns } from 'drizzle-orm';
import { alias } from 'drizzle-orm/sqlite-core';
import { ipcMain } from 'electron';
import type { ApiResponseProps, PaginatedData, PaginationParams } from 'types/api-response-types';

import { getCurrentUser } from '@api/user-session';
import { buildPaginatedResponse, getCount, normalizePaginationParams } from '@api/utils/pagination';
import { getDb } from '@db/client';
import { educationAssignments, educationAssignees, users, type EducationAssignmentListItem } from '@db/schema';

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

      const createdByUser = alias(users, 'assignment_created_by_user');
      const assigneeUser = alias(users, 'assignment_assignee_user');

      const dataQuery = db
        .select({
          id: educationAssignments.id,
          educationId: educationAssignments.educationId,
          createdAt: educationAssignments.createdAt,
          updatedAt: educationAssignments.updatedAt,
          title: educationAssignments.title,
          description: educationAssignments.description,
          createdBy: getTableColumns(createdByUser),
          assignee: getTableColumns(assigneeUser),
        })
        .from(educationAssignments)
        .innerJoin(createdByUser, eq(educationAssignments.createdBy, createdByUser.id))
        .leftJoin(educationAssignees, eq(educationAssignments.id, educationAssignees.assignmentId))
        .leftJoin(assigneeUser, eq(educationAssignees.assigneeUserId, assigneeUser.id))
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
            educationId: row.educationId,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
            title: row.title,
            description: row.description,
            createdBy: row.createdBy,
            assignees: assignee ? [assignee] : [],
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
