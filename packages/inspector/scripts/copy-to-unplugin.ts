import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Paths
const inspectorDistPath = resolve(__dirname, '../dist')
const unpluginSrcUiPath = resolve(__dirname, '../../unplugin/src/ui')

if (!existsSync(unpluginSrcUiPath)) {
  mkdirSync(unpluginSrcUiPath, { recursive: true })
}

try {
  copyFileSync(
    resolve(inspectorDistPath, 'index.js'),
    resolve(unpluginSrcUiPath, 'inspector.js'),
  )

  copyFileSync(
    resolve(inspectorDistPath, 'index.css'),
    resolve(unpluginSrcUiPath, 'inspector.css'),
  )

  console.log('[@uno-inspect/inspector]: ✅ Successfully copied inspector UI files to unplugin package')
}
catch (error: any) {
  console.error('[@uno-inspect/inspector]: ❌ Failed to copy inspector UI files:', error.message)
  process.exit(1)
}
