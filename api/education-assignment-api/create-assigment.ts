import { eq } from 'drizzle-orm';
import { ipcMain } from 'electron';
import type { ApiResponseProps } from 'types/api-response-types';

import { getCurrentUser } from '@api/user-session';
import { getDb } from '@db/client';
import { educations, educationAssignments, educationAssignees, type MutateEducationAssignmentPayload } from '@db/schema';

function createAssigment() {
  ipcMain.handle('create-education-assignment', async (_, payload: MutateEducationAssignmentPayload): ApiResponseProps<string> => {
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

      const { educationId, assigneeUserIds } = payload;

      const [education] = await db.select().from(educations).where(eq(educations.id, educationId)).limit(1);

      if (!education) {
        return {
          success: false,
          error: 'Eğitim bulunamadı.',
        };
      }

      const [assignment] = await db
        .insert(educationAssignments)
        .values({
          educationId,
          createdBy: currentUser.id,
        })
        .returning();

      if (assigneeUserIds.length > 0) {
        const assigneeValues = assigneeUserIds.map(userId => ({
          assignmentId: assignment.id,
          assigneeUserId: userId,
        }));

        await db.insert(educationAssignees).values(assigneeValues);
      }

      return {
        success: true,
        data: 'Eğitim ataması başarıyla oluşturuldu.',
      };
    } catch (error) {
      console.error('create education assignment error', error);
      throw error;
    }
  });
}

export default createAssigment;
