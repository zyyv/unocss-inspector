<script lang='ts' setup>
import { useClipboard } from '@vueuse/core'
import { computed, ref } from 'vue'
import { useElement } from '../composables/exports/element'
import { round } from '../utils'

const { element, tracking } = useElement()
const showRem = ref(false)
const showFontRem = ref(false)

const basicInfo = computed(() => {
  tracking()

  if (!element.value) {
    return null
  }

  const el = element.value
  const rect = el.getBoundingClientRect()

  return {
    tagName: el.tagName.toLowerCase(),
    id: el.id,
    rect: {
      x: Math.round(rect.x),
      y: Math.round(rect.y),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    },
    color: {
      text: getComputedStyle(el).color,
      background: getComputedStyle(el).backgroundColor,
    },
    font: {
      size: getComputedStyle(el).fontSize,
      family: getComputedStyle(el).fontFamily,
    },
  }
})

function pxToRem(px: number) {
  return round(px / 16)
}

function toggleUnit() {
  showRem.value = !showRem.value
}

function toggleFontUnit() {
  showFontRem.value = !showFontRem.value
}

const { copy } = useClipboard()
function copyToClipboard(text: string) {
  copy(text)
  // eslint-disable-next-line no-console
  console.log('Copied to clipboard:', text)
}
</script>

<template>
  <div v-if="basicInfo" p-4>
    <div class="flex flex-col gap-2">
      <!-- Tag Name -->
      <div
        b-b="~ solid white/10"
        class="text-3.25 flex items-center pb-2"
      >
        <div class="w-4.5 text-center text-base">
          <div i-hugeicons:discount-tag-01 />
        </div>
        <div class="mx-1 font-medium whitespace-nowrap ">
          Tag
        </div>
        <div class="flex-1 font-medium flex justify-end">
          <div p="x1.5 y0.5" bg-purple bg-op-30 text-purple rd w-fit>
            {{ basicInfo.tagName }}
          </div>
        </div>
      </div>
      <!-- ID -->
      <div
        v-if="basicInfo.id"
        b-b="~ solid white/10"
        class="text-3.25 flex items-center pb-2"
      >
        <div class="w-4.5 text-center text-base">
          <div i-hugeicons:pin-code />
        </div>
        <div class="mx-1 font-medium whitespace-nowrap ">
          ID
        </div>
        <div class="flex-1 font-medium flex justify-end">
          <div>
            <span class="mr-0.25 text-white/64 text-10px">#</span>
            {{ basicInfo.id }}
          </div>
        </div>
      </div>
      <!-- Position -->
      <div
        b-b="~ solid white/10"
        class="text-3.25 flex items-center pb-2"
      >
        <div class="w-4.5 text-center text-base">
          <div i-hugeicons:location-09 />
        </div>
        <div class="mx-1 font-medium whitespace-nowrap ">
          Position
        </div>
        <div class="flex-1 font-medium flex justify-end">
          <div>
            X: {{ basicInfo.rect.x }} <span class="mx-1 text-white/10">|</span> Y: {{ basicInfo.rect.y }}
          </div>
        </div>
      </div>
      <!-- Size -->
      <div
        b-b="~ solid white/10"
        class="text-3.25 flex items-center pb-2"
      >
        <div class="w-4.5 text-center text-base">
          <div i-hugeicons:image-actual-size />
        </div>
        <div class="mx-1 font-medium whitespace-nowrap ">
          Size
        </div>
        <div class="flex-1 font-medium flex justify-end">
          <div
            class="cursor-pointer hover:bg-white/10 px-1 py-0.5 rounded transition-colors select-none"
            :title="`Click to switch to ${showRem ? 'px' : 'rem'}`"
            @click="toggleUnit"
          >
            <template v-if="showRem">
              W: {{ pxToRem(basicInfo.rect.width) }}<span class="mx-1 text-white/50">rem</span> <span class="mx-1 text-white/10">|</span> H: {{ pxToRem(basicInfo.rect.height) }}<span class="mx-1 text-white/50">rem</span>
            </template>
            <template v-else>
              W: {{ basicInfo.rect.width }}<span class="mx-1 text-white/50">px</span> <span class="mx-1 text-white/10">|</span> H: {{ basicInfo.rect.height }}<span class="mx-1 text-white/50">px</span>
            </template>
          </div>
        </div>
      </div>
      <!-- Color -->
      <div
        b-b="~ solid white/10"
        class="text-3.25 flex items-center pb-2"
      >
        <div class="w-4.5 text-center text-base">
          <div i-hugeicons:color-picker />
        </div>
        <div class="mx-1 font-medium whitespace-nowrap ">
          Color
        </div>
        <div class="flex-1 font-medium flex justify-end">
          <div flex="~ items-center">
            <div title="Click to copy text color" flex="~ items-center gap-1" class="hover:bg-white/10 cursor-pointer group px-1 py-0.5 rounded" @click="copyToClipboard(basicInfo.color.text)">
              <span>Text:</span>
              <div
                class="inline-block size-3.5 rounded group-hover:rounded-50% transition-all"
                :style="{ backgroundColor: basicInfo.color.text }"
                :title="basicInfo.color.text"
              />
            </div>

            <span class="mx-1 text-white/10">|</span>

            <div title="Click to copy background color" flex="~ items-center gap-1" class="hover:bg-white/10 cursor-pointer group px-1 py-0.5 rounded" @click="copyToClipboard(basicInfo.color.background)">
              <span>Background:</span>
              <div
                class="inline-block size-3.5 rounded group-hover:rounded-50% transition-all"
                :style="{ backgroundColor: basicInfo.color.background }"
                :title="basicInfo.color.background"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Font -->
      <div
        b-b="~ solid white/10"
        class="text-3.25 flex items-center pb-2"
      >
        <div class="w-4.5 text-center text-base">
          <div i-hugeicons:text-font />
        </div>
        <div class="mx-1 font-medium whitespace-nowrap ">
          Font
        </div>
        <div class="flex-1 font-medium flex justify-end">
          <div flex="~ items-center">
            <div
              flex="~ items-center gap-1"
              class="hover:bg-white/10 cursor-pointer px-1 py-0.5 rounded transition-colors select-none"
              :title="`Click to switch to ${showFontRem ? 'px' : 'rem'}`"
              @click="toggleFontUnit"
            >
              <template v-if="showFontRem">
                <span>{{ pxToRem(parseFloat(basicInfo.font.size)) }}<span class="mx-1 text-white/50">rem</span></span>
              </template>
              <template v-else>
                <span>{{ basicInfo.font.size }}</span>
              </template>
            </div>

            <span class="mx-1 text-white/10">|</span>            <div flex-1 line-clamp-1 break-all :title="basicInfo.font.family">
              <span>{{ basicInfo.font.family }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
