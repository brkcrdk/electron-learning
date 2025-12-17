import { existsSync, statSync, createReadStream } from 'fs';
import { resolve, relative } from 'path';

import { app, protocol } from 'electron';

import getContentType from './get-content-type';
import registerContentProtocolPrivileges from './register-privileges';
import nodeStreamToWebStream from './stream-converter';

/**
 * Custom protocol handler'ı kaydeder.
 *
 * Bu handler, renderer process'te kullanılmak üzere userData içindeki dosyaları
 * "content://" scheme'i ile serve eder.
 *
 * Örnek:
 * - Veritabanındaki relative path: "content/videos/file.mp4"
 * - Renderer'da kullanılacak URL: "content://content/videos/file.mp4"
 *
 * Güvenlik:
 * - Yalnızca userData dizini altındaki dosyalara erişim sağlar
 * - Path traversal saldırılarına karşı relative() ile kontrol yapılır
 *
 * Video Seek Desteği:
 * - HTTP Range Request (206 Partial Content) desteği eklendi
 * - Video player'ların seek işlemlerini düzgün çalıştırması için gerekli
 */
function protocolHandler() {
  protocol.handle('content', request => {
    try {
      // URL'den relative path'i al
      // content://content/videos/file.mp4 -> content/videos/file.mp4
      // URL parse edildiğinde:
      // - url.hostname = "content" (authority kısmı)
      // - url.pathname = "/videos/file.mp4" (path kısmı)
      // Bu yüzden hostname + pathname'i birleştirmemiz gerekiyor
      const url = new URL(request.url);
      let relativePath = '';

      // Eğer hostname varsa (content://content/... formatında), hostname'i path'e ekle
      if (url.hostname) {
        relativePath = url.hostname + url.pathname;
      } else {
        // Eğer hostname yoksa (content:///videos/... formatında), sadece pathname kullan
        relativePath = url.pathname;
      }

      // Başındaki "/" varsa kaldır
      if (relativePath.startsWith('/')) {
        relativePath = relativePath.slice(1);
      }

      relativePath = decodeURIComponent(relativePath);

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

      // Dosyanın varlığını kontrol et
      if (!existsSync(resolvedFilePath)) {
        return new Response('File not found', { status: 404 });
      }

      // Dosya istatistiklerini al
      const stats = statSync(resolvedFilePath);
      const fileSize = stats.size;
      const contentType = getContentType(resolvedFilePath);

      // Range header'ını kontrol et (video seek için gerekli)
      const rangeHeader = request.headers.get('range');

      if (rangeHeader) {
        // Range request'i parse et
        // Format: "bytes=start-end" veya "bytes=start-"
        const parts = rangeHeader.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunkSize = end - start + 1;

        // Range validation
        if (start >= fileSize || end >= fileSize || start > end || start < 0) {
          return new Response('Range Not Satisfiable', {
            status: 416,
            headers: {
              'Content-Range': `bytes */${fileSize}`,
            },
          });
        }

        // Dosyanın belirli bir bölümünü oku
        const stream = createReadStream(resolvedFilePath, { start, end });
        const webStream = nodeStreamToWebStream(stream);

        return new Response(webStream, {
          status: 206, // Partial Content
          headers: {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize.toString(),
            'Content-Type': contentType,
          },
        });
      } else {
        // Range header yoksa, tüm dosyayı gönder
        const stream = createReadStream(resolvedFilePath);
        const webStream = nodeStreamToWebStream(stream);

        return new Response(webStream, {
          status: 200,
          headers: {
            'Accept-Ranges': 'bytes',
            'Content-Length': fileSize.toString(),
            'Content-Type': contentType,
          },
        });
      }
    } catch (error) {
      console.error('Protocol handler error:', error);
      return new Response('Internal server error', { status: 500 });
    }
  });
}

export default protocolHandler;
export { registerContentProtocolPrivileges };
