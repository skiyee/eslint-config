import type { FlatConfigItem } from '../../types'

import { GLOB_SRC, GLOB_SRC_EXT } from '../../helper/globs'

/** Optional disabled configs */
export async function disables(): Promise<FlatConfigItem[]> {
  return [
    {
      files: [`**/scripts/${GLOB_SRC}`],
      name: 'skiyee/disable/scripts/rules',
      rules: {
        'no-console': 'off',
        'ts/explicit-function-return-type': 'off',
      },
    },
    {
      files: [`**/cli/${GLOB_SRC}`, `**/cli.${GLOB_SRC_EXT}`],
      name: 'skiyee/disable/cli/rules',
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['**/*.d.?([cm])ts'],
      name: 'skiyee/disable/dts/rules',
      rules: {
        'eslint-comments/no-unlimited-disable': 'off',
        'import/no-duplicates': 'off',
        'no-restricted-syntax': 'off',
        'unused-imports/no-unused-vars': 'off',
      },
    },
    {
      files: ['**/*.js', '**/*.cjs'],
      name: 'skiyee/disable/cjs/rules',
      rules: {
        'ts/no-require-imports': 'off',
      },
    },
    {
      files: [`**/*.config.${GLOB_SRC_EXT}`, `**/*.config.*.${GLOB_SRC_EXT}`],
      name: 'skiyee/disable/config/rules',
      rules: {
        'no-console': 'off',
        'ts/explicit-function-return-type': 'off',
      },
    },
  ]
}
