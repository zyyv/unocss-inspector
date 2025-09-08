<script lang='ts' setup>
import { Select } from '@uno-inspect/inspector'
import { ref } from 'vue'

const selectedTheme = ref('')
const selectedLanguage = ref('zh')
const selectedSize = ref('')

const themeOptions = [
  { value: 'light', label: '浅色主题', icon: 'i-hugeicons:sun-02' },
  { value: 'dark', label: '深色主题', icon: 'i-hugeicons:moon-02' },
  { value: 'auto', label: '跟随系统', icon: 'i-hugeicons:computer' },
]

const languageOptions = [
  { value: 'zh', label: '中文' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' },
  { value: 'ko', label: '한국어' },
]

const sizeOptions = [
  { value: 'small', label: '小', icon: 'i-hugeicons:minimize-01' },
  { value: 'medium', label: '中', icon: 'i-hugeicons:maximize-01' },
  { value: 'large', label: '大', icon: 'i-hugeicons:fullscreen' },
]
</script>

<template>
  <div p-6 space-y-6 max-w-md>
    <h2 text-xl font-bold mb-4 text="white/90">
      Select 组件演示
    </h2>

    <!-- 主题选择 -->
    <div space-y-2>
      <label text="white/80" text-sm font-medium>
        主题设置
      </label>
      <Select
        v-model="selectedTheme"
        :options="themeOptions"
        placeholder="选择主题"
        inputable
      >
        <template #prefix>
          <span op-50>W</span>
        </template>
        <template #suffix>
          <span op-50>px</span>
        </template>
      </Select>
      <p text="white/60" text-xs>
        当前选择: {{ selectedTheme || '未选择' }}
      </p>
    </div>

    <!-- 语言选择 -->
    <div space-y-2>
      <label text="white/80" text-sm font-medium>
        语言设置
      </label>
      <Select
        v-model="selectedLanguage"
        :options="languageOptions"
        placeholder="选择语言"
      />
      <p text="white/60" text-xs>
        当前选择: {{ selectedLanguage }}
      </p>
    </div>

    <!-- 尺寸选择 -->
    <div space-y-2>
      <label text="white/80" text-sm font-medium>
        尺寸设置
      </label>
      <Select
        v-model="selectedSize"
        :options="sizeOptions"
        placeholder="选择尺寸"
      />
      <p text="white/60" text-xs>
        当前选择: {{ selectedSize || '未选择' }}
      </p>
    </div>

    <!-- 禁用状态演示 -->
    <div space-y-2>
      <label text="white/80" text-sm font-medium>
        禁用状态
      </label>
      <Select
        :options="themeOptions"
        placeholder="此选择器已禁用"
        disabled
      />
    </div>

    <!-- 当前状态显示 -->
    <div p-4 bg="white/5" rounded-lg border="~ white/10">
      <h3 text="white/90" font-medium mb-2>
        当前选择状态
      </h3>
      <pre text="white/70" text-xs>{{ JSON.stringify({
        theme: selectedTheme,
        language: selectedLanguage,
        size: selectedSize,
      }, null, 2) }}</pre>
    </div>
  </div>
</template>
