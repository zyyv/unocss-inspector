import type { UnpluginInstance } from 'unplugin'
import type { Options } from './core/options'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createUnplugin } from 'unplugin'
import { log } from './core/debug'
import { resolveOptions } from './core/options'

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
        if (!options.enabled) {
          return html
        }

        return {
          html,
          tags: [
            {
              tag: 'link',
              attrs: {
                rel: 'stylesheet',
                href: `/@id/${VIRTUALURL}:inspector.css`,
              },
              injectTo: 'head',
            },
            {
              tag: 'script',
              attrs: {
                type: 'module',
                src: `/@id/${VIRTUALURL}:app.js`,
              },
              injectTo: 'head',
            },
          ],
        }
      },
      resolveId(id) {
        if (!options.enabled) {
          return
        }

        if (id === `${VIRTUALURL}:app.js`) {
          return id
        }

        if (id === `${VIRTUALURL}:inspector.css`) {
          log('resolving css id', id)
          return id
        }
        // Handle inspector component imports
        if (id === '@uno-inspect/inspector') {
          return resolve(__dirname, './ui/inspector.js')
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
        if (id === `${VIRTUALURL}:inspector.css`) {
          const inspectorCssPath = resolve(__dirname, './ui/inspector.css')
          try {
            const cssContent = readFileSync(inspectorCssPath, 'utf-8')
            // Add custom styles if provided
            const customStylesContent = options.customStyles
              ? `\n/* Custom user styles */\n${options.customStyles}\n`
              : ''
            return cssContent + customStylesContent
          }
          catch (error) {
            console.warn(`Could not load inspector CSS from ${inspectorCssPath}:`, error)
            return options.customStyles || ''
          }
        }
      },
    },
  }
})

// Legacy export for backward compatibility
export const unpluginUnoInspector: UnpluginInstance<Options | undefined, false> = Starter

// Default export
export default Starter

// Export types
export type { Options, Panel } from './core/options'
