<script lang='ts' setup>
import { computed, ref, watch } from 'vue'
import { useElement } from '../composables/element'
import Checkbox from './basic/Checkbox.vue'
import CheckboxGroup from './basic/CheckboxGroup.vue'

const { element, updateTrigger } = useElement()

const allClasses = ref<Set<string>>(new Set())

const activeClasses = computed(() => {
  void updateTrigger.value

  if (!element.value) {
    return []
  }

  return Array.from(element.value.classList)
})

watch(
  () => element.value,
  (newElement) => {
    allClasses.value.clear()
    if (newElement) {
      Array.from(newElement.classList).forEach((className) => {
        allClasses.value.add(className)
      })
    }
  },
  { immediate: true },
)

watch(
  activeClasses,
  (newClasses) => {
    newClasses.forEach((className) => {
      allClasses.value.add(className)
    })
  },
  { immediate: true },
)

const displayClasses = computed(() => Array.from(allClasses.value))

const classList = computed({
  get: () => activeClasses.value,
  set: (newList: string[]) => {
    if (!element.value) {
      return
    }
    element.value.className = newList.join(' ')
    updateTrigger.value++
  },
})
</script>

<template>
  <div v-if="displayClasses.length" class="flex flex-wrap gap-2 w-full">
    <CheckboxGroup v-model="classList">
      <Checkbox
        v-for="className in displayClasses"
        :id="`class-${className}`"
        :key="className"
        :model-value="className"
        :label="`.${className}`"
      />
    </CheckboxGroup>
  </div>
  <div v-else class="flex flex-col items-center justify-center h-[200px] text-gray-500">
    <p class="m-0 text-sm">
      This element has no CSS classes
    </p>
  </div>
</template>
