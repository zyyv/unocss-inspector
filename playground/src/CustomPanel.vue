<script lang='ts' setup>
import { useElement } from '@uno-inspect/inspector'
import { computed } from 'vue'

const { element, tracking } = useElement()

const elementTag = computed(() => {
  tracking()
  return element.value?.tagName.toLowerCase() || 'No element selected'
})
</script>

<template>
  <div p-4>
    I'm a user custom panel!
    <p text-green>
      Selected Element: {{ elementTag }}
    </p>
  </div>
</template>
