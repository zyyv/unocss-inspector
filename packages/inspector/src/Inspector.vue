<script setup lang="ts">
import type { TabPanel } from './types'
import { useToggle, useWindowSize } from '@vueuse/core'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useTracker } from './composables/exports/element'
import { useMagicKey } from './composables/magickey'
import ElementInfo from './ElementInfo.vue'
import { round } from './utils'

defineProps<{
  panels?: TabPanel[]
}>()

const { tracking, triggering, element: selectedElement } = useTracker()

const modelValueElement = defineModel<HTMLElement | null>({ default: null })
const [isSelecting, _toggleSelecting] = useToggle(false)
const [isDraggingControl, _toggleDraggingControl] = useToggle(false)
const { width: windowWidth, height: windowHeight } = useWindowSize()

// 控制面板拖拽相关状态
const controlPosition = ref({ x: 20, y: 20 })
const dragOffset = ref({ x: 0, y: 0 })
const mouseDownPosition = ref({ x: 0, y: 0 })
const hasMoved = ref(false)

const highlightStyle = computed(() => {
  // 触发重新计算（当窗口大小或滚动位置改变时）
  tracking()

  const element = selectedElement.value

  if (!element)
    return

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
  triggering()
}

function startSelecting() {
  isSelecting.value = true

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
    selectedElement.value = target
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
    modelValueElement.value = target
    isSelecting.value = false

    document.body.removeEventListener('mouseover', handleMouseOver, { capture: true })
    document.body.removeEventListener('click', handleClick, { capture: true })
    document.body.style.cursor = ''
  }
}

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

onMounted(() => {
  if (!document.body.classList.contains('virtual-inspector-injected')) {
    document.body.classList.add('virtual-inspector-injected')
  }
})

useMagicKey(() => {
  if (isSelecting.value) {
    stopSelecting()
  }
  else {
    startSelecting()
  }
}, stopSelecting)
</script>

<template>
  <Teleport to="body">
    <div id="__uno-inspector">
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

      <div v-if="highlightStyle" class="uno-inspect-controls-overlay fixed pointer-events-none font-dm">
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
              mt-{{ round(highlightStyle.margin.top / 4) }}
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
              mr-{{ round(highlightStyle.margin.right / 4) }}
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
              mb-{{ round(highlightStyle.margin.bottom / 4) }}
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
              ml-{{ round(highlightStyle.margin.left / 4) }}
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
                pt-{{ round(highlightStyle.padding.top / 4) }}
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
                pr-{{ round(highlightStyle.padding.right / 4) }}
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
                pb-{{ round(highlightStyle.padding.bottom / 4) }}
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
                pl-{{ round(highlightStyle.padding.left / 4) }}
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
        v-if="selectedElement"
        :is-selected="!isSelecting"
        :action="{ start: startSelecting, stop: stopSelecting }"
        :user-panels="panels"
      />
    </div>
  </Teleport>
</template>

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
    filter: blur(30px);
    z-index: -1;
    transition: all 0.3s ease;
    opacity: 0.72;
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
    opacity: 0.2;
  }
}
</style>
