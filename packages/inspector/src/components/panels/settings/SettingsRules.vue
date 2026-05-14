<script setup lang="ts">
import type { SerializedUnoCSSSettings } from '../../../types'
import SettingsSection from './SettingsSection.vue'

defineProps<{
  uno: SerializedUnoCSSSettings
}>()

function interactiveHref(token: string) {
  return `https://unocss.dev/interactive/?s=${encodeURIComponent(token)}`
}
</script>

<template>
  <SettingsSection title="Rules" :count="(uno.config.rulesStatic?.length || 0) + (uno.config.rulesDynamic?.length || 0)">
    <div class="flex flex-col gap-4">
      <div v-if="uno.config.rulesStatic?.length" class="flex flex-col gap-1 font-mono">
        <div class="text-xs opacity-50 mb-1">
          Static Rules
        </div>
        <a
          v-for="(rule, idx) in uno.config.rulesStatic"
          :key="idx"
          :href="interactiveHref(rule)"
          target="_blank"
          rel="noreferrer"
          class="truncate opacity-75 underline-transparent transition hover:text-green-300 hover:opacity-100 hover:underline hover:decoration-green-300/70"
          :title="rule"
        >
          {{ rule }}
        </a>
      </div>

      <div v-if="uno.config.rulesDynamic?.length" class="flex flex-col gap-1 font-mono">
        <div class="text-xs opacity-50 mb-1">
          Dynamic Rules
        </div>
        <div v-for="(rule, idx) in uno.config.rulesDynamic" :key="idx" class="truncate opacity-75 hover:opacity-100" :title="rule">
          {{ rule }}
        </div>
      </div>
    </div>
  </SettingsSection>
</template>
