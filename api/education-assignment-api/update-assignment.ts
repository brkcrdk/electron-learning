import { and, eq, inArray, sql } from 'drizzle-orm';
import { ipcMain } from 'electron';
import type { ApiResponseProps } from 'types/api-response-types';

import { getCurrentUser } from '@api/user-session';
import { getDb } from '@db/client';
import { educationAssignments, educationAssignees, type UpdateEducationAssignmentPayload } from '@db/schema';

function updateAssignment() {
  ipcMain.handle('update-education-assignment', async (_, data: UpdateEducationAssignmentPayload): ApiResponseProps<string> => {
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

      const { assignmentId, assigneeUserIds = [], ...assignmentData } = data;

      if (!assignmentId) {
        return {
          success: false,
          error: 'Eğitim ataması ID bulunamadı.',
        };
      }

      // 1) Assignment temel alanlarını güncelle
      await db
        .update(educationAssignments)
        .set({
          ...assignmentData,
          updatedAt: sql`(unixepoch())`,
        })
        .where(eq(educationAssignments.id, assignmentId));

      // 2) Mevcut assignee listesini çek
      const existingAssignees = await db
        .select({ assigneeUserId: educationAssignees.assigneeUserId })
        .from(educationAssignees)
        .where(eq(educationAssignees.assignmentId, assignmentId));

      const existingIds = existingAssignees.map(assignee => assignee.assigneeUserId);
      const newIds = assigneeUserIds;

      // 3) Final listeye göre diff hesapla
      const toAdd = newIds.filter((userId: number) => !existingIds.includes(userId));
      const toRemove = existingIds.filter((userId: number) => !newIds.includes(userId));

      // 4) Eklenecek kullanıcılar
      if (toAdd.length > 0) {
        await db.insert(educationAssignees).values(
          toAdd.map(userId => ({
            assignmentId,
            assigneeUserId: userId,
          }))
        );
      }

      // 5) Çıkarılacak kullanıcılar
      if (toRemove.length > 0) {
        await db.delete(educationAssignees).where(and(eq(educationAssignees.assignmentId, assignmentId), inArray(educationAssignees.assigneeUserId, toRemove)));
      }

      return {
        success: true,
        data: 'Eğitim ataması güncellendi.',
      };
    } catch (error) {
      console.error('update education assignment error', error);
      throw error;
    }
  });
}

export default updateAssignment;
