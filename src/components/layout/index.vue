<script lang='ts' setup>
import { useToggle } from '@vueuse/core'
import { ref } from 'vue'
import WH from './WH.vue'
// import { useElement } from '../../composables/exports/element'

// const { element, updateTrigger } = useElement()

const list = ref([
  { id: 'freedom', icon: 'i-custom:freedom?mask' },
  { id: 'horizontal', icon: 'i-custom:horizontal?mask' },
  { id: 'vertical', icon: 'i-custom:vertical?mask' },
  { id: 'grid', icon: 'i-hugeicons:dashboard-square-03?mask' },
])

const selected = ref(list.value[0])

function handleSelect(item: any) {
  selected.value = item
}

const [openWrap, toggleWrap] = useToggle(false)
</script>

<template>
  <section p-2>
    <h5 m0 mb-2 flex="~ items-center justify-between">
      <div flex="~ items-center gap-1">
        <div i-hugeicons:dashboard-square-02 />
        <span>Auto Layout</span>
      </div>
      <div flex="~ items-center gap-1">
        <div
          v-if="selected.id === 'horizontal'"
          title="Wrap text"
          i-hugeicons:text-wrap
          op-50 hover:op-100 cursor-pointer :class="{ 'text-purple op-100!': openWrap }"
          @click="toggleWrap()"
        />
      </div>
    </h5>
    <div
      flex="~ items-center gap-2"
      bg="white/10"
      rd-sm p-0.5 mb-2
      un-children="py-0.75 flex-1 flex items-center justify-center rd-2.5px text-sm op-50 @active:op-100 @active:bg-white/20! cursor-pointer hover:bg-white/50 transition-all"
    >
      <div
        v-for="item in list" :key="item.id"
        :class="{ active: selected.id === item.id }"
        :title="item.id"
        @click="handleSelect(item)"
      >
        <div :class="item.icon" />
      </div>
    </div>
    <div>
      <WH />
      <div h-40 />
    </div>
  </section>
</template>
