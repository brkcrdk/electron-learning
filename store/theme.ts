import { ipcMain } from 'electron';

import { store } from '.';

export type ThemeType = 'wireframe' | 'dark';

export interface ThemeSchema {
  id: ThemeType;
  name: string;
  backgroundColor: string;
}

export const themes: Record<ThemeType, ThemeSchema> = {
  wireframe: {
    id: 'wireframe',
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
  ipcMain.handle('set-theme', async (_, theme: ThemeType): Promise<ThemeSchema> => {
    const selectedTheme = themes[theme];
    store.set('theme', selectedTheme);
    return selectedTheme;
  });
};

export const getTheme = () => {
  ipcMain.handle('get-theme', () => store.get('theme'));
};
