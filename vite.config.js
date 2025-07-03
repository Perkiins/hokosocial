import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/guide/dep-pre-bundling.html#optimize-deps
export default defineConfig({
  plugins: [react()],
});