<script lang='ts' setup>
import { ref } from 'vue'
import { useUno } from '../composables/uno'

const { uno } = useUno()
const result = ref('')

async function test() {
  if (!uno.value)
    return

  const { css } = await uno.value?.generate('text-2xl font-bold text-red-500', { preflights: false, safelist: false })
  result.value = css
}
</script>

<template>
  <!-- TODO: UnoCSS Setting panel -->
  <div @click="test">
    {{ uno?.version }}
  </div>
  <div>
    {{ result }}
  </div>
</template>
