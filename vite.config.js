import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for Arrow Flow
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
  },
  base:'/ArrowFlow/'
});
