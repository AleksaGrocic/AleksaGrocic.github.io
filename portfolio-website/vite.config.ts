import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [
    react(),
  ],
  server: {
    open: true,
    port: 3000,
  },
  resolve: {
    alias: {
      screens: path.resolve(__dirname, './src/screens'),
    },
  },
  build: {
    outDir: 'build',
  },
});