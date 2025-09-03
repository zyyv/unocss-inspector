import type { Theme } from '@unocss/preset-wind4'
import { defineConfig, presetAttributify, presetIcons, presetWebFonts, presetWind4 } from 'unocss'

export default defineConfig<Theme>({
  theme: {
    colors: {
      inspect: {
        margin: 'oklch(82% 0.15 60)',
        padding: 'oklch(78% 0.14 140)',
        content: 'oklch(75% 0.12 240)',
        border: 'oklch(72.2% 0.177 305.5)',
      },
    },
  },
  shortcuts: {
    // box model
    'box-model-title': 'absolute top-1px left-1px text-white px-0.5 font-semibold text-8px uppercase',
    'box-model-labels': 'absolute top-0 left-0 size-full text-8px pointer-events-none',
    'box-model-text': 'absolute px-1 text-dark/80',
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
    presetWebFonts({
      provider: 'fontsource',
      fonts: {
        dm: ['DM Sans', 'DM Sans:400,700'],
      },
    }),
  ],
})
