<script lang='ts' setup>
import { useEventListener, useMouse, useToggle, useWindowSize } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { useElement } from './composables/element'
import { useTabs } from './composables/tabs'

interface Props {
  isSelected: boolean
  action: {
    start: () => void
    stop: () => void
  }
}

const props = defineProps<Props>()

// 使用 inject 获取 element 和 updateTrigger
const { element, updateTrigger } = useElement()

const { width: windowWidth, height: windowHeight } = useWindowSize()
const { x: mouseX, y: mouseY } = useMouse()

const panelRef = ref<HTMLElement>()

// 拖动相关状态
const [isDragging, _toggleDragging] = useToggle(false)
const dragOffset = ref({ x: 0, y: 0 })
const dragPosition = ref({ x: 0, y: 0 })
const finalPosition = ref({ x: 0, y: 0 })
const initialSelectedPosition = ref({ x: 0, y: 0 }) // 记录选中时的鼠标位置

const { tabs, activeTab, slideDirection, setActiveTab } = useTabs()

// 计算面板位置的辅助函数
function calculatePanelPosition(mouseX: number, mouseY: number) {
  const offsetX = 20
  const offsetY = 20
  const panelWidth = 300
  const panelHeight = panelRef.value?.offsetHeight || 350
  const minMargin = 10

  let left = mouseX + offsetX
  let top = mouseY + offsetY

  // 避免超出右边界
  if (left + panelWidth > windowWidth.value) {
    left = mouseX - panelWidth - offsetX
  }

  // 避免超出下边界
  if (top + panelHeight > windowHeight.value) {
    top = mouseY - panelHeight - offsetY
  }

  // 避免超出左边界
  if (left < minMargin) {
    left = minMargin
  }

  // 避免超出上边界
  if (top < minMargin) {
    top = minMargin
  }

  return { x: left, y: top }
}

const panelPosition = computed(() => {
  let baseX, baseY

  if (props.isSelected) {
    // 选中状态：使用拖动后的最终位置，如果正在拖动则使用当前拖动位置
    if (isDragging.value) {
      baseX = dragPosition.value.x
      baseY = dragPosition.value.y
    }
    else if (finalPosition.value.x !== 0 || finalPosition.value.y !== 0) {
      // 如果已经拖动过，使用最终位置
      baseX = finalPosition.value.x
      baseY = finalPosition.value.y
    }
    else {
      // 使用选中时记录的鼠标位置作为初始位置
      const position = calculatePanelPosition(initialSelectedPosition.value.x, initialSelectedPosition.value.y)
      baseX = position.x
      baseY = position.y
    }
  }
  else {
    // 跟随鼠标状态：跟随鼠标移动，但避免超出视口
    const position = calculatePanelPosition(mouseX.value, mouseY.value)
    baseX = position.x
    baseY = position.y
  }

  return {
    position: 'fixed' as const,
    left: `${baseX}px`,
    top: `${baseY}px`,
    zIndex: '10001',
  }
})

function updateElementInfo() {
  updateTrigger.value++
}

// 拖动相关函数
function startDrag(event: MouseEvent) {
  if (!props.isSelected)
    return

  const rect = (event.currentTarget as HTMLElement).closest('.uno-inspect-element-info')?.getBoundingClientRect()

  if (rect) {
    dragOffset.value = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }

    // 初始化拖拽位置为当前面板位置，避免闪烁
    dragPosition.value = {
      x: rect.left,
      y: rect.top,
    }
  }

  isDragging.value = true
  document.addEventListener('mousemove', handleDrag)
  document.addEventListener('mouseup', stopDrag)
  event.preventDefault()
}

function handleDrag(event: MouseEvent) {
  if (!isDragging.value)
    return

  const newX = event.clientX - dragOffset.value.x
  const newY = event.clientY - dragOffset.value.y

  // 限制在视口内
  const panelWidth = 300 // 与 CSS 中的实际宽度一致
  const panelHeight = panelRef.value?.offsetHeight || 350 // 使用真实DOM高度，fallback到max-height
  const maxX = windowWidth.value - panelWidth
  const maxY = windowHeight.value - panelHeight

  dragPosition.value = {
    x: Math.max(0, Math.min(newX, maxX)),
    y: Math.max(0, Math.min(newY, maxY)),
  }
}

