<script lang='ts' setup>
import { useEventListener, useMouse, useToggle, useWindowSize } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { useTabs } from './composables/tabs'
import IconClose from './icons/Close.vue'
import IconCursor from './icons/SmartCursor.vue'
import IconUnoCSS from './icons/UnoCSS.vue'

interface Props {
  element: HTMLElement | null
  isSelected: boolean
  action: {
    start: () => void
    stop: () => void
  }
}

const props = defineProps<Props>()

const { width: windowWidth, height: windowHeight } = useWindowSize()
const { x: mouseX, y: mouseY } = useMouse()

const panelRef = ref<HTMLElement>()

// 拖动相关状态
const [isDragging, _toggleDragging] = useToggle(false)
const dragOffset = ref({ x: 0, y: 0 })
const dragPosition = ref({ x: 0, y: 0 })
const finalPosition = ref({ x: 0, y: 0 })
const initialSelectedPosition = ref({ x: 0, y: 0 }) // 记录选中时的鼠标位置

// 用于强制更新元素信息的触发器
const updateTrigger = ref(0)

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
watch(() => props.element, () => {
  if (props.element) {
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
    v-if="props.element"
    ref="panelRef"
    class="uno-inspect-element-info"
    :style="panelPosition"
  >
    <!-- 头部 -->
    <div class="header">
      <IconUnoCSS class="header-logo" :class="{ draggable: isSelected, dragging: isDragging }" @mousedown="startDrag" />

      <div class="header-right">
        <IconCursor class="select-btn" :class="{ selecting: !isSelected }" @click.stop="action.start()" />
        <IconClose
          v-show="isSelected"
          class="close-btn"
          @click.stop="action.stop()"
          @mousedown.stop
        />
      </div>
    </div>

    <!-- 标签页导航 -->
    <div class="tab-navigation">
      <div class="tab-dots">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="tab-dot"
          :class="{ active: activeTab.id === tab.id }"
          :title="tab.label"
          @click="setActiveTab(tab.id)"
        >
          <component :is="tab.icon" class="tab-icon" />
        </button>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content">
      <Transition :name="`slide-${slideDirection}`" mode="out-in">
        <component :is="activeTab.component" :key="activeTab.id" :el="props.element" :update-trigger="updateTrigger" />
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

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 8px;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
  user-select: none;
  font-size: 20px;
}

@keyframes color-flashing {
  /* --margin-bg-color: oklch(82% 0.15 60 / 0.25);
  --padding-bg-color: oklch(75% 0.12 240 / 0.3);
  --content-bg-color: oklch(78% 0.14 140 / 0.25);
  --border-bg-color: oklch(80% 0.18 20 / 0.3); */

  0% {
    color: oklch(82% 0.15 60);
  }
  30% {
    color: oklch(75% 0.12 240);
  }
  50% {
    color: oklch(80% 0.18 20);
  }
  80% {
    color: oklch(78% 0.14 140);
  }
  100% {
    color: oklch(82% 0.15 60);
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: 8px;

  > * {
    cursor: pointer;
    opacity: 0.7;
    transition: all 0.2s;

    &:hover {
      opacity: 1;
    }
  }

  .select-btn {
    &.selecting{
      opacity: 1;
      animation: color-flashing 8s ease-in-out infinite;
    }
  }

  .close-btn {
    font-size: 24px;
    padding: 4px;
  }

}

.header-logo.draggable {
  cursor: move;
}

.header-logo.dragging {
  cursor: grabbing;
}

.title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tag {
  font-family: 'SF Mono', Monaco, monospace;
  font-size: 12px;
  font-weight: 600;
  color: #dc2626;
  background: #fef2f2;
  padding: 2px 6px;
  border-radius: 4px;
}

.id {
  font-family: 'SF Mono', Monaco, monospace;
  font-size: 14px;
  font-weight: 600;
  color: #2563eb;
  background: #eff6ff;
  padding: 2px 6px;
  border-radius: 4px;
}

.tab-navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  /* background: #f8fafc; */
  /* border-bottom: 1px solid #e5e7eb; */
  flex-shrink: 0;
}

.tab-nav-btn {
  background: none;
  border: none;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  color: #6b7280;
  transition: all 0.2s;
  min-width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-nav-btn:hover {
  background: #e5e7eb;
  color: #374151;
}

.tab-dots {
  display: flex;
  gap: 8px;
  align-items: center;
}

.tab-dot {
  border-radius: 50%;
  cursor: pointer;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-dot:hover {
  color:#10b98180;
}

.tab-dot.active {
  /* background: #3b82f6; */
  /* color: white; */
  color:#10b981;
}

.tab-icon {
  font-size: 14px;
}

.content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  position: relative;
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

.section {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.section h3 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex-shrink: 0;
}
</style>
