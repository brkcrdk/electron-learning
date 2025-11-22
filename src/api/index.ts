import { createUserHandler, createUserEvent } from './create-user';

export function registerApiHandlers() {
  createUserHandler();
}

export const apiExposerHandlers = {
  createUserEvent,
} as const;

export type ApiExposerHandlers = typeof apiExposerHandlers;

declare global {
  interface Window {
    electronAPI: ApiExposerHandlers;
  }
}
