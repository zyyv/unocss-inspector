import type { Theme } from '@unocss/preset-wind4'
import type { UnocssPluginContext } from 'unocss'
import type { UnocssVitePluginAPI, VitePluginConfig } from 'unocss/vite'
import type { Options } from './core/options'
import type { ClientFunctions, ServerFunctions } from './types'
import { createRPCServer } from 'vite-dev-rpc'
import { Starter } from './index'

function vite(options?: Options): ReturnType<typeof Starter.vite>[] {
  let ctx: UnocssPluginContext<VitePluginConfig<Theme>> | undefined

  return [
    Starter.vite(options),
    {
      name: 'unplugin-unocss-inspector:rpc',
      enforce: 'post',
      apply: 'serve',
      configResolved(config) {
        const unocssPlugin = config.plugins.find(i => i.name === 'unocss:api')
        if (unocssPlugin && 'api' in unocssPlugin) {
          const api = unocssPlugin.api as UnocssVitePluginAPI
          ctx = api.getContext()
        }
      },
      async configureServer(server) {
        if (!ctx) {
          console.warn('[unplugin-unocss-inspector] UnoCSS context not found. Make sure UnoCSS plugin is loaded before this plugin.')
          return
        }

        await ctx.ready

        createRPCServer<ClientFunctions, ServerFunctions>('unocss-inspector', server.ws, {
          getUno() {
            if (!ctx) {
              throw new Error('UnoCSS context not found')
            }

            return ctx.uno
          },
          getCtx() {
            if (!ctx) {
              throw new Error('UnoCSS context not found')
            }
            return ctx
          },
          async generate(tokens, options) {
            if (!ctx) {
              throw new Error('UnoCSS context not found')
            }
            const { css } = await ctx.uno.generate(tokens, options)
            return css
          },
        })
      },
    },
  ]
}
export default vite
export { vite as 'module.exports' }
