import fs from 'fs';
import path from 'path';

import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import type { App } from 'electron';

import * as schema from './schema';

let sqlite: Database.Database | null = null;
let db: ReturnType<typeof drizzle> | null = null;

/**
 * Veritabanı dosyasının path'ini döndürür
 * - Production: userData içindeki app.db
 * - Development: ./development.db
 */
function getDatabasePath(app: App) {
  if (app.isPackaged) {
    return path.join(app.getPath('userData'), 'app.db');
  }
  return './development.db';
}

/**
 * Migration dosyalarının path'ini döndürür
 *
 * Çözüm: https://github.com/drizzle-team/drizzle-orm/discussions/1891
 * - Development: Proje kökündeki drizzle klasörü
 * - Production: resources/drizzle klasörü (build sırasında kopyalanır)
 */
function getMigrationsPath(app: App) {
  if (app.isPackaged) {
    // Production: __dirname = .vite/build, migration dosyaları ../../resources/drizzle içinde
    return path.join(__dirname, '../../resources/drizzle');
  }
  // Development: __dirname = db, migration dosyaları ../../drizzle içinde
  return path.join(__dirname, '../../drizzle');
}

/**
 * Veritabanı bağlantısını döndürür
 */
export function getDb() {
  if (!db) {
    throw new Error('Veritabanı henüz başlatılmadı. initializeDatabase() çağrılmalı.');
  }
  return db;
}

/**
 * Veritabanını başlatır - migration dosyalarını çalıştırarak tabloları oluşturur
 * app.whenReady() içinde çağrılmalıdır
 */
export async function initializeDatabase(app: App) {
  try {
    if (sqlite || db) {
      console.warn('Veritabanı zaten başlatılmış.');
      return;
    }

    const dbPath = getDatabasePath(app);
    console.log('Veritabanı başlatılıyor:', dbPath);

    sqlite = new Database(dbPath);
    sqlite.pragma('journal_mode = WAL'); // Performans için

    db = drizzle(sqlite, { schema });

    // Migration dosyalarını uygula
    const migrationsFolder = getMigrationsPath(app);
    console.log('Migration dosyaları uygulanıyor:', migrationsFolder);

    // Migration klasörünün varlığını kontrol et
    if (!fs.existsSync(migrationsFolder)) {
      console.error('Migration klasörü bulunamadı:', migrationsFolder);
      throw new Error(`Migration klasörü bulunamadı: ${migrationsFolder}`);
    }

    // Migration dosyalarını listele (debug için)
    const migrationFiles = fs.readdirSync(migrationsFolder);
    console.log('Bulunan migration dosyaları:', migrationFiles);

    migrate(db, { migrationsFolder });
    console.log('✓ Veritabanı başarıyla başlatıldı.');
  } catch (error) {
    console.error('Veritabanı başlatma hatası:', error);
    throw error;
  }
}
