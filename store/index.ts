import Store from 'electron-store';

import { themes, type ThemeSchema, getTheme, setTheme } from './theme';

import type { LanguageTypes } from './lang';

export interface StoreSchema {
  theme: ThemeSchema;
  language: LanguageTypes;
}

export const store = new Store<StoreSchema>({
  defaults: {
    theme: themes.wireframe,
    language: 'tr',
  },
});

function registerStoreHandlers() {
  setTheme();
  getTheme();
}

export default registerStoreHandlers;
