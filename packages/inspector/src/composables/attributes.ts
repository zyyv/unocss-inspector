import { computed, ref, watch } from 'vue'
import { useElement } from './exports/element'

const FILTERED_ATTRIBUTES = ['class', 'id', 'href', 'src', 'style']

export function useAttributes() {
  const { element, tracking, triggering } = useElement()

  const allAttributes = ref<Map<string, Set<string>>>(new Map())
  const originalAttributeOrder = ref<string[]>([])
  const originalValueOrder = ref<Map<string, string[]>>(new Map())

  const activeAttributes = computed(() => {
    tracking()

    if (!element.value) {
      return new Map<string, Set<string>>()
    }

    const attrs = new Map<string, Set<string>>()
    for (let i = 0; i < element.value.attributes.length; i++) {
      const attr = element.value.attributes[i]
      if (!FILTERED_ATTRIBUTES.includes(attr.name)) {
        const list = attr.value.split(' ').filter(Boolean)
        attrs.set(attr.name, new Set(list.length > 0 ? list : ['~']))
      }
    }
    return attrs
  })

  watch(
    () => element.value,
    (newElement) => {
      allAttributes.value.clear()
      originalAttributeOrder.value = []
      originalValueOrder.value.clear()

      if (newElement) {
        for (let i = 0; i < newElement.attributes.length; i++) {
          const attr = newElement.attributes[i]
          if (!FILTERED_ATTRIBUTES.includes(attr.name)) {
            originalAttributeOrder.value.push(attr.name)

            const values = attr.value.split(' ').filter(Boolean)
            allAttributes.value.set(attr.name, new Set(values))

            originalValueOrder.value.set(attr.name, values.length > 0 ? values : ['~'])
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
          if (!originalAttributeOrder.value.includes(attrName)) {
            originalAttributeOrder.value.push(attrName)
          }
        }

        values.forEach((value) => {
          allAttributes.value.get(attrName)!.add(value)
        })

        if (!originalValueOrder.value.has(attrName)) {
          originalValueOrder.value.set(attrName, Array.from(values))
        }
        else {
          const existingOrder = originalValueOrder.value.get(attrName)!
          const newValues = Array.from(values).filter(v => !existingOrder.includes(v))
          originalValueOrder.value.set(attrName, [...existingOrder, ...newValues])
        }
      })
    },
    { immediate: true },
  )

  const attributes = computed(() => {
    const result = new Map<string, { all: string[], active: string[] }>()

    originalAttributeOrder.value.forEach((attrName) => {
      if (allAttributes.value.has(attrName)) {
        const allValues = allAttributes.value.get(attrName)!
        const activeValues = activeAttributes.value.get(attrName) || new Set()

        const originalOrder = originalValueOrder.value.get(attrName) || []
        const orderedAllValues = originalOrder.filter(v => allValues.has(v))
        const orderedActiveValues = originalOrder.filter(v => activeValues.has(v))

        result.set(attrName, {
          all: orderedAllValues,
          active: orderedActiveValues,
        })
      }
    })

    return result
  })

  function updateAttribute(attrName: string, newValues: string[]) {
    if (!element.value) {
      return
    }

    // 如果为空数组，则删除属性
    if (newValues.length === 0) {
      element.value.removeAttribute(attrName)
    }
    // 如果只包含占位符 '~'，则添加空属性
    else if (newValues.length === 1 && newValues[0] === '~') {
      element.value.setAttribute(attrName, '')
    }
    else {
      // 过滤掉占位符 '~'，只设置实际的值
      const filteredValues = newValues.filter(value => value !== '~')
      if (filteredValues.length === 0) {
        element.value.removeAttribute(attrName)
      }
      else {
        // 按照原始顺序重新排列值
        const originalOrder = originalValueOrder.value.get(attrName) || []
        const orderedValues = originalOrder.filter(value => filteredValues.includes(value))
        const newUniqueValues = filteredValues.filter(value => !originalOrder.includes(value))
        const finalValues = [...orderedValues, ...newUniqueValues]

        element.value.setAttribute(attrName, finalValues.join(' '))
      }
    }
    triggering()
  }

  return {
    attributes,
    updateAttribute,
    originalAttributeOrder: computed(() => originalAttributeOrder.value),
    originalValueOrder: computed(() => originalValueOrder.value),
  }
}
