<script lang='ts' setup>
import { computed } from 'vue'
import { useElement } from '../composables/element'

const { element, updateTrigger } = useElement()

const boxModel = computed(() => {
  void updateTrigger.value

  if (!element.value) {
    return null
  }

  const el = element.value
  const computedStyle = window.getComputedStyle(el)
  const rect = el.getBoundingClientRect()

  return {
    margin: {
      top: Number.parseFloat(computedStyle.marginTop),
      right: Number.parseFloat(computedStyle.marginRight),
      bottom: Number.parseFloat(computedStyle.marginBottom),
      left: Number.parseFloat(computedStyle.marginLeft),
    },
    border: {
      top: Number.parseFloat(computedStyle.borderTopWidth),
      right: Number.parseFloat(computedStyle.borderRightWidth),
      bottom: Number.parseFloat(computedStyle.borderBottomWidth),
      left: Number.parseFloat(computedStyle.borderLeftWidth),
    },
    padding: {
      top: Number.parseFloat(computedStyle.paddingTop),
      right: Number.parseFloat(computedStyle.paddingRight),
      bottom: Number.parseFloat(computedStyle.paddingBottom),
      left: Number.parseFloat(computedStyle.paddingLeft),
    },
    size: {
      width: rect.width,
      height: rect.height,
    },
  }
})

function formatBoxValue(value: number): string {
  return value === 0 ? '0' : `${value}px`
}
</script>

<template>
  <div v-if="boxModel" class="box-model">
    <div class="box-layer margin-box">
      <div class="box-label">
        margin
      </div>
      <div class="box-values">
        <span>{{ formatBoxValue(boxModel.margin.top) }}</span>
        <span>{{ formatBoxValue(boxModel.margin.right) }}</span>
        <span>{{ formatBoxValue(boxModel.margin.bottom) }}</span>
        <span>{{ formatBoxValue(boxModel.margin.left) }}</span>
      </div>

      <div class="box-layer border-box">
        <div class="box-label">
          border
        </div>
        <div class="box-values">
          <span>{{ formatBoxValue(boxModel.border.top) }}</span>
          <span>{{ formatBoxValue(boxModel.border.right) }}</span>
          <span>{{ formatBoxValue(boxModel.border.bottom) }}</span>
          <span>{{ formatBoxValue(boxModel.border.left) }}</span>
        </div>

        <div class="box-layer padding-box">
          <div class="box-label">
            padding
          </div>
          <div class="box-values">
            <span>{{ formatBoxValue(boxModel.padding.top) }}</span>
            <span>{{ formatBoxValue(boxModel.padding.right) }}</span>
            <span>{{ formatBoxValue(boxModel.padding.bottom) }}</span>
            <span>{{ formatBoxValue(boxModel.padding.left) }}</span>
          </div>

          <div class="box-layer content-box">
            <div class="box-label">
              content
            </div>
            <div class="content-size">
              {{ Math.round(boxModel.size.width) }} × {{ Math.round(boxModel.size.height) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box-model {
  font-family: 'SF Mono', Monaco, monospace;
  font-size: 11px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.box-layer {
  border: 1px solid;
  /* margin: 4px; */
  padding: 20px;
  position: relative;
  text-align: center;
}

.margin-box {
  border-color: var(--margin-bg-color);
  background: var(--margin-bg-color);
}

.border-box {
  border-color: var(--border-bg-color);
  background: var(--border-bg-color);
}

.padding-box {
  border-color: var(--padding-bg-color);
  background: var(--padding-bg-color)
}

.content-box {
  border-color: var(--content-bg-color);
  background: var(--content-bg-color);
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.box-label {
  position: absolute;
  top: -1px;
  left: 4px;
  background: #666;
  color: white;
  padding: 0 4px;
  font-weight: 600;
  font-size: 9px;
  text-transform: uppercase;
  border-radius: 2px;
}

.box-values {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 8px;
  opacity: 0.8;
  pointer-events: none;
}

.box-values span {
  position: absolute;
  padding: 1px 3px;
  border-radius: 2px;
  color: #666;
  background: rgba(255, 255, 255, 0.8);
  transform: translate(-50%, -50%);
}

.box-values span:nth-child(1) {
  /* top */
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
}

.box-values span:nth-child(2) {
  /* right */
  top: 50%;
  right: 0;
  transform: translate(0, -50%);
}

.box-values span:nth-child(3) {
  /* bottom */
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
}

.box-values span:nth-child(4) {
  /* left */
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
}

.content-size {
  font-weight: 600;
  color: #1e40af;
  font-size: 12px;
}
</style>
