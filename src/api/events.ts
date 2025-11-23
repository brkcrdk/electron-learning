import { ipcRenderer } from 'electron';

import type { CreateUserData } from './create-user';

export type CreateUserEventType = (data: CreateUserData) => void;

export const createUserEvent: CreateUserEventType = data => {
  return ipcRenderer.send('create-user', data);
};
