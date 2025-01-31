import type { FlatConfigItem, UnoCSSOptions } from '../../types'

import { ensurePackages, interopDefault } from '../../helper/utils'

export async function unocss(
  options: UnoCSSOptions = {},
): Promise<FlatConfigItem[]> {
  const {
    attributify = true,
    strict = true,
  } = options

  await ensurePackages(['@unocss/eslint-plugin'])

  const [
    pluginUnoCSS,
  ] = await Promise.all([
    interopDefault(import('@unocss/eslint-plugin')),
  ] as const)

  return [
    {
      name: 'skiyee/unocss/rules',
      plugins: {
        unocss: pluginUnoCSS,
      },
      rules: {
        'unocss/order': 'warn',

        ...attributify
          ? {
              'unocss/order-attributify': 'warn',
            }
          : {},

        ...strict
          ? {
              'unocss/blocklist': 'error',
            }
          : {},
      },
    },
  ]
}
