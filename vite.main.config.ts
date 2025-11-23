import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
  build: {
    outDir: '.vite/build',
    rollupOptions: {
      external: ['better-sqlite3'],
    },
  },
});
