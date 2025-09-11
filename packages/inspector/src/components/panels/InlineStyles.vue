<script lang='ts' setup>
import type { VNode } from 'vue'
import { computed } from 'vue'
import { useElement } from '../../composables/exports/element'
import PanelTitle from '../sections/PanelTitle.vue'

const { element, tracking } = useElement()

const stylesInfo = computed(() => {
  tracking()

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
  <div p-3>
    <PanelTitle title="Styles" icon="i-hugeicons:drawing-mode" />
    <div v-if="stylesInfo" class="flex flex-col gap-4 max-h-[280px] overflow-y-auto flex-1">
      <!-- 行内样式 -->
      <div v-if="Object.keys(stylesInfo.inline).length > 0" class="flex flex-col gap-2">
        <div class="grid gap-1.5">
          <div
            v-for="(value, key) in stylesInfo.inline"
            :key="`inline-${key}`"
            class="flex px-2.5 py-1.5 text-xs bg-amber-100 rounded border-l-3 border-amber-500"
          >
            <span class="text-amber-800 font-medium min-w-[100px] font-mono">{{ key }}:</span>
            <span class="text-gray-700 font-mono break-all ml-2">{{ value }}</span>
          </div>
        </div>
      </div>

      <!-- 计算样式 -->
      <div class="flex flex-col gap-2">
        <div class="grid gap-1.5">
          <div
            v-for="(value, key) in stylesInfo.computed"
            :key="`computed-${key}`"
            class="flex px-2.5 py-1.5 text-xs bg-slate-50 rounded"
          >
            <span class="text-purple-700 font-medium min-w-[100px] font-mono">{{ key }}:</span>
            <span class="text-gray-700 font-mono break-all ml-2">{{ value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
