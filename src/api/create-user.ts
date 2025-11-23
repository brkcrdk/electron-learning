import { ipcMain, ipcRenderer, type IpcMainEvent } from 'electron';

import { db, users } from '../db';

export interface CreateUserData {
  email: string;
  name: string;
}

export type CreateUserEventType = (data: CreateUserData) => void;

export function createUserHandler() {
  ipcMain.on('create-user', (event: IpcMainEvent, data: CreateUserData) => {
    // console.log('createUser', data);
    db.insert(users).values(data);
  });
}

export const createUserEvent: CreateUserEventType = data => {
  return ipcRenderer.send('create-user', data);
};
// export function createUser(message: string) {
//   return ipcRenderer.send('create-user', message);
// }
