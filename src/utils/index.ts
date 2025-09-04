export function round(num: number) {
  return num.toFixed(2).replace(/0+$/, '').replace(/\.$/, '')
}
