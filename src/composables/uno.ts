import type { Theme } from '@unocss/preset-wind4'
import { createGenerator } from '@unocss/core'
import { computedAsync } from '@vueuse/core'
import { ref } from 'vue'
import userConfig from '../../uno.config'

const config = ref(userConfig)

export function useUno() {
  const uno = computedAsync(async () => {
    return await createGenerator<Theme>(config.value)
  })

  return {
    uno,
  }
}
