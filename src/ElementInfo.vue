<script lang='ts' setup>
import type { VNode } from 'vue'
import { useEventListener, useMouse, useToggle, useWindowSize } from '@vueuse/core'
import { computed, ref, watch } from 'vue'

import BasicInfo from './components/BasicInfo.vue'
import BoxModel from './components/BoxModel.vue'
import ClassList from './components/ClassList.vue'
import StylesInfo from './components/StylesInfo.vue'
import TextContent from './components/TextContent.vue'

import IconBasic from './icons/Basic.vue'
import IconBox from './icons/Box.vue'
import IconClass from './icons/Class.vue'
import IconClose from './icons/Close.vue'
import IconCursor from './icons/SmartCursor.vue'
import IconStyle from './icons/Style.vue'
import IconText from './icons/Text.vue'
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

const activeTab = ref(0)
const panelRef = ref<HTMLElement>()

// 拖动相关状态
const [isDragging, _toggleDragging] = useToggle(false)
const dragOffset = ref({ x: 0, y: 0 })
const dragPosition = ref({ x: 0, y: 0 })
const finalPosition = ref({ x: 0, y: 0 })

// 用于强制更新元素信息的触发器
const updateTrigger = ref(0)

const tabs = [
  { id: 'basic', label: 'Basic Info', icon: IconBasic },
  { id: 'classes', label: 'Class', icon: IconClass },
  { id: 'box', label: 'Box Model', icon: IconBox },
  { id: 'styles', label: 'Styles', icon: IconStyle },
  { id: 'text', label: 'Text', icon: IconText },
]

const elementInfo = computed(() => {
  void updateTrigger.value

  if (!props.element) {
    return null
  }

  const element = props.element
  const computedStyle = window.getComputedStyle(element)
  const rect = element.getBoundingClientRect()

  // 获取所有 class 列表
  const classList = Array.from(element.classList)

  // 获取所有属性
  const attributes = Array.from(element.attributes).map(attr => ({
    name: attr.name,
    value: attr.value,
  }))

  // 获取盒模型信息
  const boxModel = {
    margin: {
      top: Number.parseFloat(computedStyle.marginTop),
      right: Number.parseFloat(computedStyle.marginRight),
      bottom: Number.parseFloat(computedStyle.marginBottom),
      left: Number.parseFloat(computedStyle.marginLeft),
    },
    border: {
      top: Number.parseFloat(computedStyle.borderTopWidth),
      right: Number.parseFloat(computedStyle.borderRightWidth),
      bottom: Number.parseFloat(computedStyle.borderBottomWidth),
      left: Number.parseFloat(computedStyle.borderLeftWidth),
    },
    padding: {
      top: Number.parseFloat(computedStyle.paddingTop),
      right: Number.parseFloat(computedStyle.paddingRight),
      bottom: Number.parseFloat(computedStyle.paddingBottom),
      left: Number.parseFloat(computedStyle.paddingLeft),
    },
    size: {
      width: rect.width,
      height: rect.height,
    },
  }

  // 获取行内样式
  const inlineStyles: Record<string, string> = {}
  if (element.style.length > 0) {
    const vnode = (element as any).__vnode as VNode | undefined
    if (vnode) {
      for (const [key, value] of Object.entries(vnode.props?.style || {})) {
        inlineStyles[key] = value as string
      }
    }
    else {
      for (let i = 0; i < element.style.length; i++) {
        const property = element.style.item(i)
        inlineStyles[property] = element.style.getPropertyValue(property)
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
    tagName: element.tagName.toLowerCase(),
    id: element.id,
    classList,
    attributes,
    textContent: element.textContent?.trim().slice(0, 100) || '',
    boxModel,
    styles: {
      inline: inlineStyles,
      computed: importantStyles,
    },
    rect: {
      x: Math.round(rect.x),
      y: Math.round(rect.y),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    },
  }
})

const panelPosition = computed(() => {
  if (props.isSelected) {
    // 选中状态：使用拖动后的最终位置，如果正在拖动则使用当前拖动位置
    let baseX, baseY

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
      // 默认位置：右上角
      baseX = windowWidth.value - 300 - 20 // 使用实际的面板宽度
      baseY = 20
    }

    return {
      position: 'fixed' as const,
      top: `${baseY}px`,
      left: `${baseX}px`,
      zIndex: '10001',
    }
  }
  // 跟随鼠标状态：跟随鼠标移动，但避免超出视口
  const offsetX = 20
  const offsetY = 20
  const panelWidth = 300 // 与 CSS 中的实际宽度一致
  const panelHeight = panelRef.value?.offsetHeight || 350 // 使用真实DOM高度，fallback到max-height

  let left = mouseX.value + offsetX
  let top = mouseY.value + offsetY

  // 避免超出右边界
  if (left + panelWidth > windowWidth.value) {
    left = mouseX.value - panelWidth - offsetX
  }

  // 避免超出下边界
  if (top + panelHeight > windowHeight.value) {
    top = mouseY.value - panelHeight - offsetY
  }

  // 避免超出左边界
  if (left < 10) {
    left = 10
  }

  // 避免超出上边界
  if (top < 10) {
    top = 10
  }

  return {
    position: 'fixed' as const,
    left: `${left}px`,
    top: `${top}px`,
    zIndex: '10001',
  }
})

function updateElementInfo() {
  updateTrigger.value++
}

function setActiveTab(index: number) {
  activeTab.value = index
}

// 拖动相关函数
function startDrag(event: MouseEvent) {
  if (!props.isSelected)
    return

  isDragging.value = true
  const rect = (event.currentTarget as HTMLElement).closest('.uno-inspect-element-info')?.getBoundingClientRect()

  if (rect) {
    dragOffset.value = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }

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

useEventListener('resize', updateElementInfo)
useEventListener('scroll', updateElementInfo, { capture: true })
</script>

<template>
  <div
    v-if="elementInfo"
    ref="panelRef"
    class="uno-inspect-element-info"
    :style="panelPosition"
  >
    <!-- 头部 -->
    <div class="header">
      <IconUnoCSS class="header-logo" :class="{ draggable: isSelected, dragging: isDragging }" @mousedown="startDrag" />

      <div class="header-right">
        <IconCursor class="select-btn" @click.stop="action.start()" />
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
          v-for="(tab, index) in tabs"
          :key="tab.id"
          class="tab-dot"
          :class="{ active: activeTab === index }"
          :title="tab.label"
          @click="setActiveTab(index)"
        >
          <component :is="tab.icon" class="tab-icon" />
        </button>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content">
      <!-- 基本信息 -->
      <section v-if="activeTab === 0" class="section">
        <BasicInfo :basic-info="{ tagName: elementInfo.tagName, id: elementInfo.id, rect: elementInfo.rect }" />
      </section>

      <!-- Class 列表 -->
      <section v-if="activeTab === 1" class="section">
        <ClassList :class-list="elementInfo.classList" />
      </section>

      <!-- 盒模型 -->
      <section v-if="activeTab === 2" class="section">
        <BoxModel :box-model="elementInfo.boxModel" />
      </section>

      <!-- 重要样式 -->
      <section v-if="activeTab === 3" class="section">
        <StylesInfo :styles="elementInfo.styles" />
      </section>

      <!-- 文本内容 -->
      <section v-if="activeTab === 4" class="section">
        <TextContent :text-content="elementInfo.textContent" />
      </section>
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

@keyframes color-shadow {
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
      animation: color-shadow 5s infinite;
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
