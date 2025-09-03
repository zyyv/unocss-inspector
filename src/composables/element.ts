import type { Ref } from 'vue'
import { inject, provide, ref } from 'vue'

const CURRENT_ELEMENT_INJECTION_KEY = 'current-element'
const UPDATE_TRIGGER_INJECTION_KEY = 'update-trigger'

export function provideCurrentElement(element: Ref<HTMLElement | null>, updateTrigger: Ref<number>) {
  provide(CURRENT_ELEMENT_INJECTION_KEY, element)
  provide(UPDATE_TRIGGER_INJECTION_KEY, updateTrigger)
}

export function useElement() {
  const element = inject(CURRENT_ELEMENT_INJECTION_KEY) as Ref<HTMLElement | null> | undefined
  const updateTrigger = inject(UPDATE_TRIGGER_INJECTION_KEY) as Ref<number> | undefined

  if (!element) {
    throw new Error('useElement must be used within a component that provides element context')
  }

  return {
    element,
    updateTrigger: updateTrigger || ref(0),
  }
}
