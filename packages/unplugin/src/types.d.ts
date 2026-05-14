import type { UnoGenerator } from '@unocss/core'

export interface SerializedUnoCSSSettings {
  version: string
  context: {
    root?: string
    configFile?: string
    sources: string[]
  }
  config: {
    envMode?: string
    presets: Array<{ name: string }>
    rulesStatic: string[]
    rulesDynamic: string[]
    shortcuts: Array<{ matcher: string, body: string }>
    variants: Array<{ name: string }>
    safelist: string[]
    blocklist: string[]
    layers: Record<string, number>
    transformers: Array<{ name: string }>
    theme: unknown
  }
}

export interface ServerFunctions {
  getCtx: () => unknown
  getUno: () => UnoGenerator<import('@unocss/preset-wind4').Theme>
  getSettings: () => SerializedUnoCSSSettings
  formatCSS: (css: string) => Promise<string>
  formatHTML: (html: string) => Promise<string>
  generate: (tokens: Parameters<UnoGenerator['generate']>[0], options?: Parameters<UnoGenerator['generate']>[1]) => Promise<string>
  generateCSS: (tokens: Parameters<UnoGenerator['generate']>[0], options?: Parameters<UnoGenerator['generate']>[1]) => Promise<{ css: string, matched: string[] }>
}

export interface ClientFunctions {}
