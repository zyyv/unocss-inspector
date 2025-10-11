export interface Panel {
  id: string
  label: string
  icon?: string
  component: any
}

export interface Options {

  /**
   * Apply the plugin to serve or build
   */
  apply?: 'serve' | 'build'

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
   * Custom CSS styles to inject
   */
  customStyles?: string
}

export function resolveOptions(options: Options = {}): Required<Options> {
  return {
    apply: options.apply || 'serve',
    enabled: options.enabled ?? true,
    panels: options.panels ?? [],
    customStyles: options.customStyles ?? '',
  }
}
