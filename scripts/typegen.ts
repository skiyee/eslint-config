import fs from 'node:fs/promises'

import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { builtinRules } from 'eslint/use-at-your-own-risk'

import { combine, comments, formatters, imports, javascript, jsdoc, jsonc, jsx, node, perfectionist, regexp, sortPackageJson, stylistic, typescript, unicorn, unocss, vitest, vue } from '../src'

const configs = await combine(
  {
    plugins: {
      '': {
        rules: Object.fromEntries(builtinRules.entries()),
      },
    },
  },
  comments(),
  formatters(),
  imports(),
  javascript(),
  jsx(),
  jsdoc(),
  jsonc(),
  node(),
  perfectionist(),
  sortPackageJson(),
  stylistic(),
  vitest(),
  regexp(),
  typescript(),
  unicorn(),
  unocss(),
  vue(),
)

const configNames = configs.map(i => i.name).filter(Boolean) as string[]

let dts = await flatConfigsToRulesDTS(configs, {
  includeAugmentation: false,
})

dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map(i => `'${i}'`).join(' | ')}
`

await fs.writeFile('src/typegen.d.ts', dts)
