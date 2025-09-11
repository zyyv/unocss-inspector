<script lang='ts' setup>
import { computed } from 'vue'
import { useElement } from '../../../composables/exports'
import FormControl from '../../basic/FormControl.vue'
import WH from './WH.vue'

const { element, tracking, setElementStyle } = useElement()
const clip = computed({
  get: () => {
    if (element.value) {
      tracking()
      const computedStyle = window.getComputedStyle(element.value)
      return computedStyle.overflow && computedStyle.overflow !== 'visible'
    }
    return false
  },
  set: (value: boolean) => {
    if (element.value) {
      setElementStyle({ overflow: value ? 'hidden' : 'visible' })
    }
  },
})
</script>

<template>
  <div>
    <WH />
    <FormControl
      v-model="clip"
      mt-2
      style="--context-color: var(--colors-sky-DEFAULT)"
      label="Clip Content"
    />
  </div>
</template>
