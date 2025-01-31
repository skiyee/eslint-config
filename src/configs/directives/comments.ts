import type { FlatConfigItem } from '../../types'

// @ts-expect-error pass check
import pluginComments from '@eslint-community/eslint-plugin-eslint-comments'

/**
 * Additional ESLint rules for ESLint directive comments (e.g. //eslint-disable-line).
 */
export async function comments(): Promise<FlatConfigItem[]> {
  return [
    {
      name: 'skiyee/eslint-comments/rules',
      plugins: {
        'eslint-comments': pluginComments,
      },
      rules: {
        'eslint-comments/no-aggregating-enable': 'error',
        'eslint-comments/no-duplicate-disable': 'error',
        'eslint-comments/no-unlimited-disable': 'error',
        'eslint-comments/no-unused-enable': 'error',
      },
    },
  ]
}
