import { ipcRenderer } from 'electron';

import type { ThemeSchema, ThemeType } from './theme';

const storeEventList = {
  setTheme: (theme: ThemeType): Promise<ThemeSchema> => ipcRenderer.invoke('set-theme', theme),
  getTheme: (): Promise<ThemeSchema> => ipcRenderer.invoke('get-theme'),
} as const;

export default storeEventList;

declare global {
  interface Window {
    store: typeof storeEventList;
  }
}
