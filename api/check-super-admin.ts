import { eq } from 'drizzle-orm';
import { ipcMain } from 'electron';

import { getDb } from '@db/client';
import { users } from '@db/schema';

import type { ApiResponseProps } from '../types/api-response-types';

function checkSuperAdminHandler() {
  ipcMain.handle('check-super-admin-exists', async (): ApiResponseProps<boolean> => {
    try {
      const db = getDb();

      const user = await db.query.users.findFirst({
        where: eq(users.role, 'super-admin'),
      });

      if (user) {
        return {
          success: true,
          data: true,
        };
      }

      return {
        success: false,
        error: 'İlk giriş olduğu için super admin oluşturulamalı.',
      };
    } catch (error) {
      console.error('check super admin error', error);

      throw error;
    }
  });
}

export default checkSuperAdminHandler;
