import path from 'path';

import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import packageJson from './package.json';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './app'),
      '@api': path.resolve(__dirname, './api'),
      '@db': path.resolve(__dirname, './db'),
    },
  },
  define: {
    'process.env.APP_VERSION': JSON.stringify(packageJson.version),
  },
  plugins: [
    tanstackRouter({
      routesDirectory: 'app/routes',
      generatedRouteTree: 'app/routeTree.gen.ts',
      target: 'react',
      autoCodeSplitting: true,
      routeFileIgnorePattern: 'modules|hooks|utils',
    }),
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    tailwindcss(),
  ],
});
