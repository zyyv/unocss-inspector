<script lang='ts' setup>
import { computed, defineModel, defineProps, inject } from 'vue'

const props = defineProps<{
  id?: string
  label?: string
  disabled?: boolean
  modelValue?: string | boolean
}>()

const model = defineModel<boolean | string>()
const realId = props.id || Math.random().toString(36).slice(2, 11)

const checkboxGroup = inject<{
  toggle: (value: string) => void
  isChecked: (value: string) => boolean
  modelValue: { value: string[] }
} | null>('checkboxGroup', null)

const checked = computed(() => {
  if (checkboxGroup && typeof props.modelValue === 'string') {
    return checkboxGroup.isChecked(props.modelValue)
  }
  return Boolean(model.value)
})

function handleToggle() {
  if (checkboxGroup && typeof props.modelValue === 'string') {
    checkboxGroup.toggle(props.modelValue)
  }
  else {
    model.value = !model.value
  }
}
</script>

<template>
  <div inline-flex w-fit flex="items-center gap-0.75" children:cursor-pointer select-none @click="handleToggle">
    <div
      class="inline-flex items-center relative"
      :class="{ 'opacity-50 cursor-not-allowed': disabled }"
    >
      <input
        :id="realId"
        :checked="checked"
        type="checkbox"
        :disabled="disabled"
        class="btn-clear peer size-4 rd-sm"
        style="--webkit-appearance: none; -moz-appearance: none; appearance: none;"
        b="~ solid white/50 checked:sky/50"
        @change="handleToggle"
      >
      <div
        class="pos-center transition-all size-0 rd-2px"
        peer-checked="size-60% bg-sky"
      />
    </div>
    <label v-if="label" :for="realId" class="text-sm whitespace-nowrap">{{ label }}</label>
  </div>
</template>
