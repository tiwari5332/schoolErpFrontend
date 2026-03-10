import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'ui-components': [
            './src/ui/button',
            './src/ui/card',
            './src/ui/input',
            './src/ui/label',
          ],
        },
      },
    },
  },
})
