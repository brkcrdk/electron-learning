import { createUserHandler, createUserEvent } from './create-user';

export function registerApiHandlers() {
  createUserHandler();
}

/**
 * Burada tanımlanan api functionları `renderer` tarafına `preload.ts` ile expose edilir.
 *
 * `as const` kullanılarak tip tanımlaması da oluşuturulur ve böylece `window.electronAPI` objesinin tipi sabitlenir.
 * Bu sayede `ui` tarafında `window.electronAPI` objesinin tip tanımlaması bu objeden oluşuturulur.
 */
export const apiExposerHandlers = {
  createUserEvent,
} as const;

export type ApiExposerHandlers = typeof apiExposerHandlers;

declare global {
  interface Window {
    electronAPI: ApiExposerHandlers;
  }
}
