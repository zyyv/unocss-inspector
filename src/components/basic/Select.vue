<script lang='ts' setup>
import { useEventListener } from '@vueuse/core'
import { computed, ref } from 'vue'

interface Option {
  value: string | number
  label: string
  icon?: string
}

interface Props {
  options?: Option[]
  placeholder?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  placeholder: '请选择...',
  disabled: false,
})

const modelValue = defineModel<string | number>({ default: '' })

const isOpen = ref(false)
const selectRef = ref<HTMLElement>()

const selectedOption = computed(() => {
  return props.options.find(option => option.value === modelValue.value)
})

function toggleDropdown() {
  if (props.disabled)
    return
  isOpen.value = !isOpen.value
}

function selectOption(option: Option) {
  if (props.disabled)
    return
  modelValue.value = option.value
  isOpen.value = false
}

function handleClickOutside(event: Event) {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

useEventListener('click', handleClickOutside)
</script>

<template>
  <div
    ref="selectRef"
    :class="{ 'is-disabled': disabled, 'is-open': isOpen }"
    relative
    w-full
  >
    <div
      class="select-trigger"
      text="white/80 xs"
      p="x2 y1.5"
      cursor-pointer
      flex="~ justify-between items-center"
      b="~ solid white/10 hover:dashed"
      rd-md
      transition-all
      duration-200
      hover:text-white
      @click="toggleDropdown"
    >
      <div flex items-center gap-1>
        <span v-if="selectedOption?.icon" :class="selectedOption.icon" />
        <span>{{ selectedOption?.label || placeholder }}</span>
      </div>
      <div
        class="select-arrow"
        :class="{ 'rotate-180': isOpen }"
        i-hugeicons:arrow-down-01
        transition-transform
        duration-200
      />
    </div>

    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-[-8px] scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-[-8px] scale-95"
    >
      <div
        v-if="isOpen"
        absolute
        top-full
        left-0
        right-0
        z-20
        mt-1
        backdrop-blur-md
        class="bg-white/5 rd-md of-hidden!"
        border="~ solid white/5 1px"
      >
        <div
          v-for="option in options"
          :key="option.value"
          :class="{
            'is-selected': option.value === modelValue,
            'is-disabled': disabled,
          }"
          p="x2 y1.5"
          cursor-pointer
          flex="~ items-center gap-1.5"
          text="white op-80 2.75"
          transition-all duration-150
          hover="bg-white/5 text-op-100"
          @click="selectOption(option)"
        >
          <span v-if="option.icon" :class="option.icon" />
          <span>{{ option.label }}</span>
          <div
            v-if="option.value === modelValue"
            i-hugeicons:tick-01
            ml-auto
            text="3.25"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>
