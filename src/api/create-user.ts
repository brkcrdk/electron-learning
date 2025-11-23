import { ipcMain, type IpcMainEvent } from 'electron';

import { createUser } from '../db';

export interface CreateUserData {
  email: string;
  name: string;
}

export function createUserHandler() {
  ipcMain.on('create-user', (_event: IpcMainEvent, data: CreateUserData) => {
    // console.log('createUser', data);
    createUser({
      email: data.email,
      name: data.name,
    });
  });
}
