import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: './postcss.config.cjs',
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: '/index.html',
      },
    },
  },
  server: {
    port: 5000,
  },
  base: '/', // Aseguramos que la base sea la raíz para el proyecto principal
})
