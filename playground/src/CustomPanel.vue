<script lang='ts' setup>
import { computed } from 'vue'
import { useElement } from '../../src'

const { element, updateTrigger } = useElement()

const elementTag = computed(() => {
  void updateTrigger.value
  return element.value?.tagName.toLowerCase() || 'No element selected'
})
</script>

<template>
  <div>
    {{ elementTag }}
  </div>
</template>
