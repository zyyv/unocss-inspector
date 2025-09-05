import { computed, ref, watch } from 'vue'
import { useElement } from './element'

export function useClassList() {
  const { element, updateTrigger } = useElement()

  const allClasses = ref<Set<string>>(new Set())
  const originalClassOrder = ref<string[]>([])

  const activeClasses = computed(() => {
    void updateTrigger.value

    if (!element.value) {
      return []
    }

    return Array.from(element.value.classList)
  })

  watch(
    () => element.value,
    (newElement) => {
      allClasses.value.clear()
      originalClassOrder.value = []
      if (newElement) {
        const classList = Array.from(newElement.classList)
        // 记录原始顺序
        originalClassOrder.value = [...classList]
        classList.forEach((className) => {
          allClasses.value.add(className)
        })
      }
    },
    { immediate: true },
  )

  watch(
    activeClasses,
    (newClasses) => {
      newClasses.forEach((className) => {
        if (!allClasses.value.has(className)) {
          allClasses.value.add(className)
          if (!originalClassOrder.value.includes(className)) {
            originalClassOrder.value.push(className)
          }
        }
      })
    },
    { immediate: true },
  )

  const displayClasses = computed(() => {
    return originalClassOrder.value.filter(className => allClasses.value.has(className))
  })

  const classList = computed({
    get: () => activeClasses.value,
    set: (newList: string[]) => {
      if (!element.value) {
        return
      }
      const orderedList = originalClassOrder.value.filter(className => newList.includes(className))
      const newClasses = newList.filter(className => !originalClassOrder.value.includes(className))
      const finalList = [...orderedList, ...newClasses]

      element.value.className = finalList.join(' ')
      updateTrigger.value++
    },
  })

  return {
    displayClasses,
    classList,
    originalClassOrder: computed(() => originalClassOrder.value),
  }
}
