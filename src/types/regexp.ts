import type { OptionOverrides } from './index'

export interface OptionRegExp {
  /**
   * Override rule levels
   */
  level?: 'error' | 'warn';
}

export interface RegexpOptions extends OptionRegExp, OptionOverrides {}
