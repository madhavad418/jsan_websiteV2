import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    // In dev, proxy the PHP API to the live server so /admin works locally.
    proxy: {
      '/api': {
        target: 'https://www.jsanconsulting.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096,
    minify: 'esbuild',
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'maps': ['maplibre-gl', '@maptiler/sdk'],
          'motion': ['framer-motion'],
          'particles': ['@tsparticles/react', '@tsparticles/slim'],
          'icons': ['lucide-react'],
        },
      },
    },
  },
})
