import type { Theme } from '@unocss/preset-wind4'
import { defineConfig, presetAttributify, presetIcons, presetWind4 } from 'unocss'

export default defineConfig<Theme>({
  theme: {
    colors: {
      inspect: {
        margin: 'oklch(82% 0.15 60)',
        padding: 'oklch(75% 0.12 240)',
        content: 'oklch(78% 0.14 140)',
        border: 'oklch(80% 0.18 20)',
      },
    },
  },
  safelist: [
    'colors:inspect-margin',
    'colors:inspect-padding',
    'colors:inspect-content',
    'colors:inspect-border',
  ],
  presets: [
    presetWind4({
      preflights: {
        reset: false,
      },
    }),
    presetAttributify(),
    presetIcons(),
  ],
})
