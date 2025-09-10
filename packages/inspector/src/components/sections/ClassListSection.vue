<script lang='ts' setup>
import FormControl from '../basic/FormControl.vue'
import FormControlGroup from '../basic/FormControlGroup.vue'

interface Props {
  displayClasses: string[]
  classList: string[]
}

interface Emits {
  (e: 'update:classList', value: string[]): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <div
    v-if="displayClasses.length" p="x4 y2"
    class="flex flex-wrap gap-1"
    style="--context-color: var(--colors-sky-DEFAULT)"
  >
    <h5 m0>
      Class List
    </h5>
    <FormControlGroup
      :model-value="classList"
      type="checkbox"
      @update:model-value="$emit('update:classList', ($event as string[]) || [])"
    >
      <FormControl
        v-for="className in displayClasses"
        :id="`class-${className}`"
        :key="className"
        :model-value="className"
        :label="`.${className}`"
        type="checkbox"
      />
    </FormControlGroup>
  </div>
</template>
