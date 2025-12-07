import { desc } from 'drizzle-orm';
import { ipcMain } from 'electron';

import { getCurrentUser } from './user-session';
import { db } from '../db/client';
import { users, type User } from '../db/schema';

import type { ApiResponseProps } from '../types/api-response-types';

function getUserListHandler() {
  ipcMain.handle('get-user-list', async (): ApiResponseProps<User[]> => {
    try {
      const currentUser = getCurrentUser();

      // if (currentUser.roles === 'user') {
      //   throw {
      //     success: false,
      //     error: 'Bu işlemi yapmak için yetkiniz yok.',
      //   };
      // }

      const userList = await db.select().from(users).orderBy(desc(users.createdAt));

      return {
        success: true,
        data: userList,
      };
    } catch (error) {
      console.error('Failed to list users', error);
      throw error instanceof Error ? error : new Error('Unknown error');
    }
  });
}
export default getUserListHandler;
