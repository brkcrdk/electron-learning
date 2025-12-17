import path from 'node:path';

import { app, BrowserWindow } from 'electron';

import { store } from '../store';

function createWindow() {
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
    trafficLightPosition: undefined,
    kiosk: app.isPackaged,
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

  // Uygulama kioks moodunda olacağı için window butonlarını gizle
  mainWindow.setWindowButtonVisibility(false);

  // Open DevTools only in development
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  // Kaydedilmiş temayı uygula
  mainWindow.setBackgroundColor(store.get('theme.backgroundColor'));
}

export default createWindow;
