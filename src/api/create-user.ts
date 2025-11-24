import { ipcMain, type IpcMainEvent } from 'electron';

import { db } from '../db/client';
import { users } from '../db/schema';

export interface CreateUserData {
  email: string;
  name: string;
}

export type CreateUserEventType = (data: CreateUserData) => void;

export function createUserHandler() {
  ipcMain.on('create-user', async (event: IpcMainEvent, data: CreateUserData) => {
    try {
      const [user] = await db
        .insert(users)
        .values({
          email: data.email,
          name: data.name,
        })
        .returning();

      event.reply('create-user:success', user);
    } catch (error) {
      console.error('Failed to create user', error);
      event.reply('create-user:error', {
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  });
}
