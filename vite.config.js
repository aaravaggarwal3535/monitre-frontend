import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import replace from '@rollup/plugin-replace';

export default defineConfig({
  plugins: [
    tailwindcss(),
    replace({
      'use client': '',
      delimiters: ['', ''],
      preventAssignment: true,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Adjust the chunk size limit as needed
  },
});