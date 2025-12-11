import path from 'path';

import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { app } from 'electron';

import * as schema from './schema';

const getDatabasePath = (): string => {
  // app.getPath('userData') genelde app.isReady() olmadan da çalışır
  // Ama güvenli olan kontrol etmek
  if (app && app.isReady()) {
    return path.join(app.getPath('userData'), 'app.db');
  }

  // Eğer app henüz hazır değilse, userData path'ini manuel oluştur
  // veya app.isReady() bekleyebiliriz
  // Ama genelde bu durum oluşmaz çünkü db import'u app.on('ready') sonrası yapılır
  return path.join(app.getPath('userData'), 'app.db');
};

const DATABASE_URL = `file:${getDatabasePath()}`;

const client = createClient({
  url: DATABASE_URL,
});

export const db = drizzle(client, { schema });
