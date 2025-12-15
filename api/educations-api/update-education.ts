import { eq, sql } from 'drizzle-orm';
import { ipcMain } from 'electron';
import type { ApiResponseProps } from 'types/api-response-types';

import { getCurrentUser } from '@api/user-session';
import { getDb } from '@db/client';
import { educationAssignees, educations, type MutateEducationPayload } from '@db/schema';

function updateEducation() {
  ipcMain.handle('update-education', async (_, data: MutateEducationPayload): ApiResponseProps<string> => {
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

      if (!data.id) {
        return {
          success: false,
          error: 'Eğitim ID bulunamadı.',
        };
      }

      const { assigneeIds, id, ...educationData } = data;
      // UI duplicate gönderirse FK/unique kısıta takılmamak için listeyi benzersizleştiriyoruz.
      const uniqueAssigneeIds = Array.from(new Set(assigneeIds)).filter(Boolean);

      await db.transaction(async tx => {
        await tx
          .update(educations)
          .set({
            ...educationData,
            updatedAt: sql`(unixepoch())`,
          })
          .where(eq(educations.id, id));

        await tx.delete(educationAssignees).where(eq(educationAssignees.educationId, id));

        if (uniqueAssigneeIds.length > 0) {
          await tx.insert(educationAssignees).values(
            uniqueAssigneeIds.map(userId => ({
              educationId: id,
              assigneeUserId: userId,
            }))
          );
        }
      });

      return {
        success: true,
        data: 'Eğitim güncellendi.',
      };
    } catch (error) {
      console.error('update education error', error);
      throw error;
    }
  });
}

export default updateEducation;
