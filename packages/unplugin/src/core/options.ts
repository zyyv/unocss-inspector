export interface Panel {
  id: string
  label: string
  icon?: string
  component: any
}

export interface Options {
  /**
   * Whether to enable the inspector
   * @default true
   */
  enabled?: boolean

  /**
   * Custom panels to add to the inspector
   * @default []
   */
  panels?: Panel[]

  /**
   * Position of the inspector
   * @default 'bottom-right'
   */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

  /**
   * Custom CSS styles to inject
   */
  customStyles?: string

  /**
   * Keyboard shortcut to toggle inspector
   * @default 'Cmd+U' | 'Ctrl+U'
   */
  shortcut?: string
}

export function resolveOptions(options: Options = {}): Required<Options> {
  return {
    enabled: options.enabled ?? true,
    panels: options.panels ?? [],
    position: options.position ?? 'bottom-right',
    customStyles: options.customStyles ?? '',
    shortcut: options.shortcut ?? 'Cmd+U',
  }
}
