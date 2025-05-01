# @skiyee/eslint-config

[![npm](https://img.shields.io/npm/v/@skiyee/eslint-config?color=a1b858&label=)](https://npmjs.com/package/@skiyee/eslint-config)

> 一套完整的 ESLint 配置，支持 JavaScript、TypeScript、Vue 等多种框架和语言。
>
> Inspired by [antfu/eslint-config](https://github.com/antfu/eslint-config)

## 特点

- 📦 开箱即用的配置，无需繁琐设置
- 🎯 基于 [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files-new) 的现代配置方式
- 🔍 支持 JavaScript、TypeScript、Vue、JSON 等多种语言和框架
- 🔧 内置多种实用插件，包括代码风格、导入排序、正则检查等
- 🚀 自动检测项目依赖，按需启用相应规则
- 🧩 高度可定制，支持灵活的配置选项

## 安装

```bash
# 使用 npm
npm install -D eslint @skiyee/eslint-config

# 使用 yarn
yarn add -D eslint @skiyee/eslint-config

# 使用 pnpm
pnpm add -D eslint @skiyee/eslint-config
```

## 使用方法

在项目根目录创建 `eslint.config.js` 或 `eslint.config.mjs` 文件：

```js
// eslint.config.js
import { skiyee } from '@skiyee/eslint-config'

export default skiyee()
```

或者使用 TypeScript 配置（`eslint.config.ts`）：

```ts
// eslint.config.ts
import { skiyee } from '@skiyee/eslint-config'

export default skiyee()
```

### 配置选项

`skiyee()` 函数接受多个配置参数，第一个参数为全局配置选项，后续参数为额外的 ESLint 配置项。

```ts
export default skiyee(
  // 全局配置选项
  {
    // 启用 TypeScript 支持
    typescript: true,

    // 启用 Vue 支持
    vue: true,

    // 启用格式化工具
    formatters: true,

    // 项目类型：'app' 或 'lib'
    type: 'app',

    // 启用代码风格规则
    stylistic: true,

    // 启用 JSX 支持
    jsx: true,

    // 启用 JSONC 支持
    jsonc: true,

    // 启用正则表达式规则
    regexp: true,

    // 启用 Unicorn 插件规则
    unicorn: true,

    // 启用 UnoCSS 支持
    unocss: false,

    // 启用 Vitest 支持
    vitest: false,
  },

  // 额外的 ESLint 配置项
  {
    // 忽略特定文件或目录
    ignores: [
      'dist',
      'node_modules',
    ],
  },

  // 自定义规则配置
  {
    // 为特定文件应用规则
    files: ['src/**/*.ts'],
    rules: {
      'perfectionist/sort-objects': 'error',
    },
  },
)
```

## 支持的功能

### 语言和文件类型

- JavaScript / TypeScript / JSX / TSX
- Vue (自动检测)
- JSON / JSONC / JSON5
- YAML
- Markdown
- 各种配置文件 (如 `.gitignore`)

### 集成的插件和规则

- [@typescript-eslint/eslint-plugin](https://typescript-eslint.io/) - TypeScript 支持
- [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue) - Vue 支持
- [@stylistic/eslint-plugin](https://github.com/eslint-stylistic/eslint-stylistic) - 代码风格规则
- [eslint-plugin-import-x](https://github.com/un-ts/eslint-plugin-import-x) - 导入语句检查
- [eslint-plugin-jsonc](https://github.com/ota-meshi/eslint-plugin-jsonc) - JSON 支持
- [eslint-plugin-n](https://github.com/eslint-community/eslint-plugin-n) - Node.js 支持
- [eslint-plugin-regexp](https://github.com/ota-meshi/eslint-plugin-regexp) - 正则表达式检查
- [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn) - 更多实用规则
- [eslint-plugin-perfectionist](https://github.com/azat-io/eslint-plugin-perfectionist) - 排序规则
- [eslint-plugin-format](https://github.com/antfu/eslint-plugin-format) - 文件格式化支持
- 以及更多...

## 配置示例

### 基本配置

```ts
// eslint.config.ts
import { skiyee } from '@skiyee/eslint-config'

export default skiyee()
```

### 前端应用配置

```ts
// eslint.config.ts
import { skiyee } from '@skiyee/eslint-config'

export default skiyee({
  vue: true,
  typescript: true,
  formatters: true,
})
```

### 库项目配置

```ts
// eslint.config.ts
import { skiyee } from '@skiyee/eslint-config'

export default skiyee({
  typescript: true,
  type: 'lib', // 为库项目启用更严格的规则
})
```

### 自定义规则

```ts
// eslint.config.ts
import { skiyee } from '@skiyee/eslint-config'

export default skiyee(
  {
    typescript: true,
    vue: true,
  },
  // 自定义规则
  {
    rules: {
      'no-console': 'warn',
      'style/semi': ['error', 'always'],
    },
  },
  // 为特定文件应用规则
  {
    files: ['src/components/**/*.vue'],
    rules: {
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    },
  },
)
```

## 许可证

[MIT](./LICENSE) License © 2023 [skiyee](https://github.com/skiyee)