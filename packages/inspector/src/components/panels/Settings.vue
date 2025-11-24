<script lang='ts' setup>
import { onMounted, ref } from 'vue'
import { useUnoCSS } from '../../composables/unocss'
import PanelTitle from '../sections/PanelTitle.vue'
import SettingsLayers from './settings/SettingsLayers.vue'
import SettingsLists from './settings/SettingsLists.vue'
import SettingsOverview from './settings/SettingsOverview.vue'
import SettingsPresets from './settings/SettingsPresets.vue'
import SettingsRules from './settings/SettingsRules.vue'
import SettingsShortcuts from './settings/SettingsShortcuts.vue'
import SettingsTheme from './settings/SettingsTheme.vue'
import SettingsTransformers from './settings/SettingsTransformers.vue'
import SettingsVariants from './settings/SettingsVariants.vue'

const { getUno } = useUnoCSS()
const uno = ref<any>()

onMounted(async () => {
  uno.value = await getUno()
})
</script>

<template>
  <div class="p-3 no-scrollbar h-full overflow-auto">
    <PanelTitle icon="i-hugeicons:dashboard-circle-settings" title="Settings" />

    <div v-if="uno" class="space-y-4 pb-4">
      <SettingsOverview :uno="uno" />
      <SettingsPresets :uno="uno" />
      <SettingsTheme :uno="uno" />
      <SettingsRules :uno="uno" />
      <SettingsShortcuts :uno="uno" />
      <SettingsVariants :uno="uno" />
      <SettingsLists :uno="uno" />
      <SettingsLayers :uno="uno" />
      <SettingsTransformers :uno="uno" />
    </div>
  </div>
</template>
