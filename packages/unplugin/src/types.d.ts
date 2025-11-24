import type { UnoGenerator } from '@unocss/core'

export interface ServerFunctions {
  getCtx: () => UnocssPluginContext<VitePluginConfig<import('@unocss/preset-wind4').Theme>>
  getUno: () => UnoGenerator<import('@unocss/preset-wind4').Theme>
  generate: (tokens: Parameters<UnoGenerator['generate']>[0], options?: Parameters<UnoGenerator['generate']>[1]) => Promise<string>
}

export interface ClientFunctions {}
