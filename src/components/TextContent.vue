<script lang='ts' setup>
import type { TabComponentProps } from '../types'
import { computed } from 'vue'

const props = defineProps<TabComponentProps>()

const textContent = computed(() => {
  void props.updateTrigger

  if (!props.el) {
    return ''
  }

  return props.el.textContent?.trim().slice(0, 100) || ''
})
</script>

<template>
  <div v-if="textContent" class="text-content">
    {{ textContent }}
    <span v-if="textContent.length >= 100">...</span>
  </div>
  <div v-else class="empty-state">
    <p>This element has no text content</p>
  </div>
</template>

<style scoped>
.text-content {
  background: #f8fafc;
  padding: 12px;
  border-radius: 6px;
  font-size: 13px;
  line-height: 1.5;
  color: #374151;
  max-height: 260px;
  overflow-y: auto;
  flex: 1;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #6b7280;
}

.empty-state p {
  margin: 0;
  font-size: 14px;
}
</style>
