import type { Ref } from 'vue'
import { inject, provide, ref } from 'vue'

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

  if (!element) {
    throw new Error('useElement must be used within a component that provides element context')
  }

  function setElementStyle(styles: Partial<CSSStyleDeclaration>, mode: 'style' | 'class' | 'both' = 'style') {
    if (element?.value) {
      if (mode === 'style' || mode === 'both') {
        Object.assign(element.value.style, styles)
      }
      if (mode === 'class' || mode === 'both') {
        // TODO: 将 styles 转换为 UnoCSS utility classes
      }

      triggering(element)
    }
  }

  return {
    element,
    tracking,
    triggering: () => triggering(element),
    setElementStyle,
  }
}
