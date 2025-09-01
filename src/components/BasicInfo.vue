<script lang='ts' setup>
interface BasicInfoData {
  tagName: string
  id: string
  rect: {
    x: number
    y: number
    width: number
    height: number
  }
}

interface Props {
  basicInfo: BasicInfoData
}

defineProps<Props>()
</script>

<template>
  <div class="info-grid">
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
