<script lang='ts' setup>
import { useToggle } from '@vueuse/core'
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useElement } from '../../../composables/exports/element'
import PanelTitle from '../../sections/PanelTitle.vue'
import FlexCol from './FlexCol.vue'
import FlexRow from './FlexRow.vue'
import Freedom from './Freedom.vue'
import Grid from './Grid.vue'

const { element } = useElement()
const originDisplay = ref('')
const isInlineElement = ref(false)

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
    const computedStyle = window.getComputedStyle(element.value)
    originDisplay.value = computedStyle.display

    isInlineElement.value = originDisplay.value.startsWith('inline')
  }
})

watchEffect(() => {
  if (element.value) {
    const style = window.getComputedStyle(element.value)

    if (style.display.includes('flex')) {
      const direction = style.flexDirection
      if (direction === 'column') {
        selectedId.value = 'vertical'
      }
      else {
        selectedId.value = 'horizontal'
      }

      if (style.flexWrap === 'wrap') {
        openWrap.value = true
      }
      else {
        openWrap.value = false
      }
    }

    else if (style.display.includes('grid')) {
      selectedId.value = 'grid'
    }

    else {
      selectedId.value = 'freedom'
    }

    // flex-wrap
    if (style.flexWrap === 'wrap') {
      openWrap.value = true
    }
  }
})

// watch([element, selected], () => {
//   if (selected.value && element.value) {
//     // 当 selected 布局改变时，更新元素的样式
//     const targetId = selected.value.id

//     if (targetId === 'freedom') {
//       // 切换到 freedom 时，恢复原始 display
//       setElementStyle({ display: originDisplay.value || '' })
//     }
//     else if (targetId === 'horizontal') {
//       // 水平 flex 布局，保持 inline 特性
//       const displayValue = isInlineElement.value ? 'inline-flex' : 'flex'
//       const styles: Partial<CSSStyleDeclaration> = {
//         display: displayValue,
//         flexDirection: 'row',
//       }

//       // 如果开启了 wrap，添加 flexWrap 属性
//       if (openWrap.value) {
//         styles.flexWrap = 'wrap'
//       }

//       setElementStyle(styles)
//     }
//     else if (targetId === 'vertical') {
//       // 垂直 flex 布局，保持 inline 特性
//       const displayValue = isInlineElement.value ? 'inline-flex' : 'flex'
//       setElementStyle({
//         display: displayValue,
//         flexDirection: 'column',
//       })
//     }
//     else if (targetId === 'grid') {
//       // Grid 布局，保持 inline 特性
//       const displayValue = isInlineElement.value ? 'inline-grid' : 'grid'
//       setElementStyle({ display: displayValue })
//     }
//   }
// })
</script>

<template>
  <section p-2>
    <PanelTitle title="Auto Layout" icon="i-hugeicons:dashboard-square-02">
      <div flex="~ items-center gap-1">
        <div
          v-if="selected.id === 'horizontal'"
          title="Wrap text"
          i-hugeicons:text-wrap
          op-50 hover:op-100 cursor-pointer :class="{ 'text-purple op-100!': openWrap }"
          @click="toggleWrap()"
        />
      </div>
    </PanelTitle>

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
        <component :is="selected.component" :wrap="openWrap" />
      </Transition>
    </div>
  </section>
</template>
