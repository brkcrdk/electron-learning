/**
 * Utility Process Service Worker
 * Bu dosya utility process olarak çalışır
 */

import { existsSync, mkdirSync, writeFileSync, appendFileSync } from 'fs';
import { join } from 'path';

// Utility process'te process.parentPort kullanılır
if (!process.parentPort) {
  throw new Error('Bu dosya utility process olarak çalıştırılmalıdır');
}

console.log('[Service Worker] Başlatıldı');

let userDataPath: string | null = null;
let logFilePath: string | null = null;

/**
 * Log dosyasına timestamp yazar
 */
function writeLog(message: string) {
  if (!logFilePath) {
    console.log('[Service Worker] Log dosyası henüz hazır değil');
    return;
  }

  try {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n`;
    appendFileSync(logFilePath, logEntry, 'utf-8');
    console.log('[Service Worker] Log yazıldı:', message);
  } catch (error) {
    console.error('[Service Worker] Log yazma hatası:', error);
  }
}

/**
 * Log dosyasını başlatır
 */
function initializeLogFile(path: string) {
  try {
    userDataPath = path;
    const logsDir = join(userDataPath, 'logs');

    // logs klasörünü oluştur (yoksa)
    if (!existsSync(logsDir)) {
      mkdirSync(logsDir, { recursive: true });
      console.log('[Service Worker] Logs klasörü oluşturuldu:', logsDir);
    }

    logFilePath = join(logsDir, 'service-worker.log');
    writeLog('Service Worker başlatıldı');
  } catch (error) {
    console.error('[Service Worker] Log dosyası başlatma hatası:', error);
  }
}

// Main process'ten gelen mesajları dinle
process.parentPort.on('message', event => {
  console.log('[Service Worker] Mesaj alındı:', event.data);

  const data = event.data;

  // Init mesajı: userData path'ini al
  if (data && data.type === 'init' && data.userDataPath) {
    initializeLogFile(data.userDataPath);
    writeLog('Service Worker init mesajı alındı');
  }

  // Ping mesajı
  if (data && data.type === 'ping') {
    writeLog('Ping mesajı alındı');
    process.parentPort?.postMessage({
      type: 'pong',
      message: 'Service Worker çalışıyor!',
      timestamp: Date.now(),
    });
  }
});

// Her 5 saniyede bir heartbeat gönder ve log yaz
setInterval(() => {
  writeLog('Heartbeat - Service Worker aktif');
  process.parentPort?.postMessage({
    type: 'heartbeat',
    message: 'Service Worker aktif',
    timestamp: Date.now(),
  });
}, 5000);

console.log('[Service Worker] Mesaj dinleme başlatıldı');
