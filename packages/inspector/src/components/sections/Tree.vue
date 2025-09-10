<script lang='ts' setup>
import { getElementColor } from '../../utils'

interface Props {
  elements?: Element[]
  depth?: number
  elFilter?: (el: Element) => boolean
}

const props = withDefaults(defineProps<Props>(), {
  elements: undefined,
  depth: 0,
  elFilter: undefined,
})

function getChildElements(element: Element): Element[] {
  return Array.from(element.children).filter(el => !props.elFilter || !props.elFilter(el))
}
</script>

<template>
  <div>
    <template v-for="child in elements" :key="child">
      <div :style="{ paddingLeft: `${props.depth * 2}px` }" class="">
        <div class="flex items-center gap-1 w-full hover:bg-white/10 p-1 group rounded-2px">
          <div v-if="getChildElements(child).length > 0" i-hugeicons:arrow-down-01 text-xs />
          <div class="flex-1 of-hidden whitespace-nowrap text-xs cursor-pointer select-none">
            <span :class="getElementColor(child.tagName.toLowerCase())">
              {{ child.tagName.toLowerCase() }}
            </span>
            <span v-if="child.id" class="text-yellow-400 op-72 text-2.75 ml-1">#{{ child.id }}</span>
            <span class="group-hover:op-100 op-0">
              <template v-for="cls in Array.from(child.classList)" :key="cls">
                <span class="text-green-400 op-72 text-2.75 ml-1">.{{ cls }}</span>
              </template>
            </span>
          </div>
        </div>

        <Tree
          v-if="getChildElements(child).length > 0"
          :elements="getChildElements(child)"
          :depth="props.depth + 1"
        />
      </div>
    </template>
  </div>
</template>
