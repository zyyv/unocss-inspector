<script lang='ts' setup>
import { computed, ref, watch } from 'vue'
import { useElement } from '../composables/element'

const { element, updateTrigger } = useElement()

const textContent = ref('')

const elementTextContent = computed(() => {
  void updateTrigger.value

  if (!element.value) {
    return ''
  }

  return element.value.textContent || ''
})

watch(elementTextContent, (newContent) => {
  textContent.value = newContent
}, { immediate: true })

function updateElementContent() {
  if (element.value) {
    element.value.textContent = textContent.value
    updateTrigger.value++
  }
}

function resetContent() {
  textContent.value = elementTextContent.value
}
</script>

<template>
  <div
    v-if="elementTextContent"
    class="p-3 no-scrollbar"
  >
    <h5 m0 mb-2 flex="~ items-center justify-between">
      <div flex="~ items-center gap-1">
        <div i-hugeicons:quill-write-01 />
        <span>Plain Text Content</span>
      </div>

      <div flex="~ items-center gap-2">
        <div
          i-hugeicons:refresh title="Reset Content"
          text-sm op-64
          hover="op-100 text-orange"
          cursor-pointer @click="resetContent"
        />
        <div
          i-hugeicons:task-done-02 title="Save Changes"
          text-base op-64
          hover="op-100 text-purple"
          cursor-pointer @click="updateElementContent"
        />
      </div>
    </h5>

    <textarea
      v-model="textContent"
      class="btn-clear min-h-20 h-30 max-h-60 w-full resize-y box-border p-2"
      border="~ white/10 solid" rd-md
      text="xs white/72"
      placeholder="Enter text content..."
    />
  </div>
</template>
