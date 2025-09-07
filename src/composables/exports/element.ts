import type { Ref } from 'vue'
import { computed, inject, provide, ref } from 'vue'

const CURRENT_ELEMENT_INJECTION_KEY = 'current-element'
const UPDATE_TRIGGER_INJECTION_KEY = 'update-trigger'

export function provideCurrentElement(element: Ref<HTMLElement | null>, updateTrigger: Ref<number>) {
  provide(CURRENT_ELEMENT_INJECTION_KEY, element)
  provide(UPDATE_TRIGGER_INJECTION_KEY, updateTrigger)
}

export function useElement() {
  const element = inject(CURRENT_ELEMENT_INJECTION_KEY) as Ref<HTMLElement | null> | undefined
  const updateTrigger = inject(UPDATE_TRIGGER_INJECTION_KEY) as Ref<number> | undefined
  /**
   * Styles as a shortcut to access the element's computed styles, it's **READONLY**!
   */
  const styles = computed(() => element?.value?.style)

  if (!element) {
    throw new Error('useElement must be used within a component that provides element context')
  }

  return {
    element,
    updateTrigger: updateTrigger || ref(0),
    styles,
  }
}
