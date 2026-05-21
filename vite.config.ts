import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
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
    '@/components/ui/button.tsx',
    '@/components/ui/card.tsx',
    '@/components/ui/input.tsx',
    '@/components/ui/label.tsx',
  ],
},

      },
    },
  },
})
