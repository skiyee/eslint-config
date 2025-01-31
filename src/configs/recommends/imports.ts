import type { FlatConfigItem, ImportsOptions } from '../../types'

import pluginImport from 'eslint-plugin-import-x'

/**
 * This plugin intends to support linting of ES2015+ (ES6+) import/export syntax,
 * and prevent issues with misspelling of file paths and import names.
 * All the goodness that the ES2015+ static module syntax intends to provide, marked up in your editor.
 */
export async function imports(options: ImportsOptions = {}): Promise<FlatConfigItem[]> {
  const {
    stylistic = true,
  } = options

  return [
    {
      name: 'skiyee/imports/rules',
      plugins: {
        import: pluginImport,
      },
      rules: {
        'import/first': 'off',
        'import/no-duplicates': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',
        'import/no-self-import': 'error',
        'import/no-webpack-loader-syntax': 'error',

        ...stylistic
          ? {
              'import/newline-after-import': ['error', { count: 1 }],
            }
          : {},
      },
    },
  ]
}
