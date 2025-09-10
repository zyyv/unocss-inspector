<script lang='ts' setup>
import { useDebounceFn } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { useElement } from '../composables/exports'
import Tree from './sections/Tree.vue'

const { element } = useElement()

const rootElements = ref<Element[]>([])

function shouldFilterElement(el: Element): boolean {
  if (
    ['style', 'script', 'link', 'meta', 'title', 'noscript', 'template'].includes(el.tagName.toLowerCase())
    || Array.from(el.classList).some(cls => cls.startsWith('uno-inspect'))
    || getComputedStyle(el).pointerEvents === 'none'
  ) {
    return true
  }

  return false
}

const latestSelected = ref<Element | null>(element.value)
const debouncedHover = useDebounceFn((el: Element | null) => {
  if (el) {
    element.value = el as HTMLElement
  }
  else {
    element.value = latestSelected.value as any
  }
}, 250)

function handleSelected(el: Element) {
  latestSelected.value = el
  element.value = el as HTMLElement
}

onMounted(() => {
  rootElements.value = Array.from(document.body.children).filter(el => !shouldFilterElement(el))
})
</script>

<template>
  <div p-2 h-60 of-y-auto no-scrollbar>
    <Tree
      :elements="rootElements"
      :checked-element="latestSelected"
      :on-hover="debouncedHover"
      @change="handleSelected"
    />
  </div>
</template>
