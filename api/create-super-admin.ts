import { ipcMain } from 'electron';

import { db } from '../db/client';
import { users } from '../db/schema';
import { type NewUserPayload } from '../db/schema/users';

import type { ApiResponseProps } from '../types/api-response-types';

function createSuperAdminHandler() {
  ipcMain.handle('create-super-admin', async (_, data: NewUserPayload): ApiResponseProps<string> => {
    try {
      await db.insert(users).values({
        email: data.email,
        name: data.name,
        password: data.password,
        roles: 'super-admin',
        status: 'active',
      });

      return {
        success: true,
        data: 'Super admin oluşturuldu.',
      };
    } catch (error) {
      console.error('Failed to create super admin', error);
      return {
        success: false,
        error: 'Super admin oluşturulamadı.',
      };
    }
  });
}
export default createSuperAdminHandler;
