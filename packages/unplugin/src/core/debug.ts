import DEBUG from 'debug'

const debug = DEBUG('inspect:core')

export function log(...args: any): void {
  debug.log(...args)
}
