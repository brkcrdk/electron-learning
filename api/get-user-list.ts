import { desc } from 'drizzle-orm';
import { ipcMain } from 'electron';

import { getCurrentUser } from './user-session';
import { db } from '../db/client';
import { users } from '../db/schema';

function getUserListHandler() {
  ipcMain.handle('get-user-list', async () => {
    try {
      const currentUser = getCurrentUser();

      return await db.select().from(users).orderBy(desc(users.createdAt));
    } catch (error) {
      console.error('Failed to list users', error);
      throw error instanceof Error ? error : new Error('Unknown error');
    }
  });
}
export default getUserListHandler;
