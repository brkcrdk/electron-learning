import { eq, sql } from 'drizzle-orm';
import { ipcMain } from 'electron';

import { getDb } from '@db/client';
import { users, type User } from '@db/schema';

import type { ApiResponseProps } from '../../types/api-response-types';
import { setCurrentUser } from '../user-session';
import { comparePassword } from '../utils/password';

export interface LoginPayload {
  username: string;
  password: string;
}

function login() {
  ipcMain.handle('login', async (_, data: LoginPayload): ApiResponseProps<User> => {
    try {
      const db = getDb();

      const user = await db.query.users.findFirst({
        where: eq(users.username, data.username),
      });

      if (!user) {
        return {
          success: false,
          error: 'Kullanıcı bulunamadı.',
        };
      }

      // Şifreyi hash'lenmiş şifre ile karşılaştır
      const isPasswordValid = await comparePassword(data.password, user.password);
      if (!isPasswordValid) {
        return {
          success: false,
          error: 'Şifre yanlış.',
        };
      }

      const [updatedUser] = await db
        .update(users)
        .set({ lastLoginAt: sql`(unixepoch())` })
        .where(eq(users.id, user.id))
        .returning();

      setCurrentUser(updatedUser);

      return {
        success: true,
        data: updatedUser,
      };
    } catch (error) {
      console.error('login error', error);
      throw error;
    }
  });
}

export default login;
