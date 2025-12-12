import path from 'path';

import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
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
    return './development.db';
  }
}

const sqlite = new Database(getDatabasePath());
sqlite.pragma('journal_mode = WAL'); // Performans için

export const db = drizzle(sqlite, { schema });

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
