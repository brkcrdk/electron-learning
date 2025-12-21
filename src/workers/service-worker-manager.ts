import { join } from 'path';

import { utilityProcess } from 'electron';

// Utility Process Service Worker Manager
let serviceWorker: ReturnType<typeof utilityProcess.fork> | null = null;

export function startServiceWorker() {
  try {
    // Service worker dosyasının yolunu belirle
    // Build çıktısı workers/ klasörüne yazılıyor
    const workerPath = join(__dirname, 'service-worker.js');

    console.log('[Main Process] Service Worker başlatılıyor:', workerPath);

    // Utility process'i başlat
    serviceWorker = utilityProcess.fork(workerPath, [], {
      serviceName: 'Service Worker',
    });

    // Worker başarıyla başlatıldığında
    serviceWorker.on('spawn', () => {
      console.log('[Main Process] Service Worker başlatıldı, PID:', serviceWorker?.pid);

      // Test mesajı gönder
      setTimeout(() => {
        if (serviceWorker) {
          console.log('[Main Process] Test mesajı gönderiliyor...');
          serviceWorker.postMessage({ type: 'ping' });
        }
      }, 1000);
    });

    // Worker'dan gelen mesajları dinle
    serviceWorker.on('message', message => {
      console.log("[Main Process] Service Worker'dan mesaj alındı:", message);
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
