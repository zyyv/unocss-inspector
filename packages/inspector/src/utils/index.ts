export function round(num: number) {
  return num.toFixed(2).replace(/0+$/, '').replace(/\.$/, '')
}

export const pxToRem = (px: number) => Number.parseFloat(round(px / 16))
export const remToPx = (rem: number) => Number.parseFloat(round(rem * 16))
