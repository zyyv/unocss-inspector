<script lang='ts' setup>
import { useToggle } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import { useElement } from '../../composables/exports/element'
import FlexCol from './FlexCol.vue'
import FlexRow from './FlexRow.vue'
import Freedom from './Freedom.vue'
import Grid from './Grid.vue'

const { element } = useElement()

const list = ref([
  { id: 'freedom', icon: 'i-custom:freedom?mask', component: Freedom },
  { id: 'horizontal', icon: 'i-custom:horizontal?mask', component: FlexRow },
  { id: 'vertical', icon: 'i-custom:vertical?mask', component: FlexCol },
  { id: 'grid', icon: 'i-hugeicons:dashboard-square-03?mask', component: Grid },
])

const selectedId = ref(list.value[0].id)
const selected = computed(() => list.value.find(i => i.id === selectedId.value) || list.value[0])

function handleSelect(id: string) {
  selectedId.value = id
}

const [openWrap, toggleWrap] = useToggle(false)

onMounted(() => {
  if (element.value) {
    const style = window.getComputedStyle(element.value)
    if (style.flexWrap === 'wrap') {
      openWrap.value = true
    }
    else {
      openWrap.value = false
    }

    if (style.display.includes('flex')) {
      const direction = style.flexDirection
      if (direction === 'column') {
        selectedId.value = 'vertical'
      }
      else {
        selectedId.value = 'horizontal'
      }
    }

    if (style.display.includes('grid')) {
      selectedId.value = 'grid'
    }
  }
})
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
        @click="handleSelect(item.id)"
      >
        <div :class="item.icon" />
      </div>
    </div>
    <div min-h-40>
      <Transition
        enter-active-class="animate-fade-in animate-duration-200"
        leave-active-class="animate-fade-out animate-duration-200"
        mode="out-in"
      >
        <component :is="selected.component" />
      </Transition>
    </div>
  </section>
</template>
