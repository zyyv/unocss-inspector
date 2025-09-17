import type { Theme } from '@unocss/preset-wind4'
import type { UnocssPluginContext } from 'unocss'

import type { UnocssVitePluginAPI, VitePluginConfig } from 'unocss/vite'
import type { UnpluginInstance } from 'unplugin'
import type { Options } from './core/options'
// import { createFilter } from 'unplugin-utils'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { createUnplugin } from 'unplugin'
import { resolveOptions } from './core/options'

const VIRTUALURL = 'virtual:unocss-inspector-path'

export const Starter: UnpluginInstance<Options | undefined, false> = createUnplugin((rawOptions = {}) => {
  const name = 'unplugin-unocss-inspector'
  const options = resolveOptions(rawOptions)
  let _ctx: UnocssPluginContext<VitePluginConfig<Theme>>

  return {
    name,
    enforce: 'pre',
    apply: 'serve',
    vite: {
      configResolved(config) {
        // Skip initialization if disabled
        if (!options.enabled) {
          return
        }

        const api = config.plugins.find(i => i.name === 'unocss:api')?.api as UnocssVitePluginAPI | undefined
        if (!api) {
          throw new Error('UnoCSS plugin not found')
        }

        _ctx = api.getContext()
      },
      transformIndexHtml(html) {
        // Skip injection if disabled
        if (!options.enabled) {
          return html
        }

        return {
          html,
          tags: [
            // Inject CSS first
            {
              tag: 'link',
              attrs: {
                rel: 'stylesheet',
                href: `/@id/${VIRTUALURL}:inspector.css`,
              },
              injectTo: 'head',
            },
            // Then inject the script
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
          return id
        }
        // Handle inspector component imports
        if (id === '@unocss-inspector/dist/inspector.js') {
          return resolve(__dirname, './ui/inspector.js')
        }
        if (id === '@unocss-inspector/dist/inspector.css') {
          return resolve(__dirname, './ui/inspector.css')
        }
      },
      load(id) {
        if (!options.enabled) {
          return
        }

        if (id === `${VIRTUALURL}:app.js`) {
          // Try to load app.js from ui folder first
          const appJsPath = resolve(__dirname, './ui/app.js')
          try {
            let appCode = readFileSync(appJsPath, 'utf-8')
            // Replace dynamic options placeholders
            appCode = appCode.replace(
              'panels: [],',
              `panels: ${JSON.stringify(options.panels)},`,
            )
            appCode = appCode.replace(
              'container.id = \'unocss-inspector-root\'',
              `container.id = 'unocss-inspector-root'
  container.setAttribute('data-position', '${options.position}')`,
            )
            return appCode
          }
          catch (error) {
            console.warn(`Could not load app.js from ${appJsPath}, falling back to generated code:`, error)
            // Fallback to generated code if file doesn't exist
            return generateAppCode(options)
          }
        }
        if (id === `${VIRTUALURL}:inspector.css`) {
          // Load the inspector CSS file
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

function generateAppCode(options: Required<Options>): string {
  return `// Auto-injected Inspector component
import Inspector from '@unocss-inspector/dist/inspector.js'
import { createApp, h } from 'vue'

// Function to initialize the inspector
function initializeInspector() {
  // Check if inspector is already initialized
  if (document.querySelector('#unocss-inspector-root')) {
    return
  }

  // Create a container for the inspector
  const container = document.createElement('div')
  container.id = 'unocss-inspector-root'
  container.setAttribute('data-position', '${options.position}')
  document.body.appendChild(container)

  // Create Vue app instance with the Inspector
  const app = createApp({
    setup() {
      return () => h(Inspector, {
        modelValue: null,
        panels: ${JSON.stringify(options.panels)},
      })
    },
  })

  // Mount the inspector
  app.mount(container)
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeInspector)
}
else {
  initializeInspector()
}`
}

// Legacy export for backward compatibility
export const unpluginUnoInspector: UnpluginInstance<Options | undefined, false> = Starter

// Default export
export default Starter

// Export types
export type { Options, Panel } from './core/options'
