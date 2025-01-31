import type { OptionFiles, OptionOverrides } from './common'
import type { OptionTypeScriptParserOptions, OptionTypeScriptWithTypes } from './typescript'

export interface ReactOptions extends OptionTypeScriptParserOptions, OptionTypeScriptWithTypes, OptionOverrides, OptionFiles { }
