<script setup lang="ts">
import SettingsSection from './SettingsSection.vue'

defineProps<{
  uno: any
}>()

function formatRule(rule: any) {
  if (Array.isArray(rule)) {
    const [matcher] = rule
    if (matcher instanceof RegExp)
      return matcher.toString()
    return String(matcher)
  }
  return String(rule)
}
</script>

<template>
  <SettingsSection title="Rules" :count="(uno.config.rules?.length || 0) + (uno.config.rulesDynamic?.length || 0)">
    <div class="flex flex-col gap-4">
      <div v-if="uno.config.rules?.length" class="flex flex-col gap-1 font-mono">
        <div class="text-xs opacity-50 mb-1">
          Static Rules
        </div>
        <div v-for="(rule, idx) in uno.config.rules" :key="idx" class="truncate opacity-75 hover:opacity-100" :title="formatRule(rule)">
          {{ formatRule(rule) }}
        </div>
      </div>

      <div v-if="uno.config.rulesDynamic?.length" class="flex flex-col gap-1 font-mono">
        <div class="text-xs opacity-50 mb-1">
          Dynamic Rules
        </div>
        <div v-for="(rule, idx) in uno.config.rulesDynamic" :key="idx" class="truncate opacity-75 hover:opacity-100" :title="formatRule(rule)">
          {{ formatRule(rule) }}
        </div>
      </div>
    </div>
  </SettingsSection>
</template>
