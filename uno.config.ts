import type { Theme } from '@unocss/preset-wind4'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import { symbols } from '@unocss/core'
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
  rules: [
    [
      'no-scrollbar',
      [
        {
          'scrollbar-width': 'none',
          '-ms-overflow-style': 'none',
        },
        {
          [symbols.selector]: (s: string) => `${s}::-webkit-scrollbar`,
          display: 'none',
        },
      ],
    ],
  ],
  variants: [
    {
      name: '@active',
      match(matcher) {
        if (!matcher.startsWith('@active'))
          return matcher

        return {
          matcher: matcher.slice(8),
          selector: s => `${s}.active`,
        }
      },
    },
  ],
  shortcuts: {
    'pos-center': 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',

    // box model
    'box-model-title': 'absolute top-1px left-1px text-white px-0.5 font-semibold text-8px uppercase',
    'box-model-labels': 'absolute top-0 left-0 size-full text-8px pointer-events-none',
    'box-model-text': 'absolute px-1 text-dark/80',
    // clear default button styles
    'btn-clear': 'm0 p0 text-inherit bg-transparent border-none outline-none cursor-pointer rd-0',

    'divided': 'h-1px b-b-(~ dashed white/10)',
  },
  safelist: [
    'colors:inspect-margin',
    'colors:inspect-padding',
    'colors:inspect-content',
    'colors:inspect-border',
    'colors:sky-DEFAULT',
    'colors:teal-DEFAULT',
    ['start', 'center', 'end'].map(i => `justify-${i}`),
    ['start', 'center', 'end'].map(i => `items-${i}`),
    ['row', 'col'].map(i => `flex-${i}`),
    ['gap-auto', 'gap-x-auto', 'gap-y-auto'],
  ].flat(),
  presets: [
    presetWind4({
      preflights: {
        reset: false,
      },
    }),
    presetAttributify(),
    presetIcons({
      collections: {
        custom: FileSystemIconLoader('./src/icons'),
      },
    }),
    presetWebFonts({
      // provider: 'fontsource',
      fonts: {
        dm: ['DM Sans', 'DM Sans:400,700'],
      },
    }),
  ],
})
