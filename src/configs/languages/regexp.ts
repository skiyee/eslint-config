import type { FlatConfigItem, RegexpOptions } from '../../types'

import { configs } from 'eslint-plugin-regexp'

/** finding RegExp mistakes and RegExp style guide violations. */
export async function regexp(
  options: RegexpOptions = {},
): Promise<FlatConfigItem[]> {
  const config = configs['flat/recommended'] as FlatConfigItem

  const rules = {
    ...config.rules,
  }

  if (options.level === 'warn') {
    for (const key in rules) {
      if (rules[key] === 'error') {
        rules[key] = 'warn'
      }
    }
  }

  return [
    {
      ...config,
      name: 'skiyee/regexp/rules',
      rules: {
        ...rules,
        ...options.overrides,
      },
    },
  ]
}
