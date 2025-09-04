import { computed, ref, watch } from 'vue'
import { useElement } from './element'

const FILTERED_ATTRIBUTES = ['class', 'id', 'href', 'src']

export function useAttributes() {
  const { element, updateTrigger } = useElement()

  const allAttributes = ref<Map<string, Set<string>>>(new Map())

  const activeAttributes = computed(() => {
    void updateTrigger.value

    if (!element.value) {
      return new Map<string, string[]>()
    }

    const attrs = new Map<string, string[]>()
    for (let i = 0; i < element.value.attributes.length; i++) {
      const attr = element.value.attributes[i]
      if (!FILTERED_ATTRIBUTES.includes(attr.name)) {
        attrs.set(attr.name, attr.value.split(' ').filter(Boolean))
      }
    }
    return attrs
  })

  watch(
    () => element.value,
    (newElement) => {
      allAttributes.value.clear()
      if (newElement) {
        for (let i = 0; i < newElement.attributes.length; i++) {
          const attr = newElement.attributes[i]
          if (!FILTERED_ATTRIBUTES.includes(attr.name)) {
            const values = attr.value.split(' ').filter(Boolean)
            allAttributes.value.set(attr.name, new Set(values))
          }
        }
      }
    },
    { immediate: true },
  )

  watch(
    activeAttributes,
    (newAttrs) => {
      newAttrs.forEach((values, attrName) => {
        if (!allAttributes.value.has(attrName)) {
          allAttributes.value.set(attrName, new Set())
        }
        values.forEach((value) => {
          allAttributes.value.get(attrName)!.add(value)
        })
      })
    },
    { immediate: true },
  )

  const attributes = computed(() => {
    const result = new Map<string, { all: string[], active: string[] }>()

    allAttributes.value.forEach((allValues, attrName) => {
      const activeValues = activeAttributes.value.get(attrName) || []
      result.set(attrName, {
        all: Array.from(allValues),
        active: activeValues,
      })
    })

    return result
  })

  function updateAttribute(attrName: string, newValues: string[]) {
    if (!element.value) {
      return
    }
    element.value.setAttribute(attrName, newValues.join(' '))
    updateTrigger.value++
  }

  return {
    attributes,
    updateAttribute,
  }
}
