import { useMagicKeys } from '@vueuse/core'
import { watch } from 'vue'

export function useMagicKey(action: () => void) {
  const keys = useMagicKeys()
  const cmdU = keys['cmd+u']
  const ctrlU = keys['ctrl+u']

  watch([cmdU, ctrlU], ([cmdUPressed, ctrlUPressed]) => {
    if (cmdUPressed || ctrlUPressed) {
      action()
    }
  })
}
