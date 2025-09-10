import type { Ref } from 'vue'
import { inject, provide, ref } from 'vue'

// const CURRENT_ELEMENT_INJECTION_KEY = 'current-element'
const SELECTED_ELEMENT_INJECTION_KEY = 'selected-element'
const UPDATE_TRIGGER_INJECTION_KEY = 'update-trigger'

const STATE = ref(0) // 用于强制重新计算样式
const SELECTED_ELEMENT = ref<HTMLElement | null>(null)
// const CURRENT_ELEMENT = ref<HTMLElement | null>(null)

function tracking() {
  void STATE.value
}

/**
 * Safely trigger an update for the element, wait for the next animation frame
 */
function triggering() {
  if (!SELECTED_ELEMENT.value)
    return

  const computedStyle = window.getComputedStyle(SELECTED_ELEMENT.value)
  const transitionTime = Number.parseFloat(computedStyle.transitionDuration) + Number.parseFloat(computedStyle.transitionDelay)
  const animateTime = Number.parseFloat(computedStyle.animationDuration) + Number.parseFloat(computedStyle.animationDelay)
  const maxTime = Math.max(transitionTime, animateTime)

  setTimeout(() => {
    STATE.value++
  }, maxTime * 1000 + 50)
}

export function useTracker() {
  provide(SELECTED_ELEMENT_INJECTION_KEY, SELECTED_ELEMENT)
  // provide(CURRENT_ELEMENT_INJECTION_KEY, CURRENT_ELEMENT)
  provide(UPDATE_TRIGGER_INJECTION_KEY, STATE)

  return {
    /**
     * The currently tracked selected element
     */
    element: SELECTED_ELEMENT,
    // currentElement: CURRENT_ELEMENT,
    tracking,
    triggering,
  }
}

export function useElement() {
  const element = inject(SELECTED_ELEMENT_INJECTION_KEY) as Ref<HTMLElement | null> | undefined
  // const currentElement = inject(SELECTED_ELEMENT_INJECTION_KEY) as Ref<HTMLElement | null> | undefined

  if (!element) {
    throw new Error('useElement must be used within a component that provides element context')
  }

  function setElementStyle(styles: Partial<CSSStyleDeclaration>, mode: 'style' | 'class' | 'both' = 'style') {
    if (element?.value) {
      if (mode === 'style' || mode === 'both') {
        Object.assign((element.value as HTMLElement).style, styles)
      }
      if (mode === 'class' || mode === 'both') {
        // TODO: 将 styles 转换为 UnoCSS utility classes
      }

      triggering()
    }
  }

  return {
    element,
    // currentElement,
    tracking,
    triggering,
    setElementStyle,
  }
}
