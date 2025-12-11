import path from 'path';

import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { app } from 'electron';

import * as schema from './schema';

export const getDatabasePath = (): string => {
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

/**
 * Veritabanında tabloların varlığını kontrol eder
 */
const checkTablesExist = async (): Promise<boolean> => {
  try {
    // SQLite'da sqlite_master tablosundan tablo isimlerini al
    const result = await client.execute({
      sql: "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'",
      args: [],
    });

    const tableNames = result.rows.map(row => row.name as string);

    // Schema'da tanımlı tabloları kontrol et
    const requiredTables = ['users', 'category'];
    const allTablesExist = requiredTables.every(table => tableNames.includes(table));

    return allTablesExist;
  } catch (error) {
    console.error('Tablo kontrolü sırasında hata:', error);
    return false;
  }
};

/**
 * Tabloları oluşturur
 */
const createTables = async (): Promise<void> => {
  // Users tablosu
  await client.execute({
    sql: `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user' CHECK(role IN ('super-admin', 'admin', 'user')),
        status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active', 'passive')),
        created_at INTEGER NOT NULL DEFAULT (unixepoch()),
        updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
        last_login_at INTEGER
      )
    `,
    args: [],
  });

  // Users tablosu için index
  await client.execute({
    sql: 'CREATE INDEX IF NOT EXISTS roles_idx ON users(role)',
    args: [],
  });

  // Category tablosu
  await client.execute({
    sql: `
      CREATE TABLE IF NOT EXISTS category (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        description TEXT NOT NULL,
        parent_id INTEGER,
        created_at INTEGER NOT NULL DEFAULT (unixepoch()),
        updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
        FOREIGN KEY (parent_id) REFERENCES category(id)
      )
    `,
    args: [],
  });

  // Category tablosu için index
  await client.execute({
    sql: 'CREATE INDEX IF NOT EXISTS idx_category_parent_id ON category(parent_id)',
    args: [],
  });
};

/**
 * Veritabanını başlatır - tablolar yoksa oluşturur
 */
export const initializeDatabase = async (): Promise<void> => {
  try {
    const tablesExist = await checkTablesExist();

    if (!tablesExist) {
      console.log('Tablolar bulunamadı, oluşturuluyor...');
      await createTables();
      console.log('Tablolar başarıyla oluşturuldu.');
    } else {
      console.log('Tablolar zaten mevcut.');
    }
  } catch (error) {
    console.error('Veritabanı başlatma hatası:', error);
    throw error;
  }
};
