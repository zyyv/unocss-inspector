import type { UnocssPluginContext, UnoGenerator } from '@unocss/core'
import type { VitePluginConfig } from 'unocss/vite'

import type { Component } from 'vue'

export interface TabPanel {
  id: string
  label: string
  /**
   * Recommended Icon name from https://icones.js.org/collection/hugeicons
   */
  icon: string
  /**
   * The component to render in this tab panel
   */
  component: Component
}

export interface ServerFunctions {
  getCtx: () => UnocssPluginContext<VitePluginConfig<import('@unocss/preset-wind4').Theme>>
  getUno: () => UnoGenerator<import('@unocss/preset-wind4').Theme>
  generate: (tokens: Parameters<UnoGenerator['generate']>[0], options?: Parameters<UnoGenerator['generate']>[1]) => Promise<string>
}

export interface ClientFunctions {}
