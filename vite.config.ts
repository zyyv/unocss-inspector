import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  root: './playground',
  plugins: [vue(), UnoCSS()],
  define: {
    'process.env.BABEL_TYPES_8_BREAKING': 'false',
  },
})
