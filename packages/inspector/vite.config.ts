import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import UnoHelper from './plugins/uno-helper'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS('../../uno.config.ts'),
    UnoHelper(),
    dts({
      include: ['src/index.ts', 'src/types.ts', 'src/composables/exports/*', 'src/components/basic/*', 'src/Inspector.vue'],
    }),
  ],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'uno-inspect',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue', '@vueuse/core'],
      output: {
        exports: 'named',
        globals: {
          'vue': 'Vue',
          '@vueuse/core': 'VueUse',
        },
      },
    },
  },
})
