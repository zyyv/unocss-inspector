<script setup lang="ts">
import SettingsSection from './SettingsSection.vue'

defineProps<{
  uno: any
}>()
</script>

<template>
  <SettingsSection title="Shortcuts" :count="uno.config.shortcuts?.length">
    <div class="flex flex-col gap-2">
      <div v-for="(shortcut, idx) in uno.config.shortcuts" :key="idx" class="font-mono text-xs">
        <div v-if="Array.isArray(shortcut)" class="flex items-center gap-2 flex-wrap">
          <span class="text-green-400 whitespace-nowrap">{{ shortcut[0] }}</span>
          <span class="opacity-50">-></span>
          <span class="opacity-75 break-all">{{ shortcut[1] }}</span>
        </div>
        <div v-else>
          <pre class="opacity-75">{{ JSON.stringify(shortcut, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </SettingsSection>
</template>
