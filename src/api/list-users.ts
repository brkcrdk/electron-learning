import { desc } from 'drizzle-orm';
import { ipcMain } from 'electron';

import { db } from '../db/client';
import { users } from '../db/schema';

export function listUsersHandler() {
  ipcMain.handle('get-list-users', async () => {
    try {
      return await db.select().from(users).orderBy(desc(users.createdAt));
    } catch (error) {
      console.error('Failed to list users', error);
      throw error instanceof Error ? error : new Error('Unknown error');
    }
  });
}
