import fs from 'node:fs/promises';
import path from 'node:path';

import { app, BrowserWindow } from 'electron';
import started from 'electron-squirrel-startup';

import registerApiHandlers from '../api';
import { initializeDatabase } from '../db/client';
import registerStoreHandlers from '../store';
import { store } from '../store';

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

  // Open the DevTools.
  mainWindow.webContents.openDevTools({ mode: 'detach' });

  // Kaydedilmiş temayı uygula
  mainWindow.setBackgroundColor(store.get('theme.backgroundColor'));
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  /**
   * Uygulama production ortamında ise veritabanını başlat
   */
  if (import.meta.env.PROD) {
    await initializeDatabase();
  }

  // İçerik klasörlerini oluştur
  const contentRoot = path.join(app.getPath('userData'), 'content');
  console.log('contentRoot', contentRoot);
  await fs.mkdir(path.join(contentRoot, 'videos'), { recursive: true });
  await fs.mkdir(path.join(contentRoot, 'pdfs'), { recursive: true });
  await fs.mkdir(path.join(contentRoot, 'stories'), { recursive: true });

  // IPC handler'larını kaydet
  registerApiHandlers();
  registerStoreHandlers();

  // Window'u oluştur
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
// IPC handler'lar artık src/ipc/ klasöründe organize edilmiştir.
