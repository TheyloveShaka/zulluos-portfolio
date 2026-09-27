import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { FontaineTransform } from 'fontaine'

const FALLBACK_NAME_MAP: Record<string, string> = {
  'Fira Sans': 'Fira Sans Fallback',
  'Bricolage Grotesque Variable': 'Bricolage Fallback',
  'Caveat Variable': 'Caveat Fallback',
  'Fira Mono': 'Fira Mono Fallback',
}

export default defineConfig({
  base: '/',
  build: {
    target: 'esnext',
  },
  server: {
    host: true,
    port: 3000,
  },
  plugins: [
    react(),
    FontaineTransform.vite({
      fallbacks: {
        'Fira Sans': ['Arial'],
        'Bricolage Grotesque Variable': ['Arial'],
        'Caveat Variable': ['Arial'],
        'Fira Mono': ['Courier New'],
      },
      fallbackName: (name) => FALLBACK_NAME_MAP[name] ?? `${name} Fallback`,
    }),
  ],
  optimizeDeps: {
    exclude: ['clippyts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
    },
  },
})
