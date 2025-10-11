import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import UnoInspector from 'unplugin-uno-inspector/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS('../../uno.config.ts'),
    UnoInspector({ apply: 'build' }),
  ],
  define: {
    'process.env.BABEL_TYPES_8_BREAKING': 'false',
  },
})
