import { contextBridge } from 'electron';

import { apiExposerHandlers } from './api';

contextBridge.exposeInMainWorld('electronAPI', {
  ...apiExposerHandlers,
});
