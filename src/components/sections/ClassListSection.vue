<script lang='ts' setup>
import Checkbox from '../basic/Checkbox.vue'
import CheckboxGroup from '../basic/CheckboxGroup.vue'

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
    style="--checked-context: var(--colors-sky-DEFAULT)"
  >
    <h5 m0>
      Class List
    </h5>
    <CheckboxGroup
      :model-value="classList"
      @update:model-value="$emit('update:classList', $event)"
    >
      <Checkbox
        v-for="className in displayClasses"
        :id="`class-${className}`"
        :key="className"
        :model-value="className"
        :label="`.${className}`"
      />
    </CheckboxGroup>
  </div>
</template>
