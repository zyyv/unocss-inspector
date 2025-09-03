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
  <div v-if="basicInfo" class="info-grid">
    <div class="info-item">
      <span class="label">Tag:</span>
      <span class="value">{{ basicInfo.tagName }}</span>
    </div>
    <div v-if="basicInfo.id" class="info-item">
      <span class="label">ID:</span>
      <span class="value">#{{ basicInfo.id }}</span>
    </div>
    <div class="info-item">
      <span class="label">Position:</span>
      <span class="value">{{ basicInfo.rect.x }}, {{ basicInfo.rect.y }}</span>
    </div>
    <div class="info-item">
      <span class="label">Size:</span>
      <span class="value">{{ basicInfo.rect.width }} × {{ basicInfo.rect.height }}</span>
    </div>
  </div>
</template>

<style scoped>
.info-grid {
  display: grid;
  gap: 8px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  background: #f8fafc;
  border-radius: 6px;
}

.label {
  font-weight: 500;
  color: #6b7280;
  font-size: 13px;
}

.value {
  font-family: 'SF Mono', Monaco, monospace;
  font-size: 12px;
  color: #374151;
  font-weight: 500;
}
</style>
