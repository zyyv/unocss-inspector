<script lang='ts' setup>
import { computed } from 'vue'
import { useElement } from '../composables/element'

const { element, updateTrigger } = useElement()

const classList = computed(() => {
  void updateTrigger.value

  if (!element.value) {
    return []
  }

  return Array.from(element.value.classList)
})
</script>

<template>
  <div v-if="classList.length" class="flex flex-wrap gap-1.5 max-h-[280px] overflow-y-auto">
    <span
      v-for="className in classList"
      :key="className"
      class="font-mono text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium"
    >
      .{{ className }}
    </span>
  </div>
  <div v-else class="flex flex-col items-center justify-center h-[200px] text-gray-500">
    <p class="m-0 text-sm">
      This element has no CSS classes
    </p>
  </div>
</template>
