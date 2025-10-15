import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
// import UnoInspector from 'unplugin-uno-inspector/vite' // use this for testing the published package
import UnoInspector from '../../packages/unplugin/src/vite' // use this for testing the local package

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS('../../uno.config.ts'),
    UnoInspector(),
  ],
  define: {
    'process.env.BABEL_TYPES_8_BREAKING': 'false',
  },
})
