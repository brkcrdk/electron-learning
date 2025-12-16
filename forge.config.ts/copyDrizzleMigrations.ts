import { cwd } from 'node:process';
import path from 'path';

import fs from 'fs-extra';

/**
 * Drizzle migration dosyalarını resources klasörüne kopyalar
 * Migration dosyaları kopyalama sırasında hata oluşursa Error fırlatır
 *
 * Not: make komutu zaten "yarn db:generate && electron-forge make" şeklinde çalışıyor,
 * bu yüzden migration dosyaları build öncesi zaten generate edilmiş olmalı.
 * Eğer migration dosyaları eksikse, make komutundaki db:generate adımını kontrol edin.
 *
 * @see https://github.com/drizzle-team/drizzle-orm/discussions/1891
 */
async function copyDrizzleMigrations(buildPath: string) {
  try {
    const drizzleSourcePath = path.join(cwd(), 'drizzle');
    // buildPath: .../Electron.app/Contents/Resources/app
    // asar DIŞINDAKİ gerçek resources klasörüne kopyala (process.resourcesPath ile aynı seviye)
    const resourcesPath = path.dirname(buildPath); // .../Electron.app/Contents/Resources
    const drizzleDestPath = path.join(resourcesPath, 'drizzle');

    // Drizzle klasörü kontrolü
    const drizzleExists = await fs.pathExists(drizzleSourcePath);
    if (!drizzleExists) {
      console.warn(`\x1b[33m⚠\x1b[0m \x1b[33mDrizzle klasörü bulunamadı: ${drizzleSourcePath}\x1b[0m`);
      console.warn('\x1b[33m⚠\x1b[0m \x1b[33mLütfen "yarn db:generate" komutunu çalıştırdığınızdan emin olun.\x1b[0m');
      return;
    }

    const drizzleFiles = await fs.readdir(drizzleSourcePath);
    const drizzleIsEmpty = drizzleFiles.length === 0;

    if (drizzleIsEmpty) {
      console.warn(`\x1b[33m⚠\x1b[0m \x1b[33mDrizzle klasörü boş: ${drizzleSourcePath}\x1b[0m`);
      console.warn('\x1b[33m⚠\x1b[0m \x1b[33mLütfen "yarn db:generate" komutunu çalıştırdığınızdan emin olun.\x1b[0m');
      return;
    }

    console.log('\x1b[36mMigration dosyaları kopyalanıyor...\x1b[0m');
    console.log(`\x1b[90mKaynak:\x1b[0m ${drizzleSourcePath}`);
    console.log(`\x1b[90mHedef:\x1b[0m ${drizzleDestPath}`);

    // Migration dosyalarını listele
    const migrationFiles = await fs.readdir(drizzleSourcePath);
    const sqlFiles = migrationFiles.filter(f => f.endsWith('.sql'));
    const metaFolder = migrationFiles.find(f => f === 'meta');

    if (sqlFiles.length === 0) {
      console.warn('\x1b[33m⚠\x1b[0m \x1b[33mHiç migration dosyası (.sql) bulunamadı!\x1b[0m');
    } else {
      console.log(`\x1b[90mBulunan migration dosyaları:\x1b[0m ${sqlFiles.length} adet`);
      sqlFiles.forEach(file => {
        console.log(`\x1b[90m  - ${file}\x1b[0m`);
      });
    }

    if (!metaFolder) {
      console.warn('\x1b[33m⚠\x1b[0m \x1b[33mmeta klasörü bulunamadı!\x1b[0m');
    }

    // Hedef klasörü oluştur
    await fs.ensureDir(drizzleDestPath);

    // Drizzle klasörünü kopyala
    await fs.copy(drizzleSourcePath, drizzleDestPath, {
      overwrite: true,
    });

    console.log('\x1b[32m✓\x1b[0m \x1b[32mMigration dosyaları başarıyla kopyalandı!\x1b[0m');
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
