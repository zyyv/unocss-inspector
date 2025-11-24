import type { UnoGenerator } from '@unocss/core'
import type { Theme } from '@unocss/preset-wind4'
import type { ClientFunctions, ServerFunctions } from '../types'
import { createRPCClient } from 'vite-dev-rpc'
import { ref } from 'vue'

const rpc = ref<ReturnType<typeof createRPCClient<ServerFunctions, ClientFunctions>>>()

if (import.meta.hot) {
  rpc.value = createRPCClient<ServerFunctions, ClientFunctions>('unocss-inspector', import.meta.hot, {})
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

  async function generate(tokens: string) {
    if (!rpc.value)
      return
    return await rpc.value.generate(tokens)
  }

  return {
    rpc: rpc as any,
    getUno,
    getCtx,
    generate,
  }
}
