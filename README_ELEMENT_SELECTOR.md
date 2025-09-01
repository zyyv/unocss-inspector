# Vue Element Selector

一个简单易用的 Vue 3 元素选择器组件，支持可视化高亮和点击选择 DOM 元素。

## 🚀 特性

- ✨ **可视化选择** - 鼠标悬停时实时高亮目标元素
- 🎯 **点击选择** - 点击任意页面元素进行选择
- 📊 **元素信息** - 显示选中元素的标签、ID、类名、文本内容
- 🔧 **TypeScript 支持** - 完整的类型定义
- 🎨 **现代化 UI** - 简洁美观的用户界面
- 🛡️ **防冲突设计** - 不会选择组件自身的元素

## 📦 安装

```bash
npm install vue-element-selector
# 或
pnpm add vue-element-selector
# 或
yarn add vue-element-selector
```

## 🔨 使用方法

### 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { ElementSelector } from 'vue-element-selector'

const selectedElement = ref<HTMLElement | null>(null)

function onElementSelected(element: HTMLElement) {
  console.log('选择了元素:', element)
}
</script>

<template>
  <ElementSelector
    v-model="selectedElement"
    @element-selected="onElementSelected"
  />
</template>
```

### 全局注册

```ts
import { createApp } from 'vue'
import ElementSelectorPlugin from 'vue-element-selector'
import App from './App.vue'

const app = createApp(App)
app.use(ElementSelectorPlugin)
app.mount('#app')
```

```vue
<template>
  <ElementSelector v-model="selectedElement" />
</template>
```

## 📋 API 参考

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `modelValue` | `HTMLElement \| null` | `null` | 当前选中的元素 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `update:modelValue` | `HTMLElement \| null` | 选中元素变化时触发 |
| `elementSelected` | `HTMLElement` | 新元素被选中时触发 |

### 方法

组件内部方法（通过 ref 访问）：

| 方法名 | 说明 |
|--------|------|
| `startSelecting()` | 开始元素选择模式 |
| `stopSelecting()` | 停止元素选择模式 |
| `clearSelection()` | 清除当前选择 |

## 🎮 交互说明

1. **开始选择**: 点击 "🎯 选择元素" 按钮进入选择模式
2. **预览高亮**: 鼠标悬停在页面元素上会显示蓝色边框高亮
3. **确认选择**: 点击任意元素完成选择并退出选择模式
4. **取消选择**: 点击 "❌ 取消选择" 按钮退出选择模式
5. **清除选择**: 点击 "🗑️ 清除" 按钮清除当前选择

## 📝 使用场景

- 🔍 **页面元素检查工具** - 分析页面结构和元素属性
- 🛠️ **开发者工具** - 构建页面调试和测试工具
- 📊 **DOM 节点分析** - 获取特定元素的详细信息
- 🎨 **页面编辑器** - 实现所见即所得的页面编辑功能

## 🔧 开发

### 本地开发

```bash
# 克隆项目
git clone <repository-url>
cd vue-element-selector

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 查看演示
open http://localhost:3000/playground/element-selector-demo.html
```

### 构建

```bash
# 构建组件库
pnpm build

# 类型检查
pnpm typecheck

# 代码检查
pnpm lint
```

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issues 和 Pull Requests！
