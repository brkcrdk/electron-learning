import { app, BrowserWindow, Menu } from 'electron';
import started from 'electron-squirrel-startup';

import registerApiHandlers from '@api/index';
import { closeDatabase, initializeDatabase } from '@db/client';

import protocolHandler, { registerContentProtocolPrivileges } from './protocol-handler';
import registerStoreHandlers from '../store';
import createWindow from './create-window';
import { startServiceWorker } from './workers/service-worker-manager';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

// APP when ready öncesi çağırılacak fonksiyonlar
// ================================
/**
 * Custom protocol'ü privileged olarak kaydet (app.whenReady() ÖNCESİNDE!)
 */
registerContentProtocolPrivileges();

/**
 * Varsayılan menüyü devre dışı bırak (performans optimizasyonu)
 * app.whenReady() öncesinde çağrılmalı
 */
Menu.setApplicationMenu(null);

// ================================

/**
 * Electron başlatıldığında çalışır
 * Veritabanını başlatır ve ana pencereyi oluşturur
 */
app.whenReady().then(async () => {
  try {
    // Custom protocol handler'ı kaydet (userData içindeki dosyaları serve etmek için)
    protocolHandler();

    // Veritabanını başlat
    initializeDatabase(app);
    // Window'u oluştur
    createWindow();
  } catch (error) {
    // Migration hatası olsa bile window'u aç - kullanıcı hata mesajını görebilsin
    console.error('Veritabanı başlatma hatası:', error);
    createWindow();
  }
});

app.on('ready', () => {
  registerApiHandlers();

  // // IPC handler'larını kaydet
  registerStoreHandlers();

  // Utility Process Service Worker'ı başlat
  startServiceWorker();
});

/**
 * Tüm pencereler kapatıldığında uygulamayı kapat
 * macOS'ta menü çubuğu aktif kalır, Cmd + Q ile kapatılır
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/**
 * macOS'ta dock ikonuna tıklandığında pencereyi yeniden oluştur
 */
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

/**
 * Uygulama kapanırken veritabanı bağlantısını kapat
 */
app.on('will-quit', () => {
  closeDatabase();
});
