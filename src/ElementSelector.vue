<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import ElementInfo from './ElementInfo.vue'

interface Emits {
  (e: 'elementSelected', element: HTMLElement): void
}

const emit = defineEmits<Emits>()

const selectedElement = defineModel<HTMLElement | null>({ default: null })

// 状态
const isSelecting = ref(false)
const hoveredElement = ref<HTMLElement | null>(null)
const mousePosition = ref({ x: 0, y: 0 })
const showSelectedOverlay = ref(false)
const updateTrigger = ref(0) // 用于强制重新计算样式

// 计算属性

const highlightStyle = computed(() => {
  // 触发重新计算（当窗口大小或滚动位置改变时）
  void updateTrigger.value

  const element = (showSelectedOverlay.value && selectedElement.value) ? selectedElement.value : hoveredElement.value

  if (!element || (!isSelecting.value && !showSelectedOverlay.value))
    return { display: 'none' }

  const rect = element.getBoundingClientRect()
  const computedStyle = window.getComputedStyle(element)

  // 获取盒模型的各个值
  const margin = {
    top: Number.parseFloat(computedStyle.marginTop),
    right: Number.parseFloat(computedStyle.marginRight),
    bottom: Number.parseFloat(computedStyle.marginBottom),
    left: Number.parseFloat(computedStyle.marginLeft),
  }

  const padding = {
    top: Number.parseFloat(computedStyle.paddingTop),
    right: Number.parseFloat(computedStyle.paddingRight),
    bottom: Number.parseFloat(computedStyle.paddingBottom),
    left: Number.parseFloat(computedStyle.paddingLeft),
  }

  return {
    // 容器定位 (包含 margin)
    containerTop: rect.top - margin.top,
    containerLeft: rect.left - margin.left,
    containerWidth: rect.width + margin.left + margin.right,
    containerHeight: rect.height + margin.top + margin.bottom,

    // 元素自身 (不包含 margin)
    elementTop: rect.top,
    elementLeft: rect.left,
    elementWidth: rect.width,
    elementHeight: rect.height,

    // 内容区域 (不包含 padding)
    contentTop: rect.top + padding.top,
    contentLeft: rect.left + padding.left,
    contentWidth: rect.width - padding.left - padding.right,
    contentHeight: rect.height - padding.top - padding.bottom,

    // 边距和内边距值
    margin,
    padding,
  }
})

// 方法
function updateHighlight() {
  updateTrigger.value++
}

function startSelecting() {
  isSelecting.value = true
  showSelectedOverlay.value = false
  document.addEventListener('mouseover', handleMouseOver, { capture: true })
  document.addEventListener('mousemove', handleMouseMove, { capture: true })
  document.addEventListener('click', handleClick, { capture: true })
  document.body.style.cursor = 'crosshair'

  // 添加窗口事件监听
  window.addEventListener('resize', updateHighlight)
  window.addEventListener('scroll', updateHighlight, true) // 使用 capture 监听所有滚动事件
}

function stopSelecting() {
  isSelecting.value = false
  hoveredElement.value = null
  showSelectedOverlay.value = false
  selectedElement.value = null
  document.removeEventListener('mouseover', handleMouseOver, { capture: true })
  document.removeEventListener('mousemove', handleMouseMove, { capture: true })
  document.removeEventListener('click', handleClick, { capture: true })
  document.body.style.cursor = ''

  // 移除窗口事件监听
  window.removeEventListener('resize', updateHighlight)
  window.removeEventListener('scroll', updateHighlight, true)
}

function handleMouseMove(event: MouseEvent) {
  mousePosition.value = { x: event.clientX, y: event.clientY }
}

function handleMouseOver(event: MouseEvent) {
  if (!isSelecting.value)
    return

  const target = event.target as HTMLElement
  // Exclude some dom elements
  if (target && !target.closest('.element-selector') && !target.closest('.element-info')) {
    hoveredElement.value = target
  }
}

function handleClick(event: MouseEvent) {
  if (!isSelecting.value)
    return

  event.preventDefault()
  event.stopPropagation()
  event.stopImmediatePropagation()

  const target = event.target as HTMLElement
  if (target && !target.closest('.element-selector') && !target.closest('.element-info')) {
    selectedElement.value = target
    showSelectedOverlay.value = true
    isSelecting.value = false
    emit('elementSelected', target)

    // 移除鼠标事件监听，但保留选中状态和窗口事件监听
    document.removeEventListener('mouseover', handleMouseOver, { capture: true })
    document.removeEventListener('mousemove', handleMouseMove, { capture: true })
    document.removeEventListener('click', handleClick, { capture: true })
    document.body.style.cursor = ''

    // 保持窗口事件监听以更新选中元素的高亮位置
    // window.addEventListener('resize', updateHighlight) // 已经在 startSelecting 中添加
    // window.addEventListener('scroll', updateHighlight, true) // 已经在 startSelecting 中添加
  }
}

function clearSelection() {
  selectedElement.value = null
  showSelectedOverlay.value = false

  // 移除窗口事件监听
  window.removeEventListener('resize', updateHighlight)
  window.removeEventListener('scroll', updateHighlight, true)
}

