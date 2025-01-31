import type { FlatConfigItem } from '../../types'

import createCommands from 'eslint-plugin-command/config'

export async function commands(): Promise<FlatConfigItem[]> {
  return [
    {
      ...createCommands(),
      name: 'skiyee/commands/rules',
    },
  ]
}
