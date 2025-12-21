import { ipcMain } from 'electron';
import Store from 'electron-store';

import type { LanguageTypes } from './lang';
import { themes, type ThemeSchema, getTheme, setTheme } from './theme';

export interface StoreSchema {
  theme: ThemeSchema;
  language: LanguageTypes;
  lastCleanup?: number; // Unix timestamp (milliseconds)
}

export const store = new Store<StoreSchema>({
  defaults: {
    theme: themes.light,
    language: 'tr',
  },
});

function registerStoreHandlers() {
  setTheme();
  getTheme();

  // Cleanup timestamp handlers
  ipcMain.handle('get-last-cleanup', () => {
    return store.get('lastCleanup');
  });

  ipcMain.handle('set-last-cleanup', (_, timestamp: number) => {
    store.set('lastCleanup', timestamp);
    return timestamp;
  });
}

export default registerStoreHandlers;
