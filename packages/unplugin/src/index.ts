// import { createFilter } from 'unplugin-utils'
// import { resolveOptions } from './core/options'
import type { Theme } from '@unocss/preset-wind4'
import type { UnocssPluginContext, UnoGenerator } from 'unocss'
import type { UnocssVitePluginAPI, VitePluginConfig } from 'unocss/vite'
import type { UnpluginInstance } from 'unplugin'
import type { Options } from './core/options'
import { createUnplugin } from 'unplugin'

const VIRTUALURL = 'virtual:unocss-inspector-path'

export const Starter: UnpluginInstance<Options | undefined, false> = createUnplugin((rawOptions = {}) => {
  const name = 'unplugin-unocss-inspector'
  let ctx: UnocssPluginContext<VitePluginConfig<Theme>>

  return {
    name,
    enforce: 'pre',
    apply: 'serve',
    vite: {
      configResolved(config) {
        const api = config.plugins.find(i => i.name === 'unocss:api')?.api as UnocssVitePluginAPI | undefined
        if (!api)
          throw new Error('UnoCSS plugin not found')

        ctx = api.getContext()
      },
      transformIndexHtml(html) {
        return {
          html,
          tags: [
            {
              tag: 'script',
              attrs: { type: 'module', src: `/@id/${VIRTUALURL}:app.js` },
              injectTo: 'head',
            },
          ],
        }
      },
    },
  }
})
