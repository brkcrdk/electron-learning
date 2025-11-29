import { ipcRenderer } from 'electron';

import type { ThemeType } from './theme';

const storeEventList = {
  setTheme: (theme: ThemeType) => ipcRenderer.invoke('set-theme', theme),
  getTheme: (): Promise<ThemeType> => ipcRenderer.invoke('get-theme'),
} as const;

export default storeEventList;

declare global {
  interface Window {
    store: typeof storeEventList;
  }
}
