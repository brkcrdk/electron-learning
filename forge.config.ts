import path from 'path';

import { FuseV1Options, FuseVersion } from '@electron/fuses';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { VitePlugin } from '@electron-forge/plugin-vite';
import type { ForgeConfig } from '@electron-forge/shared-types';
import fs from 'fs-extra';

const config: ForgeConfig = {
  packagerConfig: {
    asar: {
      unpack: '**/node_modules/{better-sqlite3,bindings,file-uri-to-path}/**',
    },
  },
  rebuildConfig: {
    onlyModules: ['better-sqlite3'],
  },
  hooks: {
    packageAfterCopy: async (config, buildPath) => {
      // Kopyalanacak native modüller ve bağımlılıkları
      const modulesToCopy = ['better-sqlite3', 'bindings', 'file-uri-to-path'];

      for (const moduleName of modulesToCopy) {
        const sourcePath = path.join(__dirname, 'node_modules', moduleName);
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

      // Migration dosyalarını resources klasörüne kopyala
      // GitHub discussion: https://github.com/drizzle-team/drizzle-orm/discussions/1891
      const drizzleSourcePath = path.join(__dirname, 'drizzle');
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
    },
  },
  makers: [new MakerSquirrel({}), new MakerZIP({}, ['darwin']), new MakerRpm({}), new MakerDeb({})],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new VitePlugin({
      // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
      // If you are familiar with Vite configuration, it will look really familiar.
      build: [
        {
          // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
          entry: 'src/main.ts',
          config: 'vite.main.config.ts',
          target: 'main',
        },
        {
          entry: 'src/preload.ts',
          config: 'vite.preload.config.ts',
          target: 'preload',
        },
      ],
      renderer: [
        {
          name: 'main_window',
          config: 'vite.renderer.config.ts',
        },
      ],
    }),
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

export default config;
