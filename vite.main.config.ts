import path from 'path';

import { defineConfig } from 'vite';

// https://vitejs.dev/config
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
    },
  },
});
