<script lang='ts' setup>
import { computed } from 'vue'
import { useElement } from '../composables/element'

const { element, updateTrigger } = useElement()

const basicInfo = computed(() => {
  void updateTrigger.value

  if (!element.value) {
    return null
  }

  const el = element.value
  const rect = el.getBoundingClientRect()

  return {
    tagName: el.tagName.toLowerCase(),
    id: el.id,
    rect: {
      x: Math.round(rect.x),
      y: Math.round(rect.y),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    },
  }
})
</script>

<template>
  <div v-if="basicInfo" class="grid gap-2">
    <div class="flex justify-between p-2 px-3 bg-slate-50 rounded-md">
      <span class="font-medium text-gray-500 text-xs">Tag:</span>
      <span class="font-mono text-xs text-gray-700 font-medium">{{ basicInfo.tagName }}</span>
    </div>
    <div v-if="basicInfo.id" class="flex justify-between p-2 px-3 bg-slate-50 rounded-md">
      <span class="font-medium text-gray-500 text-xs">ID:</span>
      <span class="font-mono text-xs text-gray-700 font-medium">#{{ basicInfo.id }}</span>
    </div>
    <div class="flex justify-between p-2 px-3 bg-slate-50 rounded-md">
      <span class="font-medium text-gray-500 text-xs">Position:</span>
      <span class="font-mono text-xs text-gray-700 font-medium">{{ basicInfo.rect.x }}, {{ basicInfo.rect.y }}</span>
    </div>
    <div class="flex justify-between p-2 px-3 bg-slate-50 rounded-md">
      <span class="font-medium text-gray-500 text-xs">Size:</span>
      <span class="font-mono text-xs text-gray-700 font-medium">{{ basicInfo.rect.width }} × {{ basicInfo.rect.height }}</span>
    </div>
  </div>
</template>
