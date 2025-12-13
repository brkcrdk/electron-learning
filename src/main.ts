import path from 'node:path';

import { app, BrowserWindow, ipcMain } from 'electron';
import started from 'electron-squirrel-startup';

import { users, type User } from '@db/schema';

import { closeDatabase, getDb, initializeDatabase } from '../db/client';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: 'Electron Learning',
    center: true,
    show: true, // Window'u hemen göster
    titleBarStyle: 'hidden',
    trafficLightPosition: {
      x: 18,
      y: 18,
    },
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open DevTools only in development
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  // Kaydedilmiş temayı uygula
};

/**
 * IPC handler: Kullanıcı listesini döndürür
 */
ipcMain.handle('get-current-user', async (): Promise<User[]> => {
  try {
    const db = getDb();
    const userList = await db.select().from(users);

    // Log only in development
    if (!app.isPackaged) {
      console.log('Kullanıcı listesi:', userList);
    }

    return userList;
  } catch (error) {
    console.error('get-current-user hatası:', error);
    throw error;
  }
});

/**
 * Electron başlatıldığında çalışır
 * Veritabanını başlatır ve ana pencereyi oluşturur
 */
app.whenReady().then(() => {
  try {
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
