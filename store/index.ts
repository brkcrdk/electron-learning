import Store from 'electron-store';

import type { LanguageTypes } from './lang';
import { themes, type ThemeSchema, getTheme, setTheme } from './theme';

export interface StoreSchema {
  theme: ThemeSchema;
  language: LanguageTypes;
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
}

export default registerStoreHandlers;
