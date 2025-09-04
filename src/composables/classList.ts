import { computed, ref, watch } from 'vue'
import { useElement } from './element'

export function useClassList() {
  const { element, updateTrigger } = useElement()

  const allClasses = ref<Set<string>>(new Set())

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
      if (newElement) {
        Array.from(newElement.classList).forEach((className) => {
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
        allClasses.value.add(className)
      })
    },
    { immediate: true },
  )

  const displayClasses = computed(() => Array.from(allClasses.value))

  const classList = computed({
    get: () => activeClasses.value,
    set: (newList: string[]) => {
      if (!element.value) {
        return
      }
      element.value.className = newList.join(' ')
      updateTrigger.value++
    },
  })

  return {
    displayClasses,
    classList,
  }
}
