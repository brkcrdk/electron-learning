import { join } from 'path';

import { app, utilityProcess } from 'electron';

import { store } from '../../store';

// Utility Process Service Worker Manager
let serviceWorker: ReturnType<typeof utilityProcess.fork> | null = null;

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

      // userData ve DB path'lerini service worker'a gönder
      const userDataPath = app.getPath('userData');
      // Development'da __dirname = .vite/build, development.db proje kökünde
      const dbPath = app.isPackaged ? join(userDataPath, 'app.db') : join(process.cwd(), 'development.db');

      if (serviceWorker) {
        serviceWorker.postMessage({
          type: 'init',
          userDataPath,
          dbPath,
        });
      }
    });

    // Worker'dan gelen mesajları dinle
    serviceWorker.on('message', message => {
      console.log("[Main Process] Service Worker'dan mesaj alındı:", message);

      // Cleanup tamamlandığında timestamp'i güncelle
      if (message.type === 'cleanup-completed') {
        store.set('lastCleanup', Date.now());
        console.log('[Main Process] Cleanup tamamlandı, timestamp güncellendi');
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
