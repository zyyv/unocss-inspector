# UnoCSS Inspector

一个类似于 Chrome 开发者工具的元素审查组件，用于审查元素的样式和属性。

## 功能特性

- 🔍 **元素选择**: 点击选择元素按钮，然后点击页面上的任意元素进行审查
- 🌳 **元素树**: 显示完整的 DOM 结构，支持展开/折叠
- 🎨 **样式查看**: 查看元素的计算样式、CSS 规则和属性
- 📦 **盒模型**: 可视化显示元素的 margin、border、padding 和 content
- ✨ **实时高亮**: 悬停时高亮显示对应的页面元素
- 📱 **响应式**: 适配不同屏幕尺寸

## 安装

```bash
npm install unocss-inspector
# 或
pnpm add unocss-inspector
```

## 使用

### Vue 3

```vue
<script setup>
import { Inspector } from 'unocss-inspector'
</script>

<template>
  <div>
    <!-- 你的应用内容 -->
    <div class="my-content">
      Hello World
    </div>

    <!-- 添加 Inspector 组件 -->
    <Inspector />
  </div>
</template>
```

### 作为插件使用

```js
import InspectorPlugin from 'unocss-inspector'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(InspectorPlugin)
app.mount('#app')
```

然后在任何组件中使用：

```vue
<template>
  <div>
    <Inspector />
  </div>
</template>
```

## 操作指南

1. **打开审查器**: 点击页面右下角的🔍按钮
2. **选择元素**: 点击"Select Element"按钮，然后点击页面上想要审查的元素
3. **查看样式**: 在右侧面板查看元素的样式信息
4. **浏览元素树**: 在左侧面板浏览完整的 DOM 结构
5. **关闭审查器**: 点击右上角的✖按钮

## 界面说明

### 左侧面板 - Elements
- 显示页面的 DOM 结构树
- 点击任意元素可选中并查看其样式
- 悬停时会在页面上高亮对应元素

### 右侧面板 - Styles
- **Computed Styles**: 显示元素的所有计算样式
- **CSS Rules**: 显示匹配该元素的 CSS 规则
- **Attributes**: 显示元素的所有属性
- **Box Model**: 可视化显示盒模型（margin、border、padding、content）

## 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm run play

# 构建
pnpm run build

# 代码检查
pnpm run lint
```

## License

MIT
