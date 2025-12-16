import { and, eq, ne, sql } from 'drizzle-orm';
import { ipcMain } from 'electron';

import { getDb } from '@db/client';
import { users, type MutateUserPayload } from '@db/schema';

import type { ApiResponseProps } from '../../types/api-response-types';
import { getCurrentUser } from '../user-session';
import { hashPassword } from '../utils/password';

function updateUser() {
  ipcMain.handle('update-user', async (_, data: MutateUserPayload): ApiResponseProps<string> => {
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

      if (currentUser.role !== 'super-admin' && data.role === 'super-admin') {
        return {
          success: false,
          error: 'Super admin rolünü değiştiremezsiniz.',
        };
      }

      // Username duplicate kontrolü (kendi username'i hariç)
      if (data.username && data.id) {
        const hasUserWithSameUsername = await db.query.users.findFirst({
          where: and(eq(users.username, data.username), ne(users.id, data.id)),
        });

        if (hasUserWithSameUsername) {
          return {
            success: false,
            error: 'Bu kullanıcı adıyla zaten bir kullanıcı var.',
          };
        }
      }

      if (data.id) {
        // Şifre güncelleniyorsa hash'le
        const updateData = { ...data };
        if (updateData.password) {
          updateData.password = await hashPassword(updateData.password);
        }

        await db
          .update(users)
          .set({
            ...updateData,
            updatedAt: sql`(unixepoch())`,
          })
          .where(eq(users.id, data.id));
      } else {
        return {
          success: false,
          error: 'Kullanıcı bulunamadı.',
        };
      }

      return {
        success: true,
        data: 'Kullanıcı güncellendi.',
      };
    } catch (error) {
      console.error('update user error', error);
      throw error;
    }
  });
}

export default updateUser;
