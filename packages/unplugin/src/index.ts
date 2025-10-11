import type { UnpluginInstance } from 'unplugin'
import type { Options } from './core/options'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createUnplugin } from 'unplugin'
import { resolveOptions } from './core/options'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const VIRTUALURL = 'virtual:unocss-inspector-path'

export const Starter: UnpluginInstance<Options | undefined, false> = createUnplugin((rawOptions = {}) => {
  const options = resolveOptions(rawOptions)

  return {
    name: 'unplugin-unocss-inspector',
    enforce: 'pre',
    apply: options.apply,
    vite: {
      transformIndexHtml(html) {
        if (!options.enabled) {
          return html
        }

        const inspectorCssPath = resolve(__dirname, './ui/inspector.css')
        let cssContent = ''
        try {
          if (existsSync(inspectorCssPath)) {
            cssContent = readFileSync(inspectorCssPath, 'utf-8')
          }
        }
        catch (error) {
          console.warn('failed to load CSS for inline injection:', error)
        }

        if (options.customStyles) {
          cssContent += `\n/* Custom user styles */\n${options.customStyles}\n`
        }

        const tags = [
          ...(cssContent
            ? [{
                tag: 'style' as const,
                attrs: {
                  type: 'text/css',
                },
                children: cssContent,
                injectTo: 'head' as const,
              }]
            : []),
          {
            tag: 'script',
            attrs: {
              type: 'module',
              src: `/@id/${VIRTUALURL}:app.js`,
            },
            injectTo: 'head' as const,
          },
        ]

        return {
          html,
          tags,
        }
      },
      resolveId(id) {
        if (!options.enabled) {
          return
        }

        if (id === `${VIRTUALURL}:app.js`) {
          return id
        }

        if (id === '@uno-inspect/inspector') {
          const inspectorPath = resolve(__dirname, './ui/inspector.js')
          return inspectorPath
        }
      },
      load(id) {
        if (!options.enabled) {
          return
        }

        if (id === `${VIRTUALURL}:app.js`) {
          const appJsPath = resolve(__dirname, './ui/app.js')
          try {
            let appCode = readFileSync(appJsPath, 'utf-8')
            appCode = appCode.replace(
              'panels: [],',
              `panels: ${JSON.stringify(options.panels)},`,
            )
            return appCode
          }
          catch (error) {
            console.warn(`Could not load app.js from ${appJsPath}`, error)
          }
        }
      },
    },
  }
})

export const unpluginUnoInspector: UnpluginInstance<Options | undefined, false> = Starter

export default Starter

export type { Options, Panel } from './core/options'
