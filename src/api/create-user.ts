// import { ipcMain, type IpcMainEvent } from 'electron';

// // import db from '../db';
// import { db } from '../db';

// export interface CreateUserData {
//   email: string;
//   name: string;
// }

// export function createUserHandler() {
//   ipcMain.on('create-user', async (_event: IpcMainEvent, data: CreateUserData) => {
//     await db
//       .insertInto('users')
//       .values({
//         name: data.name,
//         email: data.email,
//         created_at: new Date().toISOString(),
//         id: crypto.randomUUID(),
//       })
//       .returningAll()
//       .executeTakeFirstOrThrow();

//     const users = await db.selectFrom('users').selectAll().execute();
//     console.log('User Data:', users, data);
//   });
// }

import { ipcMain, ipcRenderer, type IpcMainEvent } from 'electron';

import { db } from '../db';

export interface CreateUserData {
  email: string;
  name: string;
}

export type CreateUserEventType = (data: CreateUserData) => void;

export function createUserHandler() {
  ipcMain.on('create-user', async (event: IpcMainEvent, data: CreateUserData) => {
    // console.log('createUser', data);
    await db
      .insertInto('users')
      .values({
        name: data.name,
        email: data.email,
        created_at: new Date().toISOString(),
        id: crypto.randomUUID(),
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    const users = await db.selectFrom('users').selectAll().execute();
    console.log('User Data:', users, data);
  });
}

export const createUserEvent: CreateUserEventType = data => {
  return ipcRenderer.send('create-user', data);
};
