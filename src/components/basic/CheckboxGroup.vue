<script lang='ts' setup>
import { computed, provide } from 'vue'

const model = defineModel<string[]>({ default: () => [] })

// 提供给子组件的方法
function toggle(value: string) {
  const index = model.value.indexOf(value)
  if (index === -1) {
    model.value = [...model.value, value]
  }
  else {
    model.value = model.value.filter(item => item !== value)
  }
}

function isChecked(value: string) {
  return model.value.includes(value)
}

// 向子组件提供上下文
provide('checkboxGroup', {
  toggle,
  isChecked,
  modelValue: computed(() => model.value),
})
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <slot />
  </div>
</template>
