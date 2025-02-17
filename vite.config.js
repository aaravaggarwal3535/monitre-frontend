import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import stringReplace from 'vite-plugin-string-replace';

export default defineConfig({
  plugins: [
    tailwindcss(),
    stringReplace({
      replacements: [
        { from: 'use client', to: '' },
      ],
    }),
  ],
});