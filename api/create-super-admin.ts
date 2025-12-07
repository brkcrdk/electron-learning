import { sql } from 'drizzle-orm';
import { ipcMain } from 'electron';

import { db } from '@db/client';
import { users, type NewUserPayload } from '@db/schema';

import { setCurrentUser } from './user-session';

import type { ApiResponseProps } from '../types/api-response-types';

function createSuperAdminHandler() {
  ipcMain.handle('create-super-admin', async (_, data: NewUserPayload): ApiResponseProps<string> => {
    try {
      const [user] = await db
        .insert(users)
        .values({
          email: data.email,
          name: data.name,
          password: data.password,
          roles: 'super-admin',
          status: 'active',
          lastLoginAt: sql`(unixepoch())`,
        })
        .returning();

      setCurrentUser(user);

      return {
        success: true,
        data: 'Super admin oluşturuldu.',
      };
    } catch (error) {
      console.error('create super admin error', error);
      throw {
        success: false,
        error: 'Super admin oluşturulurken bir hata gerçekleşti.',
      };
    }
  });
}
export default createSuperAdminHandler;
