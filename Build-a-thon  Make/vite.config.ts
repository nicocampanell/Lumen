import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { garminBridge } from './server/garmin.ts'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    garminBridge(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
    // Ensure only one copy of Three.js is bundled (Rollup / production build).
    dedupe: ['three'],
  },

  // Ensure esbuild (dev-mode pre-bundler) also uses only one copy of Three.js.
  // This is needed when packages like @react-three/fiber are present in node_modules
  // and would otherwise cause esbuild to pre-bundle a second Three.js instance.
  optimizeDeps: {
    include: ['three'],
    exclude: ['@react-three/fiber', '@react-three/drei'],
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
  },
})
