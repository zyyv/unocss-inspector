<script lang='ts' setup>
import { computed, ref, watch } from 'vue'
import { useClassList } from '../../composables/classList'
import Select from '../basic/Select.vue'
import { flexColList, gapList } from './helper'
import WH from './WH.vue'

const { classList } = useClassList()

const activeFlexAlignment = ref<string | null>(null)
const selectedGap = ref('auto')

const computedActiveFlexAlignment = computed(() => {
  const currentClasses = classList.value
  for (const item of flexColList) {
    const classes = item.class.split(' ')
    if (classes.every(cls => currentClasses.includes(cls))) {
      return item.id
    }
  }
  return null
})

const computedGap = computed(() => {
  const currentClasses = classList.value
  const gapClass = currentClasses.find(cls => cls.startsWith('gap-') && !cls.startsWith('gap-x-') && !cls.startsWith('gap-y-'))
  if (gapClass) {
    return gapClass.replace('gap-', '')
  }
  return 'auto'
})

watch(computedActiveFlexAlignment, (val) => {
  activeFlexAlignment.value = val
}, { immediate: true })

watch(computedGap, (val) => {
  selectedGap.value = val
}, { immediate: true })

function setFlexAlignment(item: typeof flexColList[0]) {
  const currentClasses = classList.value.filter((cls) => {
    // 移除旧的 justify 和 items 类
    return !cls.startsWith('justify-') && !cls.startsWith('items-')
  })

  const newClasses = item.class.split(' ')
  classList.value = [...currentClasses, ...newClasses]
  activeFlexAlignment.value = item.id
}

function setGap(value: string | number) {
  const stringValue = String(value)

  const currentClasses = classList.value.filter((cls) => {
    return !cls.startsWith('gap-')
  })

  classList.value = [...currentClasses, `gap-${stringValue}`]
}
</script>

<template>
  <div class="space-y-2">
    <WH />
    <div flex="~ gap-2">
      <div
        flex-1
        class="b b-solid b-white/10 grid grid-cols-3 grid-gap-0.5 rd-md p-1 text-xs h-17"
      >
        <div
          v-for="item in flexColList" :key="item.label"
          :title="item.label"
          class="group relative flex justify-center items-center cursor-pointer"
          @click="setFlexAlignment(item)"
        >
          <div
            :class="[item.icon, activeFlexAlignment === item.id ? 'text-blue-500 op-100' : '']"
            class="op-0 transition-opacity group-hover:op-100"
          />
          <div
            :class="activeFlexAlignment === item.id ? 'op-0!' : ''"
            class="bg-white/50 size-1.3 rd-full op-100 transition-opacity group-hover:op-0 pos-center"
          />
        </div>
      </div>
      <div flex="1 ~ col gap-2">
        <Select v-model="selectedGap" placeholder="Gap" :options="gapList" inputable @update:model-value="setGap">
          <template #prefix>
            <div i-hugeicons:paragraph-spacing />
          </template>
        </Select>
      </div>
    </div>
  </div>
</template>
