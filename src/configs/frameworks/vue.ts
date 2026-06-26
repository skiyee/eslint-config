import type {
  FlatConfigItem,
  VueOptions,
} from '../../types'

import { mergeProcessors } from 'eslint-merge-processors'

import { GLOB_VUE } from '../../helper/globs'
import { interopDefault } from '../../helper/utils'

export async function vue(
  options: VueOptions = {},
): Promise<FlatConfigItem[]> {
  const {
    files = [GLOB_VUE],
    overrides = {},
    stylistic = true,
    vueVersion = 3,
  } = options

  const sfcBlocks = options.sfcBlocks === true
    ? {}
    : options.sfcBlocks ?? {}

  const {
    indent = 2,
  } = typeof stylistic === 'boolean' ? {} : stylistic

  const [
    pluginVue,
    parserVue,
    processorVueBlocks,
  ] = await Promise.all([
    interopDefault(import('eslint-plugin-vue')),
    interopDefault(import('vue-eslint-parser')),
    interopDefault(import('eslint-processor-vue-blocks')),
  ] as const)

  return [
    {
      languageOptions: {
        globals: {
          computed: 'readonly',
          defineEmits: 'readonly',
          defineExpose: 'readonly',
          defineProps: 'readonly',
          onMounted: 'readonly',
          onUnmounted: 'readonly',
          reactive: 'readonly',
          ref: 'readonly',
          shallowReactive: 'readonly',
          shallowRef: 'readonly',
          toRef: 'readonly',
          toRefs: 'readonly',
          uni: 'readonly',
          uniCloud: 'readonly',
          watch: 'readonly',
          watchEffect: 'readonly',
        },
      },
      // This allows Vue plugin to work with auto imports
      // https://github.com/vuejs/eslint-plugin-vue/pull/2422
      name: 'skiyee/vue/setup',
      plugins: {
        vue: pluginVue,
      },
    },
    {
      files,
      languageOptions: {
        parser: parserVue,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          extraFileExtensions: ['.vue'],
          parser: options.typescript
            ? await interopDefault(import('@typescript-eslint/parser')) as any
            : null,
          sourceType: 'module',
        },
      },
      name: 'skiyee/vue/rules',
      processor: sfcBlocks === false
        ? pluginVue.processors['.vue']
        : mergeProcessors([
            pluginVue.processors['.vue'],
            processorVueBlocks({
              ...sfcBlocks,
              blocks: {
                styles: true,
                ...sfcBlocks.blocks,
              },
            }),
          ]),
      rules: {
        ...pluginVue.configs.base.rules as any,

        ...vueVersion === 2
          ? {
              ...pluginVue.configs.essential.rules as any,
              ...pluginVue.configs['strongly-recommended'].rules as any,
              ...pluginVue.configs.recommended.rules as any,
            }
          : {
              ...pluginVue.configs['vue3-essential'].rules as any,
              ...pluginVue.configs['vue3-strongly-recommended'].rules as any,
              ...pluginVue.configs['vue3-recommended'].rules as any,
            },

        'node/prefer-global/process': 'off',
        'ts/explicit-function-return-type': 'off',

        'vue/block-order': ['error', {
          order: ['script', 'template', 'style'],
        }],
        // only allows <script setup>.
        'vue/component-api-style': ['error', ['script-setup']],
        'vue/component-name-in-template-casing': ['error', 'PascalCase', {
          globals: [
            // VueRouter
            'RouterView', 'RouterLink',
            // Oiyo
            'OiyoLayout', 'OiyoPage',
          ],
          ignores: [
            /** UniApp 内置组件 */
            // 视图容器类
            'scroll-view',
            'view',
            'swiper',
            'swiper-item',
            'match-media',
            'movable-area',
            'movable-view',
            'cover-view',
            'cover-image',

            // 基础内容类
            'icon',
            'text',
            'rich-text',
            'progress',

            // 表单交互类
            'button',
            'form',
            'input',
            'textarea',
            'checkbox',
            'checkbox-group',
            'radio',
            'radio-group',
            'switch',
            'slider',
            'picker',
            'picker-view',
            'picker-view-column',
            'label',
            'editor',

            // 媒体类
            'image',
            'video',
            'audio',
            'camera',
            'live-player',
            'live-pusher',

            // 地图与画布类
            'map',
            'canvas',

            // 导航与其他类
            'navigator',
            'web-view',
            'page-meta',
            'navigation-bar',
            'custom-tab-bar',

            // 广告类
            'ad',
            'ad-draw',

            // uniCloud 相关内置组件
            'unicloud-db',

            // 小程序专有内置组件 (依平台支持情况而定)
            'open-data',
            'official-account',
          ],
          registeredComponentsOnly: false,
        }],
        'vue/component-options-name-casing': ['error', 'PascalCase'],
        // this is deprecated
        'vue/component-tags-order': 'off',
        'vue/custom-event-name-casing': ['error', 'camelCase'],
        'vue/define-macros-order': ['error', {
          order: ['defineOptions', 'defineProps', 'defineModel', 'defineEmits', 'defineSlots'],
        }],
        'vue/dot-location': ['error', 'property'],
        'vue/dot-notation': ['error', { allowKeywords: true }],
        'vue/eqeqeq': ['error', 'smart'],
        'vue/html-indent': ['error', indent],
        'vue/html-quotes': ['error', 'double'],
        'vue/max-attributes-per-line': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/no-dupe-keys': 'off',
        'vue/no-empty-pattern': 'error',
        'vue/no-irregular-whitespace': 'error',
        'vue/no-loss-of-precision': 'error',
        'vue/no-restricted-syntax': [
          'error',
          'DebuggerStatement',
          'LabeledStatement',
          'WithStatement',
        ],
        'vue/no-restricted-v-bind': ['error', '/^v-/'],
        'vue/no-setup-props-reactivity-loss': 'off',
        'vue/no-sparse-arrays': 'error',
        'vue/no-unused-refs': 'error',
        'vue/no-useless-v-bind': 'error',
        'vue/no-v-html': 'off',
        'vue/object-shorthand': [
          'error',
          'always',
          {
            avoidQuotes: true,
            ignoreConstructors: false,
          },
        ],
        'vue/prefer-separate-static-class': 'error',
        'vue/prefer-template': 'error',
        'vue/prop-name-casing': ['error', 'camelCase'],
        'vue/require-default-prop': 'off',
        'vue/require-prop-types': 'off',
        'vue/space-infix-ops': 'error',
        'vue/space-unary-ops': ['error', { nonwords: false, words: true }],

        ...stylistic
          ? {
              'vue/array-bracket-spacing': ['error', 'never'],
              'vue/arrow-spacing': ['error', { after: true, before: true }],
              'vue/block-spacing': ['error', 'always'],
              'vue/block-tag-newline': ['error', {
                multiline: 'always',
                singleline: 'always',
              }],
              'vue/brace-style': ['error', '1tbs', { allowSingleLine: false }],
              'vue/comma-dangle': ['error', 'always-multiline'],
              'vue/comma-spacing': ['error', { after: true, before: false }],
              'vue/comma-style': ['error', 'last'],
              'vue/html-comment-content-spacing': ['error', 'always', {
                exceptions: ['-'],
              }],
              'vue/key-spacing': ['error', { afterColon: true, beforeColon: false }],
              'vue/keyword-spacing': ['error', { after: true, before: true }],
              'vue/object-curly-newline': 'off',
              'vue/object-curly-spacing': ['error', 'always'],
              'vue/object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
              'vue/operator-linebreak': ['error', 'before'],
              'vue/padding-line-between-blocks': ['error', 'always'],
              'vue/quote-props': ['error', 'consistent-as-needed'],
              'vue/space-in-parens': ['error', 'never'],
              'vue/template-curly-spacing': 'error',
            }
          : {},

        ...overrides,
      },
    },
  ]
}
