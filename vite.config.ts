import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'


export default defineConfig({
  base: '/',
  build: {
    target: 'esnext', // or 'es2022'
  },
  server: {
    host: true, // Expose the server on your local network
    port: 3000, // Optional: Specify a custom port (default is 5173)
  },
  plugins: [react()],
  optimizeDeps: {
    // clippyts (Merlin wizard) loads its per-agent sprite data via a
    // runtime `import(\`./agents/${name}.js\`)`. esbuild's dep pre-bundler
    // can't statically resolve that expression, so leaving clippyts
    // pre-bundled makes dev-mode fetch the agent chunk from the wrong URL.
    // Excluding it keeps the package served as real files, so the relative
    // import resolves against its actual on-disk location.
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
