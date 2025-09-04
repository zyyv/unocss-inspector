<script lang='ts' setup>
import { computed, ref, watch } from 'vue'
import { useElement } from '../composables/element'

const { element, updateTrigger } = useElement()

const textContent = ref('')
const isEditing = ref(false)

// 获取元素的文本内容
const elementTextContent = computed(() => {
  void updateTrigger.value

  if (!element.value) {
    return ''
  }

  return element.value.textContent || ''
})

// 监听元素变化，更新文本内容
watch(elementTextContent, (newContent) => {
  if (!isEditing.value) {
    textContent.value = newContent
  }
}, { immediate: true })

// 更新元素内容
function updateElementContent() {
  if (element.value) {
    element.value.textContent = textContent.value
    updateTrigger.value++
  }
  isEditing.value = false
}

// 取消编辑
function cancelEdit() {
  textContent.value = elementTextContent.value
  isEditing.value = false
}

// 开始编辑
function startEdit() {
  isEditing.value = true
}

// 处理键盘事件
function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' && event.ctrlKey) {
    updateElementContent()
  }
  else if (event.key === 'Escape') {
    cancelEdit()
  }
}
</script>

<template>
  <div v-if="elementTextContent || isEditing" class="bg-slate-50 p-3 rounded-md text-xs leading-6 text-gray-700 max-h-[260px] no-scrollbar flex-1">
    <div class="flex items-center justify-between mb-2">
      <span class="text-xs font-medium text-gray-600">Text Content</span>
      <div class="flex gap-1">
        <button
          v-if="!isEditing"
          class="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          @click="startEdit"
        >
          Edit
        </button>
        <button
          v-if="isEditing"
          class="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          @click="updateElementContent"
        >
          Save
        </button>
        <button
          v-if="isEditing"
          class="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          @click="cancelEdit"
        >
          Cancel
        </button>
      </div>
    </div>

    <textarea
      v-if="isEditing"
      v-model="textContent"
      class="w-full h-32 p-2 text-xs border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="Enter text content..."
      @keydown="handleKeydown"
    />

    <div
      v-else
      class="min-h-[100px] p-2 bg-white rounded border border-gray-200 overflow-y-auto whitespace-pre-wrap"
    >
      {{ elementTextContent || 'No text content' }}
    </div>

    <div v-if="isEditing" class="mt-2 text-xs text-gray-500">
      Press Ctrl+Enter to save, Esc to cancel
    </div>
  </div>
  <div v-else class="flex flex-col items-center justify-center h-[200px] text-gray-500">
    <p class="m-0 text-sm">
      This element has no text content
    </p>
    <button
      class="mt-2 px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      @click="startEdit"
    >
      Add Text
    </button>
  </div>
</template>
