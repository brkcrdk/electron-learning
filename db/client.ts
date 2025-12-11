import path from 'path';

import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { app } from 'electron';

import * as schema from './schema';

/**
 * Veritabanı dosyasının path'ini döndürür
 * - Production: userData içindeki app.db
 * - Development: ./app.db
 */
function getDatabasePath() {
  if (import.meta.env.PROD) {
    return path.join(app.getPath('userData'), 'app.db');
  } else {
    return './app.db';
  }
}

const DATABASE_URL = `file:${getDatabasePath()}`;

const client = createClient({
  url: DATABASE_URL,
});

export const db = drizzle(client, { schema });

/**
 * Veritabanını başlatır - migration dosyalarını çalıştırarak tabloları oluşturur
 */
export async function initializeDatabase() {
  try {
    // Migration dosyalarının path'ini belirle
    // Electron build edildiğinde migration dosyaları da build klasörüne kopyalanmalı
    const migrationsFolder = path.join(__dirname, '../../drizzle');

    console.log('Veritabanı migration dosyaları uygulanıyor...');
    await migrate(db, { migrationsFolder });
    console.log('Veritabanı başarıyla başlatıldı.');
  } catch (error) {
    console.error('Veritabanı başlatma hatası:', error);
    throw error;
  }
}
