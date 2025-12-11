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
      external: ['@libsql/client', '@libsql/darwin-arm64', '@libsql/linux-x64', '@libsql/win32-x64'],
    },
  },
});
