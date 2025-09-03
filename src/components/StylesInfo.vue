<script lang='ts' setup>
import type { VNode } from 'vue'
import { computed } from 'vue'
import { useElement } from '../composables/element'

const { element, updateTrigger } = useElement()

const stylesInfo = computed(() => {
  void updateTrigger.value

  if (!element.value) {
    return null
  }

  const el = element.value
  const computedStyle = window.getComputedStyle(el)

  // 获取行内样式
  const inlineStyles: Record<string, string> = {}
  if (el.style.length > 0) {
    const vnode = (el as any).__vnode as VNode | undefined
    if (vnode) {
      for (const [key, value] of Object.entries(vnode.props?.style || {})) {
        inlineStyles[key] = value as string
      }
    }
    else {
      for (let i = 0; i < el.style.length; i++) {
        const property = el.style.item(i)
        inlineStyles[property] = el.style.getPropertyValue(property)
      }
    }
  }

  const keys = ['display', 'position', 'zIndex', 'color', 'backgroundColor', 'fontSize', 'fontFamily', 'fontWeight', 'lineHeight', 'textAlign', 'overflow', 'opacity', 'transform', 'transition']

  const importantStyles = keys.reduce((acc, key) => {
    if (!Object.keys(inlineStyles).includes(key) && computedStyle.getPropertyValue(key)) {
      acc[key] = computedStyle.getPropertyValue(key)
    }
    return acc
  }, {} as Record<string, string>)

  return {
    inline: inlineStyles,
    computed: importantStyles,
  }
})
</script>

<template>
  <div v-if="stylesInfo" class="styles-container">
    <!-- 行内样式 -->
    <div v-if="Object.keys(stylesInfo.inline).length > 0" class="style-group">
      <h4 class="style-group-title">
        Inline Styles
      </h4>
      <div class="styles-grid">
        <div
          v-for="(value, key) in stylesInfo.inline"
          :key="`inline-${key}`"
          class="style-item inline-style"
        >
          <span class="style-name">{{ key }}:</span>
          <span class="style-value">{{ value }}</span>
        </div>
      </div>
    </div>

    <!-- 计算样式 -->
    <div class="style-group">
      <h4 class="style-group-title">
        Computed Styles
      </h4>
      <div class="styles-grid">
        <div
          v-for="(value, key) in stylesInfo.computed"
          :key="`computed-${key}`"
          class="style-item"
        >
          <span class="style-name">{{ key }}:</span>
          <span class="style-value">{{ value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.styles-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 280px;
  overflow-y: auto;
  flex: 1;
}

.style-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.style-group-title {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  color: #4b5563;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding-bottom: 4px;
  border-bottom: 1px solid #e5e7eb;
}

.styles-grid {
  display: grid;
  gap: 6px;
}

.style-item {
  display: flex;
  padding: 6px 10px;
  background: #f8fafc;
  border-radius: 4px;
  font-size: 12px;
}

.style-item.inline-style {
  background: #fef3c7;
  border-left: 3px solid #f59e0b;
}

.style-name {
  color: #7c3aed;
  font-weight: 500;
  min-width: 100px;
  font-family: 'SF Mono', Monaco, monospace;
}

.inline-style .style-name {
  color: #92400e;
}

.style-value {
  color: #374151;
  font-family: 'SF Mono', Monaco, monospace;
  word-break: break-all;
  margin-left: 8px;
}
</style>
