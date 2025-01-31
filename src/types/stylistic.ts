import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'

import type { OptionOverrides } from '../types'

export interface PartialStylisticOptions extends Pick<StylisticCustomizeOptions, 'indent' | 'quotes' | 'jsx' | 'semi'> {}

export interface OptionStylistic {
  stylistic?: boolean | PartialStylisticOptions;
}

export interface StylisticOptions extends PartialStylisticOptions, OptionOverrides {}
