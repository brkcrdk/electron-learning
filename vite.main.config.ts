import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['better-sqlite3', '@libsql/client', '@libsql/darwin-arm64', '@libsql/linux-x64', '@libsql/win32-x64'],
    },
  },
});
