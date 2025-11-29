import { ipcMain } from 'electron';

import { store } from '.';

export type ThemeType = 'cupcake' | 'dark';

export interface ThemeSchema {
  id: ThemeType;
  name: string;
  backgroundColor: string;
}

export const themes: Record<ThemeType, ThemeSchema> = {
  cupcake: {
    id: 'cupcake',
    name: 'Light',
    backgroundColor: '#faf7f5',
  },
  dark: {
    id: 'dark',
    name: 'Koyu',
    backgroundColor: '#1d232a',
  },
};

export const setTheme = () => {
  ipcMain.handle('set-theme', (_, theme: ThemeType) => {
    const selectedTheme = themes[theme];
    store.set('theme', selectedTheme);
  });
};

export const getTheme = () => {
  ipcMain.handle('get-theme', () => store.get('theme'));
};
