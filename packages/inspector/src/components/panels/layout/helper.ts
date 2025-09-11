// @unocss-include
// flex flex-row
export const flexRowList: FlexListOption[] = [
  // 1st row
  {
    id: 'top-left',
    icon: 'i-hugeicons:text-align-justify-left',
    label: 'Align Top Left',
    class: 'justify-start items-start',
  },
  {
    id: 'top-center',
    icon: 'i-hugeicons:text-align-center rotate-180',
    label: 'Align Top Center',
    class: 'justify-center items-start',
  },
  {
    id: 'top-right',
    icon: 'i-hugeicons:text-align-justify-right',
    label: 'Align Top Right',
    class: 'justify-end items-start',
  },
  //  2nd row
  {
    id: 'center-left',
    icon: 'i-hugeicons:text-align-justify-left',
    label: 'Align Center Left',
    class: 'justify-start items-center',
  },
  {
    id: 'center-center',
    icon: 'i-hugeicons:text-align-center rotate-180',
    label: 'Align Center Center',
    class: 'justify-center items-center',
  },
  {
    id: 'center-right',
    icon: 'i-hugeicons:text-align-justify-right',
    label: 'Align Center Right',
    class: 'justify-end items-center',
  },
  // 3rd row
  {
    id: 'bottom-left',
    icon: 'i-hugeicons:text-align-justify-left',
    label: 'Align Bottom Left',
    class: 'justify-start items-end',
  },
  {
    id: 'bottom-center',
    icon: 'i-hugeicons:text-align-center rotate-180',
    label: 'Align Bottom Center',
    class: 'justify-center items-end',
  },
  {
    id: 'bottom-right',
    icon: 'i-hugeicons:text-align-justify-right',
    label: 'Align Bottom Right',
    class: 'justify-end items-end',
  },
]

// flex flex-col
export const flexColList: FlexListOption[] = [
  // 1st row
  {
    id: 'top-left',
    icon: 'i-hugeicons:text-align-left',
    label: 'Align Top Left',
    class: 'justify-start items-start',
  },
  {
    id: 'top-center',
    icon: 'i-hugeicons:text-align-center',
    label: 'Align Top Center',
    class: 'justify-start items-center',
  },
  {
    id: 'top-right',
    icon: 'i-hugeicons:text-align-right',
    label: 'Align Top Right',
    class: 'justify-start items-end',
  },
  //  2nd row
  {
    id: 'center-left',
    icon: 'i-hugeicons:text-align-left',
    label: 'Align Center Left',
    class: 'justify-center items-start',
  },
  {
    id: 'center-center',
    icon: 'i-hugeicons:text-align-center',
    label: 'Align Center Center',
    class: 'justify-center items-center',
  },
  {
    id: 'center-right',
    icon: 'i-hugeicons:text-align-right',
    label: 'Align Center Right',
    class: 'justify-center items-end',
  },
  // 3rd row
  {
    id: 'bottom-left',
    icon: 'i-hugeicons:text-align-left',
    label: 'Align Bottom Left',
    class: 'justify-end items-start',
  },
  {
    id: 'bottom-center',
    icon: 'i-hugeicons:text-align-center',
    label: 'Align Bottom Center',
    class: 'justify-end items-center',
  },
  {
    id: 'bottom-right',
    icon: 'i-hugeicons:text-align-right',
    label: 'Align Bottom Right',
    class: 'justify-end items-end',
  },
]

export const gapList: GapOption[] = [
  { value: 'auto', label: 'Auto' },
  { value: '0', label: '0' },
  { value: '0.5', label: '0.5', desc: '2px' },
  { value: '1', label: '1', desc: '4px' },
  { value: '2', label: '2', desc: '8px' },
  { value: '3', label: '3', desc: '12px' },
  { value: '4', label: '4', desc: '16px' },
  { value: '6', label: '6', desc: '24px' },
  { value: '8', label: '8', desc: '32px' },
  { value: '12', label: '12', desc: '48px' },
  { value: '24', label: '24', desc: '96px' },
]

export interface FlexListOption {
  id: string
  icon: string
  label: string
  class: string
}

export interface GapOption {
  label: string
  value: string
  desc?: string
}
