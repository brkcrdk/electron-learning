/**
 * Utility Process Service Worker
 * Bu dosya utility process olarak çalışır
 * Kullanılmayan medya dosyalarını temizler
 */

import { existsSync } from 'fs';
import { join } from 'path';

import Database from 'better-sqlite3';
import { eq, lt, sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { removeSync } from 'fs-extra';

import * as schema from '../../db/schema';

// Utility process'te process.parentPort kullanılır
if (!process.parentPort) {
  throw new Error('Bu dosya utility process olarak çalıştırılmalıdır');
}

console.log('[Service Worker] Başlatıldı');

let userDataPath: string | null = null;
let dbPath: string | null = null;
let db: BetterSQLite3Database<typeof schema> | null = null;
let sqlite: InstanceType<typeof Database> | null = null;

const BATCH_SIZE = 10; // Her batch'te 10 dosya sil
const ONE_HOUR_IN_MS = 60 * 60 * 1000; // 1 saat

/**
 * Veritabanı bağlantısını açar
 */
function initializeDatabase(path: string) {
  try {
    dbPath = path;
    console.log('[Service Worker] Veritabanı bağlantısı açılıyor:', dbPath);

    sqlite = new Database(dbPath);
    sqlite.pragma('journal_mode = WAL');
    sqlite.pragma('foreign_keys = ON');

    db = drizzle(sqlite, { schema });
    console.log('[Service Worker] Veritabanı bağlantısı başarılı');
  } catch (error) {
    console.error('[Service Worker] Veritabanı bağlantı hatası:', error);
    throw error;
  }
}

/**
 * Kullanılan media file ID'lerini döndürür
 */
function getUsedMediaFileIds(): Set<number> {
  if (!db) {
    throw new Error('Veritabanı bağlantısı yok');
  }

  const usedIds = new Set<number>();

  // educations.coverImageId'lerden kullanılanları al
  const coverImages = db
    .select({ id: schema.educations.coverImageId })
    .from(schema.educations)
    .where(sql`${schema.educations.coverImageId} IS NOT NULL`)
    .all();

  coverImages.forEach(row => {
    if (row.id) {
      usedIds.add(row.id);
    }
  });

  // educationMaterials.contentFileId'lerden kullanılanları al
  const contentFiles = db.select({ id: schema.educationMaterials.contentFileId }).from(schema.educationMaterials).all();

  contentFiles.forEach(row => {
    usedIds.add(row.id);
  });

  console.log(`[Service Worker] Kullanılan media file sayısı: ${usedIds.size}`);
  return usedIds;
}

/**
 * Kullanılmayan media files'ı döndürür
 * Son 1 saat içinde eklenenleri hariç tutar
 */
function getUnusedMediaFiles() {
  if (!db) {
    throw new Error('Veritabanı bağlantısı yok');
  }

  const usedIds = getUsedMediaFileIds();
  const oneHourAgo = Math.floor((Date.now() - ONE_HOUR_IN_MS) / 1000); // Unix timestamp (seconds)

  // Son 1 saat içinde eklenenleri hariç tut
  const allMediaFiles = db
    .select()
    .from(schema.mediaFiles)
    .where(lt(schema.mediaFiles.createdAt, new Date(oneHourAgo * 1000)))
    .all();

  const unusedFiles = allMediaFiles.filter(file => !usedIds.has(file.id));
  console.log(`[Service Worker] Kullanılmayan media file sayısı: ${unusedFiles.length}`);
  return unusedFiles;
}

/**
 * Dosyayı fiziksel olarak siler
 */
function deletePhysicalFile(relativePath: string): boolean {
  if (!userDataPath) {
    console.error('[Service Worker] userDataPath tanımlı değil, dosya silinemiyor');
    return false;
  }

  try {
    const fullPath = join(userDataPath, relativePath);
    if (existsSync(fullPath)) {
      removeSync(fullPath);
      return true;
    }
    return true; // Dosya zaten yoksa başarılı sayılır
  } catch (error) {
    console.error(`[Service Worker] Fiziksel dosya silme hatası (${relativePath}):`, error);
    return false;
  }
}

/**
 * Cleanup işlemini gerçekleştirir
 */
async function performCleanup() {
  try {
    console.log('[Service Worker] Cleanup işlemi başlatılıyor...');

    if (!db) {
      throw new Error('Veritabanı bağlantısı yok');
    }

    const unusedFiles = getUnusedMediaFiles();

    if (unusedFiles.length === 0) {
      console.log('[Service Worker] Temizlenecek dosya yok');
      return { deleted: 0, failed: 0 };
    }

    let deleted = 0;
    let failed = 0;

    // Batch halinde sil
    for (let i = 0; i < unusedFiles.length; i += BATCH_SIZE) {
      const batch = unusedFiles.slice(i, i + BATCH_SIZE);
      console.log(`[Service Worker] Batch ${Math.floor(i / BATCH_SIZE) + 1} işleniyor (${batch.length} dosya)...`);

      for (const file of batch) {
        try {
          // Önce fiziksel dosyayı sil
          const physicalDeleted = deletePhysicalFile(file.filePath);

          // Fiziksel dosya silindiyse veya zaten yoksa, veritabanı kaydını sil
          if (physicalDeleted) {
            db.delete(schema.mediaFiles).where(eq(schema.mediaFiles.id, file.id)).run();
            deleted++;
          } else {
            failed++;
          }
        } catch (error) {
          failed++;
          console.error(`[Service Worker] Dosya silme hatası (ID: ${file.id}):`, error);
          // Hata olsa bile devam et
        }
      }
    }

    console.log(`[Service Worker] Cleanup tamamlandı. Silinen: ${deleted}, Hatalı: ${failed}`);
    return { deleted, failed };
  } catch (error) {
    console.error('[Service Worker] Cleanup hatası:', error);
    throw error;
  }
}

/**
 * Cleanup işlemini başlatır ve tamamlandığında kapanır
 */
async function startCleanup() {
  try {
    if (!db || !userDataPath) {
      console.error('[Service Worker] Veritabanı veya userDataPath hazır değil');
      return;
    }

    const result = await performCleanup();

    // Main process'e cleanup tamamlandı mesajı gönder
    process.parentPort?.postMessage({
      type: 'cleanup-completed',
      result,
    });

    console.log('[Service Worker] Service Worker kapatılıyor...');

    // Veritabanı bağlantısını kapat
    if (sqlite) {
      sqlite.close();
      sqlite = null;
      db = null;
    }

    // Service worker'ı kapat
    setTimeout(() => {
      process.exit(0);
    }, 1000);
  } catch (error) {
    console.error('[Service Worker] Cleanup başlatma hatası:', error);
    process.parentPort?.postMessage({
      type: 'cleanup-error',
      error: String(error),
    });
    process.exit(1);
  }
}

// Main process'ten gelen mesajları dinle
process.parentPort.on('message', event => {
  const data = event.data;

  // Init mesajı: userData ve DB path'lerini al
  if (data && data.type === 'init') {
    if (data.userDataPath) {
      userDataPath = data.userDataPath;
    }

    if (data.dbPath) {
      try {
        initializeDatabase(data.dbPath);
        // Cleanup işlemini başlat
        startCleanup();
      } catch (error) {
        console.error('[Service Worker] Init hatası:', error);
        process.exit(1);
      }
    }
  }
});

console.log('[Service Worker] Mesaj dinleme başlatıldı');
