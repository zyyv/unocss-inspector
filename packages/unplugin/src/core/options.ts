export interface Panel {
  id: string
  label: string
  icon?: string
  component: any
}

export interface Options {
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
    panels: options.panels ?? [],
    customStyles: options.customStyles ?? '',
  }
}
