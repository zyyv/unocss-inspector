# unplugin-unocss-inspector

A UnoCSS inspector plugin for various bundlers (Vite, Webpack, Rollup, etc.) that automatically integrates the UnoCSS Inspector component into your application.

## Features

- 🎯 **Zero Configuration**: Works out of the box with sensible defaults
- 🎨 **Customizable**: Configure panels, position, and custom styles
- 🚀 **Universal**: Works with Vite, Webpack, Rollup, esbuild, and more
- 📦 **Auto-injection**: Automatically injects the inspector component and styles
- 🛠 **Developer-friendly**: Only runs in development mode

## Installation

```bash
npm install unplugin-unocss-inspector
# or
pnpm add unplugin-unocss-inspector
# or
yarn add unplugin-unocss-inspector
```

## Usage

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import UnoCSS from 'unocss/vite'
import UnoInspector from 'unplugin-unocss-inspector/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UnoCSS(),
    UnoInspector({
      // options
    }),
  ],
})
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import UnoInspector from 'unplugin-unocss-inspector/rollup'

export default {
  plugins: [
    UnoInspector({
      // options
    }),
    // other plugins
  ],
}
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-unocss-inspector/webpack')({
      // options
    }),
  ],
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import UnoInspector from 'unplugin-unocss-inspector/esbuild'

build({
  /* ... */
  plugins: [
    UnoInspector({
      // options
    }),
  ],
})
```

<br></details>

## Options

```ts
interface Options {
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
   * @default 'Cmd+U'
   */
  shortcut?: string
}

interface Panel {
  id: string
  label: string
  icon?: string
  component: any
}
```

## Example with Custom Configuration

```ts
// vite.config.ts
import UnoCSS from 'unocss/vite'
import UnoInspector from 'unplugin-unocss-inspector/vite'
import { defineConfig } from 'vite'
import CustomPanel from './src/CustomPanel.vue'

export default defineConfig({
  plugins: [
    UnoCSS(),
    UnoInspector({
      enabled: true,
      position: 'top-left',
      customStyles: `
        #unocss-inspector-root {
          z-index: 999999;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
      `,
      panels: [
        {
          id: 'custom',
          label: 'My Panel',
          icon: 'i-carbon:settings',
          component: CustomPanel,
        },
      ],
      shortcut: 'Ctrl+I',
    }),
  ],
})
```

## How it Works

1. **Auto-detection**: The plugin automatically detects the UnoCSS plugin in your build setup
2. **HTML Injection**: Injects the inspector component script and styles into your HTML
3. **Virtual Modules**: Creates virtual modules for the inspector component and styles
4. **Runtime Initialization**: Automatically initializes the inspector when the page loads

## Requirements

- UnoCSS plugin must be installed and configured in your project
- Vue.js runtime (the inspector component is built with Vue)

## Development

This plugin only runs in development mode (`apply: 'serve'` for Vite) and is automatically disabled in production builds.

## License

MIT
