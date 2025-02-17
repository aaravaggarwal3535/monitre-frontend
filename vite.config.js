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
});