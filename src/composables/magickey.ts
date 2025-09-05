import { useMagicKeys } from '@vueuse/core'
import { watch } from 'vue'

export function useMagicKey(action: () => void, exit: () => void) {
  const keys = useMagicKeys()
  const cmdU = keys['cmd+u']
  const ctrlU = keys['ctrl+u']
  const escape = keys.escape

  watch([cmdU, ctrlU], ([cmdUPressed, ctrlUPressed]) => {
    if (cmdUPressed || ctrlUPressed) {
      action()
    }
  })

  watch(escape, (escPressed) => {
    if (escPressed) {
      exit()
    }
  })
}
