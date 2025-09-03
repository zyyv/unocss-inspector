<script lang='ts' setup>
import { computed } from 'vue'
import { useElement } from '../composables/element'

const { element, updateTrigger } = useElement()

const boxModel = computed(() => {
  void updateTrigger.value

  if (!element.value) {
    return null
  }

  const el = element.value
  const computedStyle = window.getComputedStyle(el)
  const rect = el.getBoundingClientRect()

  return {
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
})

function formatBoxValue(value: number): string {
  return value === 0 ? '0' : `${value}px`
}
</script>

<template>
  <div v-if="boxModel" class="font-mono text-xs flex-1 flex items-center justify-center">
    <div class="border border-[var(--margin-bg-color)] bg-[var(--margin-bg-color)] p-5 relative text-center">
      <div class="absolute -top-px left-1 bg-gray-600 text-white px-1 font-semibold text-[9px] uppercase rounded-sm">
        margin
      </div>
      <div class="absolute top-0 left-0 w-full h-full text-[8px] opacity-80 pointer-events-none">
        <span class="absolute top-0 left-1/2 -translate-x-1/2 translate-y-0 px-1 rounded-sm text-gray-600 bg-white/80">{{ formatBoxValue(boxModel.margin.top) }}</span>
        <span class="absolute top-1/2 right-0 -translate-y-1/2 translate-x-0 px-1 rounded-sm text-gray-600 bg-white/80">{{ formatBoxValue(boxModel.margin.right) }}</span>
        <span class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-0 px-1 rounded-sm text-gray-600 bg-white/80">{{ formatBoxValue(boxModel.margin.bottom) }}</span>
        <span class="absolute top-1/2 left-0 -translate-y-1/2 translate-x-0 px-1 rounded-sm text-gray-600 bg-white/80">{{ formatBoxValue(boxModel.margin.left) }}</span>
      </div>

      <div class="border border-[var(--border-bg-color)] bg-[var(--border-bg-color)] p-5 relative text-center">
        <div class="absolute -top-px left-1 bg-gray-600 text-white px-1 font-semibold text-[9px] uppercase rounded-sm">
          border
        </div>
        <div class="absolute top-0 left-0 w-full h-full text-[8px] opacity-80 pointer-events-none">
          <span class="absolute top-0 left-1/2 -translate-x-1/2 translate-y-0 px-1 rounded-sm text-gray-600 bg-white/80">{{ formatBoxValue(boxModel.border.top) }}</span>
          <span class="absolute top-1/2 right-0 -translate-y-1/2 translate-x-0 px-1 rounded-sm text-gray-600 bg-white/80">{{ formatBoxValue(boxModel.border.right) }}</span>
          <span class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-0 px-1 rounded-sm text-gray-600 bg-white/80">{{ formatBoxValue(boxModel.border.bottom) }}</span>
          <span class="absolute top-1/2 left-0 -translate-y-1/2 translate-x-0 px-1 rounded-sm text-gray-600 bg-white/80">{{ formatBoxValue(boxModel.border.left) }}</span>
        </div>

        <div class="border border-[var(--padding-bg-color)] bg-[var(--padding-bg-color)] p-5 relative text-center">
          <div class="absolute -top-px left-1 bg-gray-600 text-white px-1 font-semibold text-[9px] uppercase rounded-sm">
            padding
          </div>
          <div class="absolute top-0 left-0 w-full h-full text-[8px] opacity-80 pointer-events-none">
            <span class="absolute top-0 left-1/2 -translate-x-1/2 translate-y-0 px-1 rounded-sm text-gray-600 bg-white/80">{{ formatBoxValue(boxModel.padding.top) }}</span>
            <span class="absolute top-1/2 right-0 -translate-y-1/2 translate-x-0 px-1 rounded-sm text-gray-600 bg-white/80">{{ formatBoxValue(boxModel.padding.right) }}</span>
            <span class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-0 px-1 rounded-sm text-gray-600 bg-white/80">{{ formatBoxValue(boxModel.padding.bottom) }}</span>
            <span class="absolute top-1/2 left-0 -translate-y-1/2 translate-x-0 px-1 rounded-sm text-gray-600 bg-white/80">{{ formatBoxValue(boxModel.padding.left) }}</span>
          </div>

          <div class="border border-[var(--content-bg-color)] bg-[var(--content-bg-color)] min-h-10 flex items-center justify-center">
            <div class="absolute -top-px left-1 bg-gray-600 text-white px-1 font-semibold text-[9px] uppercase rounded-sm">
              content
            </div>
            <div class="font-semibold text-blue-800 text-xs">
              {{ Math.round(boxModel.size.width) }} × {{ Math.round(boxModel.size.height) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
