import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS('../uno.config.ts'),
    {
      name: 'uno-inspect-playground',
      apply: 'serve',
      transform(code, id) {
        code = code.replace(`import "@uno-inspect/inspector/css"`, '')

        if (code.includes('@uno-inspect/inspector') && !id.includes('node_modules')) {
          return code.replaceAll('@uno-inspect/inspector', '../../packages/inspector/src')
        }
      },
      load(id) {
        if (id === '@uno-inspect/inspector/css') {
          return `import '../../packages/inspector/dist/index.css'`
        }
      },
    },
  ],
  define: {
    'process.env.BABEL_TYPES_8_BREAKING': 'false',
  },
})
