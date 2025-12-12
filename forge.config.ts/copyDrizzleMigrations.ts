import { cwd } from 'node:process';
import path from 'path';

import fs from 'fs-extra';

/**
 * Drizzle migration dosyalarını resources klasörüne kopyalar
 * Migration dosyaları kopyalama sırasında hata oluşursa Error fırlatır
 *
 * @see https://github.com/drizzle-team/drizzle-orm/discussions/1891
 */
async function copyDrizzleMigrations(buildPath: string) {
  try {
    const drizzleSourcePath = path.join(cwd(), 'drizzle');
    // resources klasörüne kopyala (process.resourcesPath ile erişilebilir)
    const drizzleDestPath = path.join(buildPath, 'resources', 'drizzle');

    if (await fs.pathExists(drizzleSourcePath)) {
      console.log('\x1b[36mMigration dosyaları kopyalanıyor...\x1b[0m');
      console.log(`\x1b[90mKaynak:\x1b[0m ${drizzleSourcePath}`);
      console.log(`\x1b[90mHedef:\x1b[0m ${drizzleDestPath}`);

      // Hedef klasörü oluştur
      await fs.ensureDir(drizzleDestPath);

      // Drizzle klasörünü kopyala
      await fs.copy(drizzleSourcePath, drizzleDestPath, {
        overwrite: true,
      });

      console.log('\x1b[32m✓\x1b[0m \x1b[32mMigration dosyaları başarıyla kopyalandı!\x1b[0m');
    } else {
      console.warn(`\x1b[33m⚠\x1b[0m \x1b[33mDrizzle klasörü bulunamadı: ${drizzleSourcePath}\x1b[0m`);
    }
  } catch (error) {
    // Kırmızı renk - hata mesajı
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`\x1b[31m✗\x1b[0m \x1b[31mDrizzle migration dosyaları kopyalanırken hata oluştu:\x1b[0m ${errorMessage}`);
    throw new Error(`Drizzle migration kopyalama hatası: ${errorMessage}`, {
      cause: error,
    });
  }
}
export default copyDrizzleMigrations;
