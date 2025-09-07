<script lang='ts' setup>
import { onMounted, ref } from 'vue'
import { useElement } from '../../composables/exports'
import FormControl from '../basic/FormControl.vue'
import WH from './WH.vue'

const clip = ref(false)

const { element, styles, updateTrigger } = useElement()

onMounted(() => {
  if (styles.value) {
    if (styles.value.overflow && styles.value.overflow !== 'visible') {
      clip.value = true
    }
  }
})
</script>

<template>
  <div>
    <WH />
    <FormControl
      v-model="clip"
      mt-2
      style="--checked-context: var(--colors-sky-DEFAULT)"
      label="Clip Content"
    />
  </div>
</template>
