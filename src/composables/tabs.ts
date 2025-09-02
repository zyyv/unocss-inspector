import type { Component, ComputedRef, Ref } from 'vue'
import type { TabComponentProps } from '../types'
import { computed, ref } from 'vue'
import BasicInfo from '../components/BasicInfo.vue'
import BoxModel from '../components/BoxModel.vue'
import ClassList from '../components/ClassList.vue'
import StylesInfo from '../components/StylesInfo.vue'

import TextContent from '../components/TextContent.vue'
import IconBasic from '../icons/Basic.vue'
import IconBox from '../icons/Box.vue'
import IconClass from '../icons/Class.vue'
import IconStyle from '../icons/Style.vue'
import IconText from '../icons/Text.vue'

interface Tab {
  id: string
  label: string
  icon: Component
  component: Component<TabComponentProps>
}

interface UseTabsReturn {
  tabs: Tab[]
  activeTab: ComputedRef<Tab>
  slideDirection: Ref<'left' | 'right'>
  setActiveTab: (id: string) => void
}

export function useTabs(): UseTabsReturn {
  const tabs: Tab[] = [
    { id: 'basic', label: 'Basic Info', icon: IconBasic, component: BasicInfo },
    { id: 'classes', label: 'Class', icon: IconClass, component: ClassList },
    { id: 'box', label: 'Box Model', icon: IconBox, component: BoxModel },
    { id: 'styles', label: 'Styles', icon: IconStyle, component: StylesInfo },
    { id: 'text', label: 'Text', icon: IconText, component: TextContent },
  ]

  const activeTabId = ref<string>(tabs[0].id)
  const slideDirection = ref<'left' | 'right'>('right')

  function setActiveTab(id: string) {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTabId.value)
    const newIndex = tabs.findIndex(tab => tab.id === id)

    if (newIndex < currentIndex) {
      slideDirection.value = 'right' // 向前切换，从右滑入
    }
    else {
      slideDirection.value = 'left' // 向后切换，从左滑入
    }

    activeTabId.value = id
  }

  const activeTab = computed(() => tabs.find(tab => tab.id === activeTabId.value)!)

  return {
    tabs,
    activeTab,
    slideDirection,
    setActiveTab,
  }
}
