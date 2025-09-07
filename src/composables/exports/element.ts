import type { Ref } from 'vue'
import { computed, inject, provide, ref } from 'vue'

const CURRENT_ELEMENT_INJECTION_KEY = 'current-element'
const UPDATE_TRIGGER_INJECTION_KEY = 'update-trigger'
const STATE = ref(0) // 用于强制重新计算样式

function tracking() {
  void STATE.value
}

/**
 * Safely trigger an update for the element, wait for the next animation frame
 */
function triggering(element: Ref<HTMLElement | null>) {
  if (!element.value)
    return

  const computedStyle = window.getComputedStyle(element.value)
  const transitionTime = Number.parseFloat(computedStyle.transitionDuration) + Number.parseFloat(computedStyle.transitionDelay)
  const animateTime = Number.parseFloat(computedStyle.animationDuration) + Number.parseFloat(computedStyle.animationDelay)
  const maxTime = Math.max(transitionTime, animateTime)

  setTimeout(() => {
    STATE.value++
  }, maxTime * 1000 + 50)
}

export function useTracker(element: Ref<HTMLElement | null>) {
  provide(CURRENT_ELEMENT_INJECTION_KEY, element)
  provide(UPDATE_TRIGGER_INJECTION_KEY, STATE)

  return {
    tracking,
    triggering: () => triggering(element),
  }
}

export function useElement() {
  const element = inject(CURRENT_ELEMENT_INJECTION_KEY) as Ref<HTMLElement | null> | undefined
  /**
   * Styles as a shortcut to access the element's computed styles, it's **READONLY**!
   */
  const styles = computed(() => element?.value?.style)

  if (!element) {
    throw new Error('useElement must be used within a component that provides element context')
  }

  return {
    element,
    styles,
    tracking,
    triggering: () => triggering(element),
  }
}
