import { cwd } from 'node:process';
import path from 'path';

import fs from 'fs-extra';

/**
 * Native modüllerin listesi
 * Bu liste hem kopyalama işlemi hem de asar unpack için kullanılır
 */
export const NATIVE_MODULES = ['better-sqlite3', 'bindings', 'file-uri-to-path'] as const;

/**
 * Native modülleri build path'e kopyalar
 */
async function copyNativeModules(buildPath: string): Promise<void> {
  const modulesToCopy = NATIVE_MODULES;
  const projectRoot = cwd();

  for (const moduleName of modulesToCopy) {
    const sourcePath = path.join(projectRoot, 'node_modules', moduleName);
    const destPath = path.join(buildPath, 'node_modules', moduleName);

    if (await fs.pathExists(sourcePath)) {
      // Cyan renk - bilgi mesajı
      console.log(`\x1b[36m${moduleName} kopyalanıyor...\x1b[0m`);
      // Gri renk - detay bilgileri
      console.log(`\x1b[90mKaynak:\x1b[0m ${sourcePath}`);
      console.log(`\x1b[90mHedef:\x1b[0m ${destPath}`);

      // Hedef klasörü oluştur
      await fs.ensureDir(path.dirname(destPath));

      // Modülü kopyala
      await fs.copy(sourcePath, destPath, {
        overwrite: true,
      });

      // Yeşil renk - başarı mesajı
      console.log(`\x1b[32m✓\x1b[0m \x1b[32m${moduleName} başarıyla kopyalandı!\x1b[0m`);
    } else {
      // Sarı renk - uyarı mesajı
      console.warn(`\x1b[33m⚠\x1b[0m \x1b[33m${moduleName} node_modules içinde bulunamadı!\x1b[0m`);
    }
  }
}

export default copyNativeModules;
