<script lang='ts' setup>
import { onMounted, ref } from 'vue'
import Tree from './sections/Tree.vue'

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

onMounted(() => {
  rootElements.value = Array.from(document.body.children).filter(el => !shouldFilterElement(el))
})
</script>

<template>
  <div p-2 h-60 of-y-auto no-scrollbar>
    <Tree :elements="rootElements" />
  </div>
</template>
