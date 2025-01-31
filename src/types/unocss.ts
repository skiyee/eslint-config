import type { OptionOverrides } from '../types'

export interface UnoCSSOptions extends OptionOverrides {
  /**
   * Enable attributify support.
   * @default true
   */
  attributify?: boolean;
  /**
   * Enable strict mode by throwing errors about blocklisted classes.
   * @default false
   */
  strict?: boolean;
}

export type OptionUnoCSS = UnoCSSOptions
