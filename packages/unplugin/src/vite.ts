import type { Theme } from '@unocss/preset-wind4'
import type { UnocssPluginContext } from 'unocss'
import type { UnocssVitePluginAPI, VitePluginConfig } from 'unocss/vite'
import type { Options } from './core/options'
import type { ClientFunctions, SerializedUnoCSSSettings, ServerFunctions } from './types'
import { format } from 'oxfmt'
import { createRPCServer } from 'vite-dev-rpc'
import { Starter } from './index'

function toDisplayString(value: unknown): string {
  if (value instanceof RegExp)
    return value.toString()

  if (typeof value === 'function')
    return `[Function${value.name ? ` ${value.name}` : ''}]`

  if (typeof value === 'string')
    return value

  if (value === undefined)
    return 'undefined'

  try {
    return JSON.stringify(serializeValue(value))
  }
  catch {
    return String(value)
  }
}

function serializeValue(value: unknown, seen = new WeakSet<object>()): unknown {
  if (value instanceof RegExp)
    return value.toString()

  if (typeof value === 'function')
    return `[Function${value.name ? ` ${value.name}` : ''}]`

  if (!value || typeof value !== 'object')
    return value

  if (seen.has(value))
    return '[Circular]'

  seen.add(value)

  if (Array.isArray(value))
    return value.map(item => serializeValue(item, seen))

  return Object.fromEntries(
    Object.entries(value).map(([key, val]) => [key, serializeValue(val, seen)]),
  )
}

function getNamedItems(items: unknown): Array<{ name: string }> {
  if (!Array.isArray(items))
    return []

  return items.map((item, index) => {
    if (item && typeof item === 'object' && 'name' in item) {
      const name = (item as { name?: unknown }).name
      if (typeof name === 'string' && name)
        return { name }
    }

    return { name: toDisplayString(item) || `Item ${index + 1}` }
  })
}

function getStringList(items: unknown): string[] {
  if (!Array.isArray(items))
    return []

  return items.map(item => toDisplayString(item))
}

function getRules(items: unknown): string[] {
  if (typeof items === 'object' && items !== null) {
    // Handle Map or Record
    if (Symbol.iterator in items) {
      return Array.from(items as Iterable<any>).map(([key, value]) => {
        if (Array.isArray(value))
          return toDisplayString(value[0])
        return toDisplayString(key)
      })
    }
  }
  if (!Array.isArray(items))
    return []

  return items.map((rule) => {
    if (Array.isArray(rule))
      return toDisplayString(rule[0])

    return toDisplayString(rule)
  })
}

function getStaticRules(items: unknown): string[] {
  if (!items || typeof items !== 'object')
    return []

  if (Symbol.iterator in items)
    return Array.from(items as Iterable<[unknown]>).map(([key]) => toDisplayString(key))

  return Object.keys(items)
}

function getShortcuts(items: unknown): Array<{ matcher: string, body: string }> {
  if (!Array.isArray(items))
    return []

  return items.map((shortcut) => {
    if (Array.isArray(shortcut)) {
      return {
        matcher: toDisplayString(shortcut[0]),
        body: toDisplayString(shortcut[1]),
      }
    }

    return {
      matcher: toDisplayString(shortcut),
      body: '',
    }
  })
}

function getConfigSources(ctx: UnocssPluginContext<VitePluginConfig<Theme>>): string[] {
  const rawCtx = ctx as any
  const sources = rawCtx.sources || rawCtx.configSources || rawCtx.config?.sources

  if (!Array.isArray(sources))
    return []

  return sources.map((source: unknown) => {
    if (typeof source === 'string')
      return source

    if (source && typeof source === 'object') {
      const sourceRecord = source as Record<string, unknown>
      return toDisplayString(sourceRecord.path || sourceRecord.id || sourceRecord)
    }

    return toDisplayString(source)
  })
}

function serializeSettings(ctx: UnocssPluginContext<VitePluginConfig<Theme>>): SerializedUnoCSSSettings {
  const uno = ctx.uno
  const config = uno.config
  const rawCtx = ctx as any

  return {
    version: uno.version,
    context: {
      root: rawCtx.root,
      configFile: rawCtx.configFile,
      sources: getConfigSources(ctx),
    },
    config: {
      envMode: config.envMode,
      presets: getNamedItems(config.presets),
      rulesStatic: getStaticRules(config.rulesStaticMap),
      rulesDynamic: getRules(config.rulesDynamic),
      shortcuts: getShortcuts(config.shortcuts),
      variants: getNamedItems(config.variants),
      safelist: getStringList(config.safelist),
      blocklist: getStringList(config.blocklist),
      layers: { ...config.layers },
      transformers: getNamedItems(config.transformers),
      theme: serializeValue(config.theme),
    },
  }
}

async function formatCSS(css: string): Promise<string> {
  if (!css)
    return ''

  const result = await format('unocss-inspector.css', css, {
    printWidth: 100,
  })

  if (result.errors.length) {
    const message = result.errors.map(error => error.message).join('\n')
    throw new Error(message || 'Failed to format CSS')
  }

  return result.code.trimEnd()
}

async function formatHTML(html: string): Promise<string> {
  if (!html)
    return ''

  const result = await format('unocss-inspector.html', html, {
    printWidth: 100,
  })

  if (result.errors.length) {
    const message = result.errors.map(error => error.message).join('\n')
    throw new Error(message || 'Failed to format HTML')
  }

  return result.code.trimEnd()
}

function vite(options?: Options): ReturnType<typeof Starter.vite>[] {
  let ctx: UnocssPluginContext<VitePluginConfig<Theme>> | undefined

  return [
    Starter.vite(options),
    {
      name: 'unplugin-unocss-inspector:rpc',
      enforce: 'post',
      apply: 'serve',
      configResolved(config) {
        const unocssPlugin = config.plugins.find(i => i.name === 'unocss:api')
        if (unocssPlugin && 'api' in unocssPlugin) {
          const api = unocssPlugin.api as UnocssVitePluginAPI
          ctx = api.getContext()
        }
      },
      async configureServer(server) {
        if (!ctx) {
          console.warn('[unplugin-unocss-inspector] UnoCSS context not found. Make sure UnoCSS plugin is loaded before this plugin.')
          return
        }

        await ctx.ready

        createRPCServer<ClientFunctions, ServerFunctions>('unocss-inspector', server.ws, {
          getUno() {
            if (!ctx) {
              throw new Error('UnoCSS context not found')
            }

            return ctx.uno
          },
          getCtx() {
            if (!ctx) {
              throw new Error('UnoCSS context not found')
            }
            return ctx
          },
          getSettings() {
            if (!ctx) {
              throw new Error('UnoCSS context not found')
            }
            return serializeSettings(ctx)
          },
          formatCSS,
          formatHTML,
          async generate(tokens, options) {
            if (!ctx) {
              throw new Error('UnoCSS context not found')
            }
            const { css } = await ctx.uno.generate(tokens, options)
            return css
          },
          async generateCSS(tokens, options) {
            if (!ctx) {
              throw new Error('UnoCSS context not found')
            }
            const { css, matched } = await ctx.uno.generate(tokens, options)
            return {
              css: await formatCSS(css),
              matched: Array.from(matched),
            }
          },
        })
      },
    },
  ]
}
export default vite
export { vite as 'module.exports' }
