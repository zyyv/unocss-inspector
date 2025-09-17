import type { Theme } from '@unocss/preset-wind4'
import type { UnocssPluginContext } from 'unocss'
import type { UnocssVitePluginAPI, VitePluginConfig } from 'unocss/vite'
import type { Options } from './core/options'
import type { ClientFunctions, ServerFunctions } from './types'
import { createRPCServer } from 'vite-dev-rpc'
import { Starter } from './index'

function vite(options?: Options): ReturnType<typeof Starter.vite>[] {
  let ctx: UnocssPluginContext<VitePluginConfig<Theme>>

  return [
    Starter.vite(options),
    {
      name: 'unplugin-unocss-inspector:rpc',
      enforce: 'pre',
      apply: 'serve',
      configResolved(config) {
        const api = config.plugins.find(i => i.name === 'unocss:api')?.api as UnocssVitePluginAPI | undefined
        if (!api) {
          throw new Error('UnoCSS plugin not found')
        }
        ctx = api.getContext()
      },
      async configureServer(server) {
        await ctx.ready

        const rpc = createRPCServer<ClientFunctions, ServerFunctions>('demo', server.ws, {
          version() {
            rpc.alert.asEvent(`Someone got!`)
            return ctx.uno.version
          },
          async generate(tokens, options) {
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
