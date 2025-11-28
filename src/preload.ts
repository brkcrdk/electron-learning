import { contextBridge } from 'electron';

import apiEventList from '../api/api-event-list';

contextBridge.exposeInMainWorld('electronAPI', apiEventList);
