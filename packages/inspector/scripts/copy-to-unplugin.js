#!/usr/bin/env node

import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Paths
const inspectorDistPath = resolve(__dirname, '../dist')
const unpluginSrcUiPath = resolve(__dirname, '../../unplugin/src/ui')
const unpluginDistUiPath = resolve(__dirname, '../../unplugin/dist/ui')

// Ensure ui directories exist
if (!existsSync(unpluginSrcUiPath)) {
  mkdirSync(unpluginSrcUiPath, { recursive: true })
}

if (!existsSync(unpluginDistUiPath)) {
  mkdirSync(unpluginDistUiPath, { recursive: true })
}

// Copy files to unplugin package
try {
  // Copy to unplugin/src/ui for development
  copyFileSync(
    resolve(inspectorDistPath, 'index.js'),
    resolve(unpluginSrcUiPath, 'inspector.js'),
  )

  copyFileSync(
    resolve(inspectorDistPath, 'index.css'),
    resolve(unpluginSrcUiPath, 'inspector.css'),
  )

  // Copy to unplugin/dist/ui for build output
  copyFileSync(
    resolve(inspectorDistPath, 'index.js'),
    resolve(unpluginDistUiPath, 'inspector.js'),
  )

  copyFileSync(
    resolve(inspectorDistPath, 'index.css'),
    resolve(unpluginDistUiPath, 'inspector.css'),
  )

  console.log('✅ Successfully copied inspector UI files to unplugin package')
}
catch (error) {
  console.error('❌ Failed to copy inspector UI files:', error.message)
  process.exit(1)
}
