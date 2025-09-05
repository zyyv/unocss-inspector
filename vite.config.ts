import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  root: './playground',
  plugins: [vue(), UnoCSS()],
  define: {
    'process.env.BABEL_TYPES_8_BREAKING': 'false',
  },
  build: {
    rollupOptions: {
      external: [
        'tinyexec',
        '@antfu/install-pkg',
        'local-pkg',
        'mlly',
        'node:fs',
        'node:fs/promises',
        'node:path',
        'node:process',
        'node:module',
        'node:util',
        'node:child_process',
        'node:os',
        'node:url',
        'node:assert',
        'node:v8',
        'fs',
        'path',
        'process',
        'module',
        'util',
        'child_process',
        'os',
        'url',
        'assert',
        'v8',
      ],
    },
  },
  optimizeDeps: {
    exclude: [
      'tinyexec',
      '@antfu/install-pkg',
      'local-pkg',
      'mlly',
    ],
  },
})
