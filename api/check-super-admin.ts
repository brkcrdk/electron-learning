import { eq } from 'drizzle-orm';
import { ipcMain } from 'electron';

import { db } from '../db/client';
import { users } from '../db/schema';

import type { ApiResponseProps } from '../types/api-response-types';

function checkSuperAdminHandler() {
  ipcMain.handle('check-super-admin-exists', async (): ApiResponseProps<boolean> => {
    try {
      const user = await db.query.users.findFirst({
        where: eq(users.roles, 'super-admin'),
      });

      if (user) {
        return {
          success: true,
          data: true,
        };
      }

      return {
        success: false,
        error: 'İlk giriş olduğu için super admin oluşturulmalı.',
      };
    } catch (error) {
      console.error('Failed to check super admin', error);

      return {
        success: false,
        error: 'Failed to check super admin',
      };
    }
  });
}

export default checkSuperAdminHandler;
