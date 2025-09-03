<script lang='ts' setup>
import { computed } from 'vue'
import { useElement } from '../composables/element'

const { element, updateTrigger } = useElement()

const textContent = computed(() => {
  void updateTrigger.value

  if (!element.value) {
    return ''
  }

  return element.value.textContent?.trim().slice(0, 100) || ''
})
</script>

<template>
  <div v-if="textContent" class="bg-slate-50 p-3 rounded-md text-xs leading-6 text-gray-700 max-h-[260px] overflow-y-auto flex-1">
    {{ textContent }}
    <span v-if="textContent.length >= 100">...</span>
  </div>
  <div v-else class="flex flex-col items-center justify-center h-[200px] text-gray-500">
    <p class="m-0 text-sm">
      This element has no text content
    </p>
  </div>
</template>
