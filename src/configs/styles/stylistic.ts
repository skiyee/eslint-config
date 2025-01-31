import type { FlatConfigItem, PartialStylisticOptions, StylisticOptions } from '../../types'

import { interopDefault } from '../../helper/utils'

export const StylisticConfigDefaults: PartialStylisticOptions = {
  indent: 2,
  jsx: true,
  quotes: 'single',
  semi: false,
}

export async function stylistic(
  options: StylisticOptions = {},
): Promise<FlatConfigItem[]> {
  const {
    indent,
    jsx,
    overrides = {},
    quotes,
    semi,
  } = {
    ...StylisticConfigDefaults,
    ...options,
  }

  const pluginStylistic = await interopDefault(import('@stylistic/eslint-plugin'))

  const config = pluginStylistic.configs.customize({
    flat: true,
    indent,
    jsx,
    pluginName: 'style',
    quotes,
    semi,
  })

  return [
    {
      name: 'skiyee/stylistic',
      plugins: {
        style: pluginStylistic,
      },
      rules: {
        ...config.rules,

        'curly': ['error', 'all'],

        'style/brace-style': ['error', '1tbs', { allowSingleLine: false }],
        'style/member-delimiter-style': ['error', { multiline: { delimiter: 'semi' } }],

        ...overrides,
      },
    },
  ]
}
