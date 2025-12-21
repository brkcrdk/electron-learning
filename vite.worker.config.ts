import path from 'path';

import { defineConfig } from 'vite';

// Worker process için özel Vite config
// Build çıktısı workers/ klasörüne yazılacak
export default defineConfig({
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './app'),
      '@api': path.resolve(__dirname, './api'),
      '@db': path.resolve(__dirname, './db'),
    },
  },
  build: {
    rollupOptions: {
      external: ['better-sqlite3'],
      output: {
        format: 'cjs',
        // Output dosyasını workers/ klasörüne yaz
        entryFileNames: 'workers/[name].js',
      },
    },
  },
});

