<script lang='ts' setup>
import { useAttributes } from '../composables/attributes'
import { useClassList } from '../composables/classList'
import AttributesSection from './sections/AttributesSection.vue'
import ClassListSection from './sections/ClassListSection.vue'

const { displayClasses, classList } = useClassList()
const { attributes, updateAttribute } = useAttributes()
</script>

<template>
  <div>
    <ClassListSection
      :display-classes="displayClasses"
      :class-list="classList"
      @update:class-list="(newList) => classList = newList"
    />

    <div divided />

    <AttributesSection
      :attributes="attributes"
      @update-attribute="updateAttribute"
    />
  </div>
</template>
