/* eslint-disable no-console */
import type { Theme } from '@unocss/preset-wind4'
import type { UnocssPluginContext, UnoGenerator } from 'unocss'
import type { UnocssVitePluginAPI, VitePluginConfig } from 'unocss/vite'
import type { Plugin } from 'vite'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import { glob } from 'tinyglobby'

export default function UnoPlugin(): Plugin {
  let ctx: UnocssPluginContext<VitePluginConfig>

  return {
    name: 'uno-plugin',
    apply: 'build',
    enforce: 'pre',
    async configResolved(config) {
      const api = config.plugins.find(i => i.name === 'unocss:api')?.api as UnocssVitePluginAPI | undefined
      if (!api)
        throw new Error('UnoCSS plugin not found')

      ctx = api.getContext()
    },
    async writeBundle(options, bundle) {
      await ctx.ready
      const uno = ctx.uno as UnoGenerator<Theme>

      try {
        const srcDir = resolve(process.cwd(), 'src')
        const files = await glob('**/*.{vue,ts,js,tsx,jsx}', {
          cwd: srcDir,
          absolute: true,
        })

        let allContent = ''
        for (const file of files) {
          if (existsSync(file)) {
            const content = readFileSync(file, 'utf-8')
            allContent += `${content}\n`
          }
        }

        const { css: generatedCSS, matched } = await uno.generate(allContent, { minify: true })

        if (generatedCSS) {
          const existingCssFile = Object.keys(bundle).find(fileName => fileName.endsWith('.css'))

          if (existingCssFile) {
            const fs = await import('node:fs/promises')
            const cssFilePath = resolve(options.dir || 'dist', existingCssFile)

            if (existsSync(cssFilePath)) {
              const existingCSS = await fs.readFile(cssFilePath, 'utf-8')
              const updatedCSS = `${existingCSS}\n\n/* UnoCSS Generated Styles */\n${generatedCSS}`
              await fs.writeFile(cssFilePath, updatedCSS, 'utf-8')
            }
          }

          console.log('✅ UnoCSS styles generated')
          console.log(`📄 Scanned ${files.length} files`)
          console.log(`🎨 Generated ${generatedCSS.split('\n').length} lines of CSS and ${matched.size} utilities`)
        }
      }
      catch (error) {
        console.error('Error generating UnoCSS styles:', error)
      }
    },
  }
}