// 生命周期
onUnmounted(() => {
  stopSelecting()
  // 确保移除所有窗口事件监听
  window.removeEventListener('resize', updateHighlight)
  window.removeEventListener('scroll', updateHighlight, true)
})
</script>

<template>
  <div class="element-selector">
    <!-- 控制按钮 -->
    <div class="controls">
      <button
        v-if="!isSelecting"
        class="select-btn"
        @click="startSelecting"
      >
        🎯 选择元素
      </button>
      <button
        v-else
        class="cancel-btn"
        @click="stopSelecting"
      >
        ❌ 取消选择
      </button>

      <button
        v-if="selectedElement"
        class="clear-btn"
        @click="clearSelection"
      >
        🗑️ 清除
      </button>
    </div>

    <!-- 高亮遮罩 - 盒模型显示 -->
    <div v-if="(isSelecting && highlightStyle.containerTop !== undefined) || showSelectedOverlay" class="box-model-overlay">
      <!-- Margin 层 -->
      <div
        v-if="highlightStyle.margin && highlightStyle.padding"
        class="margin-layer"
        :style="{
          position: 'fixed',
          top: `${highlightStyle.containerTop}px`,
          left: `${highlightStyle.containerLeft}px`,
          width: `${highlightStyle.containerWidth}px`,
          height: `${highlightStyle.containerHeight}px`,
          pointerEvents: 'none',
          zIndex: '9999',
          backgroundColor: 'var(--margin-bg-color)',
          border: '1px dashed oklch(70% 0.15 60)',
          borderRadius: '3px',
          overflow: 'hidden',
        }"
      >
        <!-- Border + Element 层 -->
        <div
          class="element-layer"
          :style="{
            position: 'absolute',
            top: `${highlightStyle.margin.top}px`,
            left: `${highlightStyle.margin.left}px`,
            width: `${highlightStyle.elementWidth}px`,
            height: `${highlightStyle.elementHeight}px`,
            backgroundColor: 'var(--padding-bg-color)',
            borderRadius: '2px',
          }"
        >
          <!-- Content 层 -->
          <div
            class="content-layer"
            :style="{
              position: 'absolute',
              top: `${highlightStyle.padding.top}px`,
              left: `${highlightStyle.padding.left}px`,
              width: `${highlightStyle.contentWidth}px`,
              height: `${highlightStyle.contentHeight}px`,
              backgroundColor: 'var(--content-bg-color)',
              borderRadius: '1px',
            }"
          />
        </div>
      </div>
    </div>

    <!-- ElementInfo 组件 -->
    <ElementInfo
      v-if="(isSelecting && hoveredElement) || showSelectedOverlay"
      :element="showSelectedOverlay ? selectedElement : hoveredElement"
      :mouse-position="mousePosition"
      :is-selected="showSelectedOverlay"
      @close="clearSelection"
    />
  </div>
</template>

<style>
:root {
  --margin-bg-color: oklch(82% 0.15 60 / 0.25);
  --padding-bg-color: oklch(75% 0.12 240 / 0.3);
  --content-bg-color: oklch(78% 0.14 140 / 0.25);
  --border-bg-color: oklch(80% 0.18 20 / 0.3);
}
</style>

<style scoped>
.element-selector {
  padding: 16px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.controls {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.select-btn,
.cancel-btn,
.clear-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.select-btn {
  background: #3b82f6;
  color: white;
}

.select-btn:hover {
  background: #2563eb;
}

.cancel-btn {
  background: #ef4444;
  color: white;
}

.cancel-btn:hover {
  background: #dc2626;
}

.clear-btn {
  background: #6b7280;
  color: white;
}

.clear-btn:hover {
  background: #4b5563;
}

.selected-info {
  background: #f8fafc;
  padding: 12px;
  border-radius: 6px;
  border-left: 4px solid #3b82f6;
}

.selected-info h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #1f2937;
}

.element-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-item {
  display: flex;
  gap: 8px;
}

.label {
  font-weight: 600;
  color: #6b7280;
  min-width: 60px;
}

.value {
  color: #1f2937;
  font-family: 'SF Mono', monospace;
  font-size: 13px;
}

.instructions {
  background: #f0f9ff;
  padding: 12px;
  border-radius: 6px;
  border-left: 4px solid #0ea5e9;
}

.instructions p {
  margin: 0;
  color: #0c4a6e;
  font-size: 14px;
}

.selecting-hint {
  background: #fef3c7;
  padding: 12px;
  border-radius: 6px;
  border-left: 4px solid #f59e0b;
}

.selecting-hint p {
  margin: 0;
  color: #92400e;
  font-size: 14px;
  font-weight: 500;
}

.box-model-overlay {
  pointer-events: none;
  z-index: 9999;
}

.margin-layer {
  transition: all 0.1s ease;
}

.element-layer {
  transition: all 0.1s ease;
}

.content-layer {
  transition: all 0.1s ease;
}

.box-model-labels {
  z-index: 10000;
  line-height: 1.4;
  box-shadow: 0 4px 12px oklch(0% 0 0 / 0.15);
}

.box-model-labels div {
  margin: 2px 0;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
