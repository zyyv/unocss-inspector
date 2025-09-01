# UnoCSS Inspector

一个类似 Tailwind Scan 的 CSS 类扫描工具，用于分析和审查页面中使用的 CSS 类。

## 🎨 功能特性

- **🔍 智能扫描**: 自动扫描页面中所有元素的 CSS 类
- **� 分类统计**: 自动识别工具类（Utility）、组件类（Component）和自定义类（Custom）
- **🔎 高级搜索**: 实时搜索和多维度过滤
- **📱 现代界面**: 卡片式布局，响应式设计
- **⚡ 交互体验**: 点击高亮，详细信息面板
- **📁 导出功能**: 将扫描结果导出为 JSON 文件

## 安装

```bash
npm install unocss-inspector
# 或
pnpm add unocss-inspector
# 或
yarn add unocss-inspector
```

## 使用

### 作为 Vue 插件

```ts
import UnocssInspector from 'unocss-inspector'
import { createApp } from 'vue'

const app = createApp()
app.use(UnocssInspector)
```

### 导入单个组件

```vue
<script setup lang="ts">
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

## 组件

### Inspector

CSS 类扫描器组件，提供类似 tailwind-scan 的功能。

#### 功能
- **自动扫描**: 扫描页面中所有 CSS 类的使用情况
- **智能分类**: 区分工具类、组件类和自定义类
- **搜索过滤**: 根据类名快速搜索和过滤
- **使用统计**: 显示每个类的使用次数和覆盖的元素数
- **交互高亮**: 点击类卡片高亮对应的页面元素
- **详细信息**: 查看类的完整 CSS 属性
- **导出数据**: 将扫描结果导出为 JSON 格式

#### 界面说明

**头部信息**
- 统计数据：显示总类数和总使用次数
- 扫描按钮：重新扫描页面样式
- 导出按钮：导出扫描结果
- 关闭按钮：关闭扫描器

**搜索和过滤**
- 搜索框：输入关键词搜索类名
- 过滤标签：
  - `All`: 显示所有类
  - `Utility`: 工具类（如 m-4, text-center, bg-blue-500）
  - `Component`: 组件类（如 btn, card, navbar）
  - `Custom`: 自定义类

**类卡片**
- 类名：CSS 类的名称
- 使用次数：该类在页面中使用的次数
- 属性预览：前 3 个 CSS 属性
- 类型标识：带颜色的类型标签

#### 示例

```vue
<template>
  <div class="app">
    <h1 class="title text-center text-blue-600">
      My App
    </h1>
    <div class="card bg-white p-6 rounded-lg shadow">
      <p class="text-gray-700">
        Some content
      </p>
      <button class="btn btn-primary">
        Click me
      </button>
    </div>

    <!-- CSS 扫描器 -->
    <Inspector />
  </div>
</template>
```

## 使用指南

1. **打开扫描器**: 点击页面右下角的 🎨 按钮
2. **开始扫描**: 点击 "Scan Styles" 按钮开始扫描页面
3. **查看结果**: 浏览扫描到的 CSS 类列表
4. **搜索过滤**: 使用搜索框或过滤标签缩小结果范围
5. **交互检查**: 点击任意类卡片查看详情并高亮对应元素
6. **导出数据**: 点击 "Export" 按钮下载扫描结果

## 类型识别

### Utility Classes (工具类)
自动识别常见的工具类模式：
- `m-*`, `p-*`: margin 和 padding
- `w-*`, `h-*`: width 和 height
- `text-*`, `font-*`: 文字样式
- `bg-*`, `border-*`: 背景和边框
- `flex`, `grid`, `block`: 布局
- `rounded-*`, `shadow-*`: 效果

### Component Classes (组件类)
识别组件相关的类：
- 大写字母开头的类
- 常见组件关键词：`btn`, `card`, `modal`, `navbar` 等

### Custom Classes (自定义类)
其他不符合工具类和组件类模式的自定义类

## 开发

```bash
# 安装依赖
pnpm install

# 启动开发模式（监听文件变化）
pnpm dev

# 运行 playground 进行测试
pnpm play

# 构建生产版本
pnpm build

# 类型检查
pnpm typecheck

# 代码检查
pnpm lint
```

## 使用场景

1. **样式审计**: 分析项目中使用的 CSS 类
2. **重构准备**: 识别未使用或过度使用的类
3. **样式统计**: 了解项目的样式复杂度
4. **团队协作**: 分享样式使用情况给团队成员
5. **性能优化**: 识别可以合并或删除的样式

## 注意事项

- 扫描器会忽略包含 `scanner-` 前缀的类，避免扫描自身
- 大型页面的扫描可能需要几秒钟时间
- 跨域样式表可能无法完全分析
- 点击类卡片后的高亮效果会在 3 秒后自动消失

## License

MIT © [Chris](https://github.com/zyyv)
