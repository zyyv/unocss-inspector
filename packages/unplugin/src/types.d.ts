import type { UnoGenerator } from '@unocss/core'

export interface ServerFunctions {
  version: () => string
  generate: (tokens: Parameters<UnoGenerator['generate']>[0], options?: Parameters<UnoGenerator['generate']>[1]) => Promise<string>
}

export interface ClientFunctions {
  alert: (message: string) => void
}
