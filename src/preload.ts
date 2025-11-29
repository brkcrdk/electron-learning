import { contextBridge } from 'electron';

import apiEventList from '../api/api-event-list';
import storeEventList from '../store/store-event-list';

contextBridge.exposeInMainWorld('electronAPI', apiEventList);
contextBridge.exposeInMainWorld('store', storeEventList);
