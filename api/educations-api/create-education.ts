import { ipcMain } from 'electron';
import type { ApiResponseProps } from 'types/api-response-types';

import { getCurrentUser } from '@api/user-session';
import { getDb } from '@db/client';
import { educationAssignees, educations, type MutateEducationPayload } from '@db/schema';

function createEducation() {
  ipcMain.handle('create-education', async (_, data: MutateEducationPayload): ApiResponseProps<string> => {
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

      const { assigneeIds, ...educationData } = data;
      const uniqueAssigneeIds = Array.from(new Set(assigneeIds ?? [])).filter(Boolean);

      await db.transaction(async tx => {
        const [createdEducation] = await tx
          .insert(educations)
          .values({
            ...educationData,
            createdBy: currentUser.id,
          })
          .returning({ id: educations.id });

        if (createdEducation?.id && uniqueAssigneeIds.length > 0) {
          await tx.insert(educationAssignees).values(
            uniqueAssigneeIds.map(userId => ({
              educationId: createdEducation.id,
              assigneeUserId: userId,
            }))
          );
        }
      });

      return {
        success: true,
        data: 'Eğitim oluşturuldu.',
      };
    } catch (error) {
      console.error('create education error', error);
      throw error;
    }
  });
}

export default createEducation;
