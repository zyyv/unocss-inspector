<script lang='ts' setup>
import { computed, inject } from 'vue'

const props = withDefaults(defineProps<{
  id?: string
  label?: string
  disabled?: boolean
  modelValue?: string | boolean
  shape?: 'square' | 'round'
}>(), {
  shape: 'square',
})

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

function handleLabelClick(event: Event) {
  event.preventDefault()
  handleToggle()
}
</script>

<template>
  <div inline-flex w-fit flex="items-center gap-0.75" children:cursor-pointer select-none>
    <div
      class="inline-flex items-center relative"
      :class="{
        'opacity-50 cursor-not-allowed': disabled,
      }"
      @click="handleToggle"
    >
      <input
        :id="realId"
        :checked="checked"
        type="checkbox"
        :disabled="disabled"
        class="btn-clear peer size-4"
        :class="shape === 'square' ? 'rd-sm' : 'rd-full'"
        style="--webkit-appearance: none; -moz-appearance: none; appearance: none;"
        b="~ solid white/50 checked:$checked-context/50"
      >
      <div
        class="pos-center transition-all size-0"
        :class="shape === 'square' ? 'rd-2px' : 'rd-full'"
        peer-checked="size-58% bg-$checked-context"
      />
    </div>
    <label v-if="label" transition-opacity :class="{ 'op-50': !checked }" :for="realId" class="text-3.25 whitespace-nowrap" @click="handleLabelClick">{{ label }}</label>
  </div>
</template>
