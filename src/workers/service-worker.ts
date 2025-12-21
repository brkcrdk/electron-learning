/**
 * Utility Process Service Worker
 * Bu dosya utility process olarak çalışır
 */

// Utility process'te process.parentPort kullanılır
if (!process.parentPort) {
  throw new Error('Bu dosya utility process olarak çalıştırılmalıdır');
}

console.log('[Service Worker] Başlatıldı');

// Main process'ten gelen mesajları dinle
process.parentPort.on('message', event => {
  console.log('[Service Worker] Mesaj alındı:', event.data);

  // Mesajı işle ve yanıt gönder
  if (event.data && event.data.type === 'ping') {
    process.parentPort?.postMessage({
      type: 'pong',
      message: 'Service Worker çalışıyor!',
      timestamp: Date.now(),
    });
  }
});

// Her 5 saniyede bir heartbeat gönder
setInterval(() => {
  process.parentPort?.postMessage({
    type: 'heartbeat',
    message: 'Service Worker aktif',
    timestamp: Date.now(),
  });
}, 5000);

console.log('[Service Worker] Mesaj dinleme başlatıldı');
