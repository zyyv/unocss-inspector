<script lang='ts' setup>
import { ref } from 'vue'
import { useElement } from '../composables/exports/element'

const { element, updateTrigger } = useElement()
</script>

<template>
  <div p-3>
    <h5 m0>
      <div flex="~ items-center gap-1">
        <div i-hugeicons:dashboard-square-02 />
        <span>Auto Layout</span>
      </div>
    </h5>
  </div>
</template>
