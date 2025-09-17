import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import { Starter as UnoInspector } from '../packages/unplugin/src/index'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS('../uno.config.ts'),
    UnoInspector.vite({
      enabled: true,
      position: 'bottom-right',
      customStyles: `
        /* Custom inspector styles */
        #unocss-inspector-root {
          z-index: 999999;
        }
      `,
      panels: [
        {
          id: 'custom-panel',
          label: 'Custom Panel',
          icon: 'i-hugeicons:confused',
          component: null, // We'll need to import this properly
        },
      ],
    }),
  ],
  define: {
    'process.env.BABEL_TYPES_8_BREAKING': 'false',
  },
})
