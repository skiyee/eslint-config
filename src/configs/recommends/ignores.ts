import type { FlatConfigItem } from '../../types'

import { GLOB_EXCLUDE } from '../../helper/globs'

export async function ignores(userIgnores: string[] = []): Promise<FlatConfigItem[]> {
  return [
    {
      ignores: [
        ...GLOB_EXCLUDE,
        ...userIgnores,
      ],
      name: 'skiyee/ignores',
    },
  ]
}
