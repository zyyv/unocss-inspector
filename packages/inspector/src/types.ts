import type { Component } from 'vue'

export interface TabPanel {
  id: string
  label: string
  /**
   * Recommended Icon name from https://icones.js.org/collection/hugeicons
   */
  icon: string
  /**
   * The component to render in this tab panel
   */
  component: Component
}
