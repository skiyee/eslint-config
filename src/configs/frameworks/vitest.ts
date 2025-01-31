import type { FlatConfigItem, VitestOptions } from '../../types'

import { GLOB_TESTS } from '../../helper/globs'
import { interopDefault } from '../../helper/utils'

export async function vitest(
  options: VitestOptions = {},
): Promise<FlatConfigItem[]> {
  const {
    files = GLOB_TESTS,
    isInEditor = false,
    overrides = {},
  } = options

  const [
    pluginVitest,
    pluginNoOnlyTests,
  ] = await Promise.all([
    interopDefault(import('@vitest/eslint-plugin')),
    // @ts-expect-error missing types
    interopDefault(import('eslint-plugin-no-only-tests')),
  ] as const)

  return [
    {
      name: 'skiyee/vitest/setup',
      plugins: {
        vitest: {
          ...pluginVitest,
          rules: {
            ...pluginVitest.rules,
            // extend `test/no-only-tests` rule
            ...pluginNoOnlyTests.rules,
          },
        },
      },
    },
    {
      files,
      name: 'skiyee/vitest/rules',
      rules: {
        // Disables
        'no-unused-expressions': 'off',
        'node/prefer-global/process': 'off',
        'ts/explicit-function-return-type': 'off',
        'vitest/consistent-test-it': ['error', { fn: 'it', withinDescribe: 'it' }],

        'vitest/no-identical-title': 'error',
        'vitest/no-import-node-test': 'error',

        'vitest/no-only-tests': isInEditor ? 'off' : 'error',
        'vitest/prefer-hooks-in-order': 'error',
        'vitest/prefer-lowercase-title': 'error',

        ...overrides,
      },
    },
  ]
}
