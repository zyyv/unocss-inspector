import type { FilterPattern } from 'unplugin-utils'

export interface Options {
}

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U

export function resolveOptions(options: Options) {
  return options
}
