import { sql } from 'drizzle-orm';
import { ipcMain } from 'electron';

import { getDb } from '@db/client';
import { users, type MutateUserPayload } from '@db/schema';

import type { ApiResponseProps } from '../../types/api-response-types';
import { setCurrentUser } from '../user-session';
import { hashPassword } from '../utils/password';

function createSuperAdmin() {
  ipcMain.handle('create-super-admin', async (_, data: MutateUserPayload): ApiResponseProps<string> => {
    try {
      const db = getDb();

      // Şifreyi hash'le
      const hashedPassword = await hashPassword(data.password);

      const [user] = await db
        .insert(users)
        .values({
          username: data.username,
          name: data.name,
          password: hashedPassword,
          role: 'super-admin',
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
      throw error;
    }
  });
}
export default createSuperAdmin;
