import path from 'node:path';

import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { app } from 'electron';

import * as schema from './schema';

// Veritabanı dosyasının yolu
// Electron uygulamasında userData klasörünü kullan
const getDatabasePath = () => {
  if (app && app.isReady()) {
    return path.join(app.getPath('userData'), 'database.db');
  }
  // Migration script'leri için fallback
  return path.join(process.cwd(), 'database.db');
};

// SQLite veritabanı bağlantısı
const sqlite = new Database(getDatabasePath());

// Drizzle instance
export const db = drizzle(sqlite, { schema });

// Schema export
export { schema };
export * from './schema';
