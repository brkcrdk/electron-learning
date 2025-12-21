import { join } from 'path';

import { eq, lt, sql } from 'drizzle-orm';
import { utilityProcess } from 'electron';
import { existsSync, removeSync } from 'fs-extra';

import { getFullPathFromRelative } from '../../api/upload-file-api/upload-file/get-file-path';
import { getDb } from '../../db/client';
import { educations, educationMaterials, mediaFiles } from '../../db/schema';
import { store } from '../../store';

// Utility Process Service Worker Manager
let serviceWorker: ReturnType<typeof utilityProcess.fork> | null = null;

const BATCH_SIZE = 10; // Her batch'te 10 dosya sil
const ONE_HOUR_IN_MS = 60 * 60 * 1000; // 1 saat

/**
 * Cleanup işleminin gerekli olup olmadığını kontrol eder
 * Son cleanup'tan bu yana 24 saat geçtiyse true döner
 */
function shouldRunCleanup(): boolean {
  const lastCleanup = store.get('lastCleanup');
  if (!lastCleanup) {
    return true; // İlk çalıştırma
  }

  const now = Date.now();
  const oneDayInMs = 24 * 60 * 60 * 1000; // 24 saat
  return now - lastCleanup >= oneDayInMs;
}

/**
 * Kullanılan media file ID'lerini döndürür
 */
function getUsedMediaFileIds(): Set<number> {
  const db = getDb();
  const usedIds = new Set<number>();

  // educations.coverImageId'lerden kullanılanları al
  const coverImages = db
    .select({ id: educations.coverImageId })
    .from(educations)
    .where(sql`${educations.coverImageId} IS NOT NULL`)
    .all();

  coverImages.forEach(row => {
    if (row.id) {
      usedIds.add(row.id);
    }
  });

  // educationMaterials.contentFileId'lerden kullanılanları al
  const contentFiles = db.select({ id: educationMaterials.contentFileId }).from(educationMaterials).all();

  contentFiles.forEach(row => {
    usedIds.add(row.id);
  });

  console.log(`[Main Process] Kullanılan media file sayısı: ${usedIds.size}`);
  return usedIds;
}

/**
 * Kullanılmayan media files'ı döndürür
 * Son 1 saat içinde eklenenleri hariç tutar
 */
function getUnusedMediaFiles() {
  const db = getDb();
  const usedIds = getUsedMediaFileIds();
  const oneHourAgo = Math.floor((Date.now() - ONE_HOUR_IN_MS) / 1000); // Unix timestamp (seconds)

  // Son 1 saat içinde eklenenleri hariç tut
  const allMediaFiles = db
    .select()
    .from(mediaFiles)
    .where(lt(mediaFiles.createdAt, new Date(oneHourAgo * 1000)))
    .all();

  const unusedFiles = allMediaFiles.filter(file => !usedIds.has(file.id));
  console.log(`[Main Process] Kullanılmayan media file sayısı: ${unusedFiles.length}`);
  return unusedFiles;
}

/**
 * Dosyayı fiziksel olarak siler
 */
function deletePhysicalFile(relativePath: string): boolean {
  try {
    const fullPath = getFullPathFromRelative(relativePath);
    if (existsSync(fullPath)) {
      removeSync(fullPath);
      return true;
    }
    return true; // Dosya zaten yoksa başarılı sayılır
  } catch (error) {
    console.error(`[Main Process] Fiziksel dosya silme hatası (${relativePath}):`, error);
    return false;
  }
}

/**
 * Cleanup işlemini gerçekleştirir (main process'te)
 */
async function performCleanup() {
  try {
    console.log('[Main Process] Cleanup işlemi başlatılıyor...');

    const db = getDb();
    const unusedFiles = getUnusedMediaFiles();

    if (unusedFiles.length === 0) {
      console.log('[Main Process] Temizlenecek dosya yok');
      return { deleted: 0, failed: 0 };
    }

    let deleted = 0;
    let failed = 0;

    // Batch halinde sil
    for (let i = 0; i < unusedFiles.length; i += BATCH_SIZE) {
      const batch = unusedFiles.slice(i, i + BATCH_SIZE);
      console.log(`[Main Process] Batch ${Math.floor(i / BATCH_SIZE) + 1} işleniyor (${batch.length} dosya)...`);

      for (const file of batch) {
        try {
          // Önce fiziksel dosyayı sil
          const physicalDeleted = deletePhysicalFile(file.filePath);

          // Fiziksel dosya silindiyse veya zaten yoksa, veritabanı kaydını sil
          if (physicalDeleted) {
            db.delete(mediaFiles).where(eq(mediaFiles.id, file.id)).run();
            deleted++;
          } else {
            failed++;
          }
        } catch (error) {
          failed++;
          console.error(`[Main Process] Dosya silme hatası (ID: ${file.id}):`, error);
          // Hata olsa bile devam et
        }
      }
    }

    console.log(`[Main Process] Cleanup tamamlandı. Silinen: ${deleted}, Hatalı: ${failed}`);
    return { deleted, failed };
  } catch (error) {
    console.error('[Main Process] Cleanup hatası:', error);
    throw error;
  }
}

export function startServiceWorker() {
  // Cleanup kontrolü yap
  if (!shouldRunCleanup()) {
    console.log('[Main Process] Cleanup gerekmiyor, service worker başlatılmıyor');
    return;
  }

  try {
    // Service worker dosyasının yolunu belirle
    // Build çıktısı workers/ klasörüne yazılıyor
    const workerPath = join(__dirname, 'workers', 'service-worker.js');

    console.log('[Main Process] Service Worker başlatılıyor:', workerPath);

    // Utility process'i başlat
    serviceWorker = utilityProcess.fork(workerPath, [], {
      serviceName: 'Service Worker',
    });

    // Worker başarıyla başlatıldığında
    serviceWorker.on('spawn', () => {
      console.log('[Main Process] Service Worker başlatıldı, PID:', serviceWorker?.pid);

      // Service worker'a init mesajı gönder
      if (serviceWorker) {
        serviceWorker.postMessage({
          type: 'init',
        });
      }
    });

    // Worker'dan gelen mesajları dinle
    serviceWorker.on('message', async message => {
      console.log("[Main Process] Service Worker'dan mesaj alındı:", message);

      // Cleanup başlat mesajı geldiğinde cleanup işlemini başlat
      if (message.type === 'cleanup-start') {
        try {
          const result = await performCleanup();
          // Cleanup tamamlandığında timestamp'i güncelle
          store.set('lastCleanup', Date.now());
          console.log('[Main Process] Cleanup tamamlandı, timestamp güncellendi. Sonuç:', result);
        } catch (error) {
          console.error('[Main Process] Cleanup işlemi hatası:', error);
        }
      }
    });

    // Worker hata verdiğinde
    serviceWorker.on('error', error => {
      console.error('[Main Process] Service Worker hatası:', error);
    });

    // Worker kapandığında
    serviceWorker.on('exit', code => {
      console.log('[Main Process] Service Worker kapandı, exit code:', code);
      serviceWorker = null;
    });
  } catch (error) {
    console.error('[Main Process] Service Worker başlatma hatası:', error);
  }
}

export function stopServiceWorker() {
  if (serviceWorker) {
    serviceWorker.kill();
    serviceWorker = null;
  }
}
