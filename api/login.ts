import { eq, sql } from 'drizzle-orm';
import { ipcMain } from 'electron';

import { setCurrentUser } from './user-session';
import { db } from '../db/client';
import { type User, users } from '../db/schema';

import type { ApiResponseProps } from '../types/api-response-types';

export interface LoginPayload {
  email: string;
  password: string;
}

function loginHandler() {
  ipcMain.handle('login', async (_, data: LoginPayload): ApiResponseProps<User> => {
    try {
      const user = await db.query.users.findFirst({
        where: eq(users.email, data.email),
      });

      if (!user) {
        return {
          success: false,
          error: 'Kullanıcı bulunamadı.',
        };
      }

      if (user.password !== data.password) {
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
        data: user,
      };
    } catch (error) {
      console.error('login error', error);
      throw {
        success: false,
        error: 'Kullanıcı girişi yapılırken bir hata gerçekleşti.',
      };
    }
  });
}

export default loginHandler;
