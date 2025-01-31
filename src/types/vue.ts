import type { Options as VueBlocksOptions } from 'eslint-processor-vue-blocks'

import type {
  OptionFiles,
  OptionOverrides,
  OptionStylistic,
  OptionTypeScriptEnable,
} from '../types'

export interface OptionVue extends OptionOverrides {
  /**
   * Create virtual files for Vue SFC blocks to enable linting.
   *
   * @see https://github.com/antfu/eslint-processor-vue-blocks
   * @default true
   */
  sfcBlocks?: boolean | VueBlocksOptions;

  /**
   * Vue version. Apply different rules set from `eslint-plugin-vue`.
   *
   * @default 3
   */
  vueVersion?: 2 | 3;
}

export interface VueOptions extends OptionFiles, OptionTypeScriptEnable, OptionOverrides, OptionStylistic, OptionVue { }
