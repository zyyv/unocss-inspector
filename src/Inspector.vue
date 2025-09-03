<script setup lang="ts">
import { useToggle, useWindowSize } from '@vueuse/core'
import { computed, onUnmounted, ref } from 'vue'
import { provideCurrentElement } from './composables/element'
import { useMagicKey } from './composables/magickey'
import ElementInfo from './ElementInfo.vue'

const selectedElement = defineModel<HTMLElement | null>({ default: null })
const [isSelecting, _toggleSelecting] = useToggle(false)
const [showSelectedOverlay, _toggleSelectedOverlay] = useToggle(false)
const [isDraggingControl, _toggleDraggingControl] = useToggle(false)
const { width: windowWidth, height: windowHeight } = useWindowSize()

const hoveredElement = ref<HTMLElement | null>(null)
const updateTrigger = ref(0) // 用于强制重新计算样式

const currentElement = computed(() => {
  return showSelectedOverlay.value ? selectedElement.value : hoveredElement.value
})

provideCurrentElement(currentElement, updateTrigger)

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
    containerTop: rect.top - margin.top,
    containerLeft: rect.left - margin.left,
    containerWidth: rect.width + margin.left + margin.right,
    containerHeight: rect.height + margin.top + margin.bottom,

    elementTop: rect.top,
    elementLeft: rect.left,
    elementWidth: rect.width,
    elementHeight: rect.height,

    contentTop: rect.top + padding.top,
    contentLeft: rect.left + padding.left,
    contentWidth: rect.width - padding.left - padding.right,
    contentHeight: rect.height - padding.top - padding.bottom,

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
  if (!hasMoved.value) {
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

useMagicKey(() => {
  if (isSelecting.value) {
    stopSelecting()
  }
  else {
    startSelecting()
  }
})
</script>

<template>
  <Teleport to="body">
    <!-- 控制按钮 -->
    <div
      class="uno-inspect-controls p-1 cursor-move select-none"
      :class="{ 'cursor-grabbing': isDraggingControl }"
      :style="{
        position: 'fixed',
        top: `${controlPosition.y}px`,
        left: `${controlPosition.x}px`,
        zIndex: '10002',
      }"
      @mousedown="startControlDrag"
    >
      <button class="border-none bg-transparent cursor-move">
        <div text-xl i-catppuccin:unocss />
      </button>
    </div>

    <!-- 高亮遮罩 - 盒模型显示 -->
    <div v-if="(isSelecting && highlightStyle.containerTop !== undefined) || showSelectedOverlay" class="fixed pointer-events-none z-9999 font-dm">
      <!-- Margin 层 -->
      <div
        v-if="highlightStyle.margin && highlightStyle.padding"
        b="~ dashed inspect-margin/50"
        class="rd-md bg-inspect-margin/25 overflow-hidden transition-all duration-100 relative"
        :style="{
          position: 'fixed',
          top: `${highlightStyle.containerTop}px`,
          left: `${highlightStyle.containerLeft}px`,
          width: `${highlightStyle.containerWidth}px`,
          height: `${highlightStyle.containerHeight}px`,
          pointerEvents: 'none',
          zIndex: '9999',

        }"
      >
        <!-- Margin 数值标签 -->
        <div class="absolute text-10px font-medium text-inspect-margin inset-0 pointer-events-none">
          <!-- Margin Top -->
          <div
            v-if="highlightStyle.margin.top > 0"
            class="absolute"
            :style="{
              top: '0',
              left: '50%',
              transform: 'translateX(-50%)',
            }"
          >
            mt-{{ highlightStyle.margin.top / 4 }}
          </div>
          <!-- Margin Right -->
          <div
            v-if="highlightStyle.margin.right > 0"
            class="absolute"
            :style="{
              top: '50%',
              right: `0`,
              transform: 'translateY(-50%)',
            }"
          >
            mr-{{ highlightStyle.margin.right / 4 }}
          </div>
          <!-- Margin Bottom -->
          <div
            v-if="highlightStyle.margin.bottom > 0"
            class="absolute"
            :style="{
              bottom: '0',
              left: '50%',
              transform: 'translateX(-50%)',
            }"
          >
            mb-{{ highlightStyle.margin.bottom / 4 }}
          </div>
          <!-- Margin Left -->
          <div
            v-if="highlightStyle.margin.left > 0"
            class="absolute"
            :style="{
              top: '50%',
              left: '0',
              transform: 'translateY(-50%)',
            }"
          >
            ml-{{ highlightStyle.margin.left / 4 }}
          </div>
        </div>

        <div
          class="absolute bg-inspect-padding/30 transition-all duration-100 relative"
          :style="{
            top: `${highlightStyle.margin.top}px`,
            left: `${highlightStyle.margin.left}px`,
            width: `${highlightStyle.elementWidth}px`,
            height: `${highlightStyle.elementHeight}px`,
          }"
        >
          <!-- Padding 数值标签 -->
          <div class="absolute text-10px font-medium inset-0 text-inspect-padding pointer-events-none">
            <!-- Padding Top -->
            <div
              v-if="highlightStyle.padding.top > 0"
              class="absolute"
              :style="{
                top: '0',
                left: '50%',
                transform: 'translateX(-50%)',
              }"
            >
              pt-{{ highlightStyle.padding.top / 4 }}
            </div>
            <!-- Padding Right -->
            <div
              v-if="highlightStyle.padding.right > 0"
              class="absolute"
              :style="{
                top: '50%',
                right: '0',
                transform: 'translateY(-50%)',
              }"
            >
              pr-{{ highlightStyle.padding.right / 4 }}
            </div>
            <!-- Padding Bottom -->
            <div
              v-if="highlightStyle.padding.bottom > 0"
              class="absolute"
              :style="{
                bottom: '0',
                left: '50%',
                transform: 'translateX(-50%)',
              }"
            >
              pb-{{ highlightStyle.padding.bottom / 4 }}
            </div>
            <!-- Padding Left -->
            <div
              v-if="highlightStyle.padding.left > 0"
              class="absolute"
              :style="{
                top: '50%',
                left: '0',
                transform: 'translateY(-50%)',
              }"
            >
              pl-{{ highlightStyle.padding.left / 4 }}
            </div>
          </div>

          <!-- Content 层 -->
          <div
            class="absolute bg-inspect-content/15 transition-all duration-100"
            :style="{
              top: `${highlightStyle.padding.top}px`,
              left: `${highlightStyle.padding.left}px`,
              width: `${highlightStyle.contentWidth}px`,
              height: `${highlightStyle.contentHeight}px`,
            }"
          />
        </div>
      </div>
    </div>

    <!-- ElementInfo 组件 -->
    <ElementInfo
      v-if="(isSelecting && hoveredElement) || showSelectedOverlay"
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
  position: relative;

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
</style>
