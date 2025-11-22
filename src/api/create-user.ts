import { ipcMain, ipcRenderer, type IpcMainEvent } from 'electron';

export interface CreateUserData {
  email: string;
  name: string;
}

export type CreateUserEventType = (data: CreateUserData) => void;

export function createUserHandler() {
  ipcMain.on('create-user', (event: IpcMainEvent, data: CreateUserData) => {
    console.log('createUser', data);
  });
}

export const createUserEvent: CreateUserEventType = data => {
  return ipcRenderer.send('create-user', data);
};
// export function createUser(message: string) {
//   return ipcRenderer.send('create-user', message);
// }
