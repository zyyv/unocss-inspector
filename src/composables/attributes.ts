import { computed, ref, watch } from 'vue'
import { useElement } from './element'

const FILTERED_ATTRIBUTES = ['class', 'id', 'href', 'src']

export function useAttributes() {
  const { element, updateTrigger } = useElement()

  const allAttributes = ref<Map<string, Set<string>>>(new Map())

  const activeAttributes = computed(() => {
    void updateTrigger.value

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
      const activeValues = activeAttributes.value.get(attrName) || new Set()
      result.set(attrName, {
        all: Array.from(allValues),
        active: Array.from(activeValues),
      })
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
        element.value.setAttribute(attrName, filteredValues.join(' '))
      }
    }
    updateTrigger.value++
  }

  return {
    attributes,
    updateAttribute,
  }
}
