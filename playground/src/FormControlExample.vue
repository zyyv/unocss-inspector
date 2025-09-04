<script setup lang="ts">
import { ref } from 'vue'
import FormControl from '../../src/components/basic/FormControl.vue'
import FormControlGroup from '../../src/components/basic/FormControlGroup.vue'

// 单独使用的示例
const singleCheckbox = ref(false)
const singleRadio = ref(false)

// 组合使用的示例
const checkboxValues = ref(['orange'])
const radioValue = ref('green')
const fruits = ['apple', 'banana', 'orange']
const colors = ['red', 'green', 'blue']
</script>

<template>
  <div class="p-4 space-y-6" style="--checked-context: var(--colors-sky-DEFAULT)">
    <h2 class="text-xl font-bold">
      通用表单控件示例
    </h2>

    <!-- 单独使用 Checkbox -->
    <section>
      <h3 class="text-lg font-semibold mb-2">
        单独使用 Checkbox
      </h3>
      <FormControl
        v-model="singleCheckbox"
        type="checkbox"
        label="同意服务条款"
        shape="square"
      />
      <p class="text-sm text-gray-600 mt-1">
        当前值: {{ singleCheckbox }}
      </p>
    </section>

    <!-- 单独使用 Radio -->
    <section>
      <h3 class="text-lg font-semibold mb-2">
        单独使用 Radio
      </h3>
      <FormControl
        v-model="singleRadio"
        type="radio"
        label="启用通知"
        shape="round"
      />
      <p class="text-sm text-gray-600 mt-1">
        当前值: {{ singleRadio }}
      </p>
    </section>

    <!-- Checkbox 组合使用 -->
    <section>
      <h3 class="text-lg font-semibold mb-2">
        Checkbox 组合使用
      </h3>
      <FormControlGroup v-model="checkboxValues" type="checkbox">
        <FormControl
          v-for="fruit in fruits"
          :key="fruit"
          :model-value="fruit"
          type="checkbox"
          :label="fruit"
          shape="square"
        />
      </FormControlGroup>
      <p class="text-sm text-gray-600 mt-1">
        当前选中: {{ checkboxValues }}
      </p>
    </section>

    <!-- Radio 组合使用 -->
    <section>
      <h3 class="text-lg font-semibold mb-2">
        Radio 组合使用
      </h3>
      <FormControlGroup v-model="radioValue" type="radio">
        <FormControl
          v-for="color in colors"
          :key="color"
          :model-value="color"
          type="radio"
          :label="color"
          shape="round"
        />
      </FormControlGroup>
      <p class="text-sm text-gray-600 mt-1">
        当前选中: {{ radioValue }}
      </p>
    </section>

    <!-- 混合形状示例 -->
    <section>
      <h3 class="text-lg font-semibold mb-2">
        不同形状示例
      </h3>
      <div class="space-y-2">
        <FormControl type="checkbox" label="方形 Checkbox" shape="square" />
        <FormControl type="checkbox" label="圆形 Checkbox" shape="round" />
        <FormControl type="radio" label="方形 Radio" shape="square" />
        <FormControl type="radio" label="圆形 Radio" shape="round" />
      </div>
    </section>
  </div>
</template>
