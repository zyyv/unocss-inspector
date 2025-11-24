<script setup lang="ts">
import SettingsSection from './SettingsSection.vue'

defineProps<{
  uno: any
}>()
</script>

<template>
  <SettingsSection v-if="uno.config.safelist?.length" title="Safelist" :count="uno.config.safelist?.length">
    <div class="flex flex-wrap gap-1">
      <span v-for="(item, idx) in uno.config.safelist" :key="idx" class="px-1.5 py-0.5 bg-green-500/10 text-green-400 rounded font-mono">
        {{ item }}
      </span>
    </div>
  </SettingsSection>

  <SettingsSection v-if="uno.config.blocklist?.length" title="Blocklist" :count="uno.config.blocklist?.length">
    <div class="flex flex-col gap-1 font-mono">
      <div v-for="(item, idx) in uno.config.blocklist" :key="idx" class="opacity-75">
        {{ String(item) }}
      </div>
    </div>
  </SettingsSection>
</template>
