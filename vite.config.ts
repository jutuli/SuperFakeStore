import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    target: 'es2022', // Unterstützt moderne Features wie Top-Level Await
    modulePreload: false,
  },
});
