import { existsSync } from 'fs';
import { resolve, relative } from 'path';
import { pathToFileURL } from 'url';

import { app, net, protocol } from 'electron';

/**
 * Custom protocol handler'ı kaydeder
 *
 * Bu handler, renderer process'te kullanılmak üzere userData içindeki dosyaları
 * serve etmek için "content://" custom protocol'ünü oluşturur.
 *
 * Örnek kullanım:
 * - Relative path (veritabanından): "content/videos/file.mp4"
 * - Custom protocol URL: "content://content/videos/file.mp4"
 * - Handler bu URL'yi userData + relativePath'e çevirir ve dosyayı serve eder
 *
 * Güvenlik:
 * - Yalnızca userData dizini altındaki dosyalara erişim sağlar
 * - Dosya yoksa 404 döner
 * - Path traversal saldırılarına karşı korumalıdır (relative() kullanarak "../" kontrolü yapılır)
 */
function registerContentProtocol() {
  protocol.handle('content', request => {
    try {
      // URL'den relative path'i al
      // content://content/videos/file.mp4 -> content/videos/file.mp4
      const url = new URL(request.url);
      const relativePath = url.pathname;

      // userData path'ini al ve normalize et
      const userDataPath = resolve(app.getPath('userData'));

      // Full path oluştur ve normalize et
      // relativePath: "content/videos/file.mp4"
      // resolvedFilePath: "/Users/.../AppData/Roaming/app/content/videos/file.mp4"
      const resolvedFilePath = resolve(userDataPath, relativePath);

      // Güvenlik kontrolü: Dosyanın userData altında olup olmadığını kontrol et
      // relative() kullanarak path traversal saldırılarını engelle
      // Eğer dosya userData dışındaysa, relative path ".." ile başlar
      const relativeToUserData = relative(userDataPath, resolvedFilePath);
      if (relativeToUserData.startsWith('..')) {
        return new Response('Access denied', { status: 403 });
      }

      const filePath = resolvedFilePath;

      // Dosyanın varlığını kontrol et
      if (!existsSync(filePath)) {
        return new Response('File not found', { status: 404 });
      }

      // Dosyayı serve et (net.fetch ile file:// URL'sini kullan)
      const fileUrl = pathToFileURL(filePath).toString();
      return net.fetch(fileUrl);
    } catch (error) {
      console.error('Protocol handler error:', error);
      return new Response('Internal server error', { status: 500 });
    }
  });
}

export default registerContentProtocol;
