import type { FlatConfigItem } from '../../types'

import { GLOB_JSX, GLOB_TSX } from '../../helper/globs'

export async function jsx(): Promise<FlatConfigItem[]> {
  return [
    {
      files: [GLOB_JSX, GLOB_TSX],
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      name: 'skiyee/jsx/setup',
    },
  ]
}
