import { desc, ne } from 'drizzle-orm';
import { ipcMain } from 'electron';

import { getDb } from '@db/client';
import { users, type User } from '@db/schema';

import type { ApiResponseProps } from '../../types/api-response-types';
import { getCurrentUser } from '../user-session';

function getUserList() {
  ipcMain.handle('get-user-list', async (): ApiResponseProps<User[]> => {
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

      // Eğer kullanıcı super-admin değilse, super-admin rolündeki kullanıcıları filtrele
      if (currentUser.role === 'super-admin') {
        const userList = await db.select().from(users).orderBy(desc(users.createdAt));
        return {
          success: true,
          data: userList,
        };
      } else {
        const userList = await db.select().from(users).where(ne(users.role, 'super-admin')).orderBy(desc(users.createdAt));
        return {
          success: true,
          data: userList,
        };
      }
    } catch (error) {
      console.error('get user list error', error);
      throw error;
    }
  });
}
export default getUserList;
