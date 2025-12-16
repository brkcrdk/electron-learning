import { existsSync } from 'fs';
import { resolve, relative } from 'path';
import { pathToFileURL } from 'url';

import { app, net, protocol } from 'electron';

/**
 * Custom protocol'ü privileged olarak kaydeder.
 * Bu işlem app.whenReady() ÖNCESİNDE yapılmalı!
 *
 * - standard: relative URL'lerin çalışması için gerekli
 * - secure: güvenli scheme olarak işaretler
 * - supportFetchAPI: fetch API'nin çalışması için gerekli
 * - stream: video/audio stream'lerinin düzgün çalışması için gerekli
 */
export function registerContentProtocolPrivileges() {
  protocol.registerSchemesAsPrivileged([
    {
      scheme: 'content',
      privileges: {
        standard: true,
        secure: true,
        supportFetchAPI: true,
        stream: true,
      },
    },
  ]);
}

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
 */
function registerContentProtocol() {
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

      const fileExists = existsSync(resolvedFilePath);

      if (relativeToUserData.startsWith('..')) {
        return new Response('Access denied', { status: 403 });
      }

      // Dosyanın varlığını kontrol et
      if (!fileExists) {
        return new Response('File not found', { status: 404 });
      }

      const filePath = resolvedFilePath;

      // Dosyayı net.fetch ile file:// URL'si üzerinden serve et
      const fileUrl = pathToFileURL(filePath).toString();
      return net.fetch(fileUrl);
    } catch (error) {
      console.error('Protocol handler error:', error);
      return new Response('Internal server error', { status: 500 });
    }
  });
}

export default registerContentProtocol;
