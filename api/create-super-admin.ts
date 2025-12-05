import { sql } from 'drizzle-orm';
import { ipcMain } from 'electron';

import { setCurrentUser } from './user-session';
import { db } from '../db/client';
import { users } from '../db/schema';
import { type NewUserPayload } from '../db/schema/users';

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
          lastLoginAt: sql`CURRENT_TIMESTAMP`,
        })
        .returning();

      setCurrentUser(user);

      return {
        success: true,
        data: 'Super admin oluşturuldu.',
      };
    } catch (error) {
      console.error('Failed to create super admin', error);
      throw {
        success: false,
        error: 'Super admin oluşturulamadı.',
      };
    }
  });
}
export default createSuperAdminHandler;
