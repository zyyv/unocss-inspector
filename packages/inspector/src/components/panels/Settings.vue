<script lang='ts' setup>
import type { ClientFunctions, ServerFunctions } from '../../../../unplugin/src/types'
import { createRPCClient } from 'vite-dev-rpc'

import { ref } from 'vue'

let rpc: ReturnType<typeof createRPCClient<ServerFunctions, ClientFunctions>> | undefined

if (import.meta.hot) {
  rpc = createRPCClient<ServerFunctions, ClientFunctions>('demo', import.meta.hot, {
    alert(message) {
      return message
    },
  })
}

const version = ref('')

async function test() {
  if (!rpc)
    return
  const v = await rpc.version()
  version.value = v
}
</script>

<template>
  <div class="p-4">
    <button @click="test">
      Get UnoCSS Version
    </button>
    <div v-if="version">
      UnoCSS Version: {{ version }}
    </div>
  </div>
</template>
