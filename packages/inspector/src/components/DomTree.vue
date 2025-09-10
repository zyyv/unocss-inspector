<script lang='ts' setup>
import { onMounted, ref } from 'vue'
import Tree from './sections/Tree.vue'

const rootElements = ref<Element[]>([])

function shouldFilterElement(el: Element): boolean {
  if (el.tagName.toLowerCase() === 'script' || el.tagName.toLowerCase() === 'style') {
    return true
  }
  if (Array.from(el.classList).some(cls => cls.startsWith('uno-inspect'))) {
    return true
  }
  return false
}

onMounted(() => {
  rootElements.value = Array.from(document.body.children).filter(el => !shouldFilterElement(el))
})
</script>

<template>
  <div p-2 h-60>
    <Tree :elements="rootElements" />
  </div>
</template>
