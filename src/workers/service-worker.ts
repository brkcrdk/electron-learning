/**
 * Utility Process Service Worker
 * Bu dosya utility process olarak çalışır
 * Sadece zamanlama kontrolü yapar ve main process'e cleanup mesajı gönderir
 */

// Utility process'te process.parentPort kullanılır
if (!process.parentPort) {
  throw new Error('Bu dosya utility process olarak çalıştırılmalıdır');
}

console.log('[Service Worker] Başlatıldı');

// Main process'ten gelen mesajları dinle
process.parentPort.on('message', event => {
  const data = event.data;

  // Init mesajı: Main process'e cleanup başlat mesajı gönder
  if (data && data.type === 'init') {
    console.log('[Service Worker] Cleanup başlatma mesajı gönderiliyor...');

    // Main process'e cleanup başlat mesajı gönder
    process.parentPort?.postMessage({
      type: 'cleanup-start',
    });

    // Mesaj gönderildikten sonra service worker'ı kapat
    setTimeout(() => {
      console.log('[Service Worker] Kapatılıyor...');
      process.exit(0);
    }, 100);
  }
});

console.log('[Service Worker] Mesaj dinleme başlatıldı');
