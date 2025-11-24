<script setup lang="ts">
import SettingsSection from './SettingsSection.vue'

defineProps<{
  uno: any
}>()
</script>

<template>
  <SettingsSection title="Overview">
    <div class="grid grid-cols-2 gap-4">
      <div class="flex flex-col gap-1">
        <span class="text-xs opacity-50 uppercase tracking-wider">Version</span>
        <span class="font-mono text-sm">{{ uno.version }}</span>
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-xs opacity-50 uppercase tracking-wider">Env Mode</span>
        <span class="font-mono text-sm">{{ uno.config.envMode || '-' }}</span>
      </div>
    </div>
  </SettingsSection>
</template>
