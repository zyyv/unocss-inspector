import type { UnpluginInstance } from 'unplugin'
import type { Options } from './core/options'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import DEBUG from 'debug'
import { createUnplugin } from 'unplugin'
import { resolveOptions } from './core/options'

// eslint-disable-next-line unused-imports/no-unused-vars
const log = DEBUG('inspect:unplugin')

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const VIRTUALURL = 'virtual:unocss-inspector-path'

export const Starter: UnpluginInstance<Options | undefined, false> = createUnplugin((rawOptions = {}) => {
  const options = resolveOptions(rawOptions)

  return {
    name: 'unplugin-unocss-inspector',
    enforce: 'pre',
    apply: 'serve',
    vite: {
      transformIndexHtml(html) {
        const tags = [
          {
            tag: 'link' as const,
            attrs: {
              rel: 'stylesheet',
              href: `/@id/${VIRTUALURL}:inspector.css`,
            },
            injectTo: 'head' as const,
          },
          ...(options.customStyles
            ? [{
                tag: 'style' as const,
                attrs: {
                  type: 'text/css',
                },
                children: `/* Custom user styles */\n${options.customStyles}`,
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
        if (id === '@uno-inspect/inspector') {
          const inspectorPath = resolve(__dirname, './ui/inspector.js')
          return inspectorPath
        }
      },
      load(id) {
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

        if (id === `${VIRTUALURL}:inspector.css?direct`) {
          const inspectorCssPath = resolve(__dirname, './ui/inspector.css')
          try {
            if (existsSync(inspectorCssPath)) {
              return readFileSync(inspectorCssPath, 'utf-8')
            }
          }
          catch (error) {
            console.warn('failed to load inspector.css:', error)
          }
        }
      },
    },
  }
})

export const unpluginUnoInspector: UnpluginInstance<Options | undefined, false> = Starter

export default Starter

export type { Options, Panel } from './core/options'
