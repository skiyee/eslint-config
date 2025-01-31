import type { ParserOptions } from '@typescript-eslint/parser'

import type { FlatConfigItem, OptionComponentExts, OptionFiles, OptionOverrides, OptionProjectType } from './index'

export interface OptionTypeScriptWithTypes {
  /**
   * When this options is provided, type aware rules will be enabled.
   * @see https://typescript-eslint.io/linting/typed-linting/
   */
  tsconfigPath?: string;

  /**
   * Override type aware rules.
   */
  overridesTypeAware?: FlatConfigItem['rules'];
}

export interface OptionTypeScriptParserOptions {
  /**
   * Additional parser options for TypeScript.
   */
  parserOptions?: Partial<ParserOptions>;

  /**
   * Glob patterns for files that should be type aware.
   * @default ['**\/*.{ts,tsx}']
   */
  filesTypeAware?: string[];

  /**
   * Glob patterns for files that should not be type aware.
   * @default ['**\/*.md\/**', '**\/*.astro/*.ts']
   */
  ignoresTypeAware?: string[];
}

export interface OptionTypeScriptEnable {
  typescript?: boolean;
}

export type OptionTypescript =
  (OptionTypeScriptWithTypes & OptionOverrides)
  | (OptionTypeScriptParserOptions & OptionOverrides)

export interface TypescriptOptions extends
  OptionFiles,
  OptionComponentExts,
  OptionOverrides,
  OptionTypeScriptWithTypes,
  OptionTypeScriptParserOptions,
  OptionProjectType { }
