<script lang='ts' setup>
import { ref } from 'vue'
import Select from '../basic/Select.vue'
import { flexRowList } from './helper'
import WH from './WH.vue'

defineProps<{
  wrap: boolean
}>()

const dot = 'bg-white/50 size-1.3 rd-full'

const gapList = [
  { value: 'auto', label: 'Auto' },
  { value: '0', label: '0' },
  { value: '0.5', label: '0.5' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '6', label: '6' },
  { value: '8', label: '8' },
  { value: '12', label: '12' },
  { value: '24', label: '24' },
]
const selectedGap = ref('auto')
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
          v-for="item in flexRowList" :key="item.label"
          :title="item.label"
          class="group relative flex justify-center items-center cursor-pointer"
        >
          <div :class="item.icon" class="op-0 transition-opacity group-hover:op-100" />
          <div class="bg-white/50 size-1.3 rd-full op-100 transition-opacity group-hover:op-0 pos-center" />
        </div>
      </div>
      <div flex="1 ~ col gap-2">
        <Select v-model="selectedGap" placeholder="Gap" :options="gapList">
          <template #prefix>
            <div i-hugeicons:paragraph-spacing rotate-90 />
          </template>
        </Select>
        <Select v-if="wrap" v-model="selectedGap" placeholder="Gap" :options="gapList">
          <template #prefix>
            <div i-hugeicons:paragraph-spacing />
          </template>
        </Select>
      </div>
    </div>
  </div>
</template>
