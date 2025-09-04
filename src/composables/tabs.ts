// @unocss-includes
import type { Component, ComputedRef, Ref } from 'vue'
import { computed, ref } from 'vue'
import BasicInfo from '../components/BasicInfo.vue'
import BoxModel from '../components/BoxModel.vue'
import ClassList from '../components/ClassList.vue'
import StylesInfo from '../components/StylesInfo.vue'
import TextContent from '../components/TextContent.vue'

interface Tab {
  id: string
  label: string
  icon: string
  component: Component
}

interface UseTabsReturn {
  tabs: Tab[]
  activeTab: ComputedRef<Tab>
  slideDirection: Ref<'left' | 'right'>
  setActiveTab: (id: string) => void
}

export function useTabs(): UseTabsReturn {
  const tabs: Tab[] = [
    { id: 'basic', label: 'Basic Info', icon: 'i-hugeicons:information-square', component: BasicInfo },
    { id: 'classes', label: 'Class', icon: 'i-hugeicons:colors', component: ClassList },
    { id: 'styles', label: 'Styles', icon: 'i-hugeicons:biscuit', component: StylesInfo },
    { id: 'box', label: 'Box Model', icon: 'i-hugeicons:blockchain-01', component: BoxModel },
    { id: 'text', label: 'Text', icon: 'i-hugeicons:text-footnote', component: TextContent },
    { id: 'dom-tree', label: 'Dom Tree', icon: 'i-hugeicons:crowdfunding', component: TextContent },
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
