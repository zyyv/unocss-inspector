import type { UnoGenerator } from '@unocss/core'
import type { Theme } from '@unocss/preset-wind4'
import type { ClientFunctions, ServerFunctions } from '../types'
import { createRPCClient } from 'vite-dev-rpc'
import { ref } from 'vue'

const rpc = ref<ReturnType<typeof createRPCClient<ServerFunctions, ClientFunctions>>>()

declare global {
  // Provided by the Vite plugin injected app module. The inspector itself is
  // library-built, so import.meta.hot is not always available inside this file.
  // eslint-disable-next-line vars-on-top
  var __UNOCSS_INSPECTOR_HOT__: ImportMeta['hot'] | undefined
}

const hot = globalThis.__UNOCSS_INSPECTOR_HOT__ || import.meta.hot

if (hot) {
  rpc.value = createRPCClient<ServerFunctions, ClientFunctions>('unocss-inspector', hot, {})
}

export function useUnoCSS() {
  async function getUno(key?: keyof UnoGenerator<Theme>) {
    if (!rpc.value)
      return
    const uno = await rpc.value.getUno()

    return key ? uno[key] : uno
  }

  async function getCtx() {
    if (!rpc.value)
      return
    return await rpc.value.getCtx()
  }

  async function getSettings() {
    if (!rpc.value)
      return
    return await rpc.value.getSettings()
  }

  async function generate(tokens: string) {
    if (!rpc.value)
      return
    return await rpc.value.generate(tokens)
  }

  return {
    rpc: rpc as any,
    getUno,
    getCtx,
    getSettings,
    generate,
  }
}
