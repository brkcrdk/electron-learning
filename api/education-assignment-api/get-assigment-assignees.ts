import { eq } from 'drizzle-orm';
import { ipcMain } from 'electron';
import type { ApiResponseProps } from 'types/api-response-types';

import { getCurrentUser } from '@api/user-session';
import { getDb } from '@db/client';
import { educationAssignees, users, type User } from '@db/schema';

type GetAssignmentAssigneesParams = {
  assignmentId: number;
};

function getAssigmentAssignees() {
  ipcMain.handle('get-education-assignment-assignees', async (_, params: GetAssignmentAssigneesParams): ApiResponseProps<User[]> => {
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

      const rows = await db
        .select({
          user: users,
        })
        .from(educationAssignees)
        .innerJoin(users, eq(educationAssignees.assigneeUserId, users.id))
        .where(eq(educationAssignees.assignmentId, params.assignmentId));

      const assignees = rows.map(row => row.user);

      return {
        success: true,
        data: assignees,
      };
    } catch (error) {
      console.error('get education assignment assignees error', error);
      throw error;
    }
  });
}

export default getAssigmentAssignees;
