import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
  build: {
    rollupOptions: {
      external: [
        '@libsql/client',
        '@libsql/*',
        // Electron modülleri zaten external olmalı ama emin olmak için
        'electron',
      ],
    },
  },
});