function stopDrag() {
  if (isDragging.value) {
    finalPosition.value = {
      x: dragPosition.value.x,
      y: dragPosition.value.y,
    }
  }

  isDragging.value = false
  document.removeEventListener('mousemove', handleDrag)
  document.removeEventListener('mouseup', stopDrag)
}

// 监听元素变化，重置拖拽位置
watch(() => element.value, () => {
  if (element.value) {
    finalPosition.value = { x: 0, y: 0 }
    dragPosition.value = { x: 0, y: 0 }
    isDragging.value = false
  }
})

// 监听选中状态变化，记录初始鼠标位置
watch(() => props.isSelected, (isSelected) => {
  if (isSelected) {
    initialSelectedPosition.value = {
      x: mouseX.value,
      y: mouseY.value,
    }
  }
})

useEventListener('resize', updateElementInfo)
useEventListener('scroll', updateElementInfo, { capture: true })
</script>

<template>
  <div
    v-if="element"
    ref="panelRef"
    class="uno-inspect-element-info"
    :style="panelPosition"
  >
    <!-- 头部 -->
    <div class="flex justify-between items-center px-2 py-1.5 border-b border-[var(--border-color)] flex-shrink-0 select-none text-xl">
      <div i-catppuccin:unocss class="header-logo" :class="{ draggable: isSelected, dragging: isDragging }" @mousedown="startDrag" />
      <div class="flex items-center gap-2">
        <div i-hugeicons:cursor-magic-selection-02 class="select-btn cursor-pointer opacity-70 transition-all duration-200 hover:opacity-100" :class="{ selecting: !isSelected }" @click.stop="action.start()" />
        <div
          v-show="isSelected" i-hugeicons:cancel-01
          class="cursor-pointer opacity-70 transition-all duration-200 hover:opacity-100 text-base"
          @click.stop="action.stop()"
          @mousedown.stop
        />
      </div>
    </div>

    <!-- 标签页导航 -->
    <div class="flex items-center justify-between px-4 py-2 flex-shrink-0">
      <div class="flex gap-2 items-center">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="tab-dot rounded-full cursor-pointer transition-colors duration-200 flex items-center justify-center hover:text-[#10b98180]"
          :class="{ active: activeTab.id === tab.id }"
          :title="tab.label"
          @click="setActiveTab(tab.id)"
        >
          <component :is="tab.icon" class="text-sm" />
        </button>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="flex-1 overflow-y-auto p-4 relative">
      <Transition :name="`slide-${slideDirection}`" mode="out-in">
        <component :is="activeTab.component" :key="activeTab.id" />
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.uno-inspect-element-info {
  --border-color: rgba(255, 255, 255, 0.1);
  --bg-color: rgba(77, 77, 77, 0.4);

  width: 300px;
  height: auto;
  max-height: 350px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  backdrop-filter: blur(6px);
  display: flex;
  flex-direction: column;
}

@keyframes color-flashing {
  0% {
    color: var(--colors-inspect-margin);
  }
  30% {
    color: var(--colors-inspect-padding);
  }
  50% {
    color: var(--colors-inspect-border);
  }
  80% {
    color: var(--colors-inspect-content);
  }
  100% {
    color: var(--colors-inspect-margin);
  }
}

.select-btn.selecting {
  opacity: 1;
  animation: color-flashing 8s ease-in-out infinite;
}

.header-logo.draggable {
  cursor: move;
}

.header-logo.dragging {
  cursor: grabbing;
}

.tab-dot.active {
  color:#10b981;
}

/* 滑动切换动画 */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease-in-out;
}

/* 向左滑动：新内容从右边进入，旧内容向左边退出 */
.slide-left-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* 向右滑动：新内容从左边进入，旧内容向右边退出 */
.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.slide-left-enter-to,
.slide-left-leave-from,
.slide-right-enter-to,
.slide-right-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
