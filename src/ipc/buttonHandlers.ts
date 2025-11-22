import { ipcMain, IpcMainEvent } from 'electron';

/**
 * Button ile ilgili IPC handler'ları
 */
export const registerButtonHandlers = () => {
  // Button click handler
  ipcMain.on('button-clicked', (event: IpcMainEvent, message: string) => {
    console.log("Renderer'dan mesaj alındı:", message);
    console.log("Main process'te işlem yapılıyor...");
    console.log('xx2');

    // Burada istediğiniz işlemleri yapabilirsiniz
    // Örneğin: dosya okuma, veritabanı işlemleri, sistem bilgisi alma vb.
  });
};
