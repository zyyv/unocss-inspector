<script lang='ts' setup>
interface Props {
  classList: string[]
}

defineProps<Props>()
</script>

<template>
  <div v-if="classList.length" class="class-list">
    <span
      v-for="className in classList"
      :key="className"
      class="class-item"
    >
      .{{ className }}
    </span>
  </div>
  <div v-else class="empty-state">
    <p>This element has no CSS classes</p>
  </div>
</template>

<style scoped>
.class-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  max-height: 280px;
  overflow-y: auto;
}

.class-item {
  font-family: 'SF Mono', Monaco, monospace;
  font-size: 12px;
  background: #dbeafe;
  color: #1e40af;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
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
