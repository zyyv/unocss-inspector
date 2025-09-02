<script setup lang="ts">
import { useToggle, useWindowSize } from '@vueuse/core'
import { computed, onUnmounted, ref } from 'vue'
import ElementInfo from './ElementInfo.vue'
import IconUnoCSS from './icons/UnoCSS.vue'

const selectedElement = defineModel<HTMLElement | null>({ default: null })

const { width: windowWidth, height: windowHeight } = useWindowSize()

const [isSelecting, _toggleSelecting] = useToggle(false)
const [showSelectedOverlay, _toggleSelectedOverlay] = useToggle(false)
const [isDraggingControl, _toggleDraggingControl] = useToggle(false)
const hoveredElement = ref<HTMLElement | null>(null)
const updateTrigger = ref(0) // 用于强制重新计算样式

// 控制面板拖拽相关状态
const controlPosition = ref({ x: 20, y: 20 })
const dragOffset = ref({ x: 0, y: 0 })
const mouseDownPosition = ref({ x: 0, y: 0 })
const hasMoved = ref(false)

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

  // 确保在 body 元素上监听事件，因为检查器组件已经传送到 body
  document.body.addEventListener('mouseover', handleMouseOver, { capture: true })
  document.body.addEventListener('click', handleClick, { capture: true })
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

  document.body.removeEventListener('mouseover', handleMouseOver, { capture: true })
  document.body.removeEventListener('click', handleClick, { capture: true })
  document.body.style.cursor = ''

  // 移除窗口事件监听
  window.removeEventListener('resize', updateHighlight)
  window.removeEventListener('scroll', updateHighlight, true)
}

function handleMouseOver(event: MouseEvent) {
  if (!isSelecting.value)
    return

  const target = event.target as HTMLElement
  // Exclude some dom elements
  if (target && !target.closest('.uno-inspect-controls') && !target.closest('.uno-inspect-element-info')) {
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
  if (target && !target.closest('.uno-inspect-controls') && !target.closest('.uno-inspect-element-info')) {
    selectedElement.value = target
    showSelectedOverlay.value = true
    isSelecting.value = false

    // 移除鼠标事件监听，但保留选中状态和窗口事件监听
    document.body.removeEventListener('mouseover', handleMouseOver, { capture: true })
    document.body.removeEventListener('click', handleClick, { capture: true })
    document.body.style.cursor = ''
  }
}

// 控制面板拖拽相关函数
function startControlDrag(event: MouseEvent) {
  // 记录鼠标按下的位置
  mouseDownPosition.value = { x: event.clientX, y: event.clientY }
  hasMoved.value = false

  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  dragOffset.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  }

  // 在 document 上监听，确保即使鼠标移出按钮也能继续拖拽
  document.addEventListener('mousemove', handleControlDrag)
  document.addEventListener('mouseup', stopControlDrag)
  event.preventDefault()
  // 阻止事件冒泡，避免干扰其他事件处理
  event.stopPropagation()
}

function handleControlDrag(event: MouseEvent) {
  // 计算鼠标移动距离
  const moveDistance = Math.sqrt(
    (event.clientX - mouseDownPosition.value.x) ** 2
    + (event.clientY - mouseDownPosition.value.y) ** 2,
  )

  // 如果移动距离超过阈值，则认为是拖拽操作
  if (moveDistance > 5) {
    isDraggingControl.value = true
    hasMoved.value = true
  }

  if (!isDraggingControl.value)
    return

  const newX = event.clientX - dragOffset.value.x
  const newY = event.clientY - dragOffset.value.y

  // 限制在视口内
  const controlSize = 40 // 按钮大小

  controlPosition.value = {
    x: Math.max(0, Math.min(newX, windowWidth.value - controlSize)),
    y: Math.max(0, Math.min(newY, windowHeight.value - controlSize)),
  }
}

function stopControlDrag() {
  // 在鼠标释放时，如果没有拖拽，则触发点击事件
  if (!hasMoved.value) {
    // 确保在下一个事件循环中执行，避免事件冲突
    setTimeout(() => {
      startSelecting()
    }, 0)
  }

  isDraggingControl.value = false
  hasMoved.value = false
  document.removeEventListener('mousemove', handleControlDrag)
  document.removeEventListener('mouseup', stopControlDrag)
}

onUnmounted(() => {
  stopSelecting()
  // 确保移除所有窗口事件监听
  window.removeEventListener('resize', updateHighlight)
  window.removeEventListener('scroll', updateHighlight, true)
})
</script>

<template>
  <Teleport to="body">
    <!-- 控制按钮 -->
    <div
      class="uno-inspect-controls"
      :class="{ dragging: isDraggingControl }"
      :style="{
        position: 'fixed',
        top: `${controlPosition.y}px`,
        left: `${controlPosition.x}px`,
        zIndex: '10002',
      }"
      @mousedown="startControlDrag"
    >
      <button>
        <IconUnoCSS />
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
      :is-selected="showSelectedOverlay"
      :action="{ start: startSelecting, stop: stopSelecting }"
    />
  </Teleport>
</template>

<style>
:root {
  --margin-bg-color: oklch(82% 0.15 60 / 0.25);
  --padding-bg-color: oklch(75% 0.12 240 / 0.3);
  --content-bg-color: oklch(78% 0.14 140 / 0.25);
  --border-bg-color: oklch(80% 0.18 20 / 0.3);
}

/* 确保传送到 body 的元素样式正确 */
body .uno-inspect-controls {
  position: fixed !important;
  z-index: 10002 !important;
  pointer-events: auto !important;
}

body .uno-inspect-element-info {
  position: fixed !important;
  z-index: 10001 !important;
  pointer-events: auto !important;
}

body .box-model-overlay {
  position: fixed !important;
  z-index: 9999 !important;
  pointer-events: none !important;
}
</style>

<style scoped>
.uno-inspect-controls {
  padding: 4px;
  cursor: move;
  user-select: none;

  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 200%;
    height: 200%;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    background: linear-gradient(to bottom right, #c5c5c5, #444444);
    filter: blur(20px);
    z-index: -1;
    transition: all 0.3s ease;
    opacity: 0;
    animation: rotate-0360 4s linear infinite;
  }
}

@keyframes rotate-0360 {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.uno-inspect-controls:hover {
  &::before {
    opacity: 1;
  }
}

.uno-inspect-controls.dragging {
  cursor: grabbing;
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
