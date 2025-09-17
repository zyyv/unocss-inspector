import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import UnpluginUnoInspector from '../packages/unplugin/src'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS('../uno.config.ts'),
    UnpluginUnoInspector.vite({
      enabled: true,
      panels: [],
      position: 'bottom-right',
    }),
  ],
  define: {
    'process.env.BABEL_TYPES_8_BREAKING': 'false',
  },
})
