import type { Linter } from 'eslint'

import type { RuleOptions } from './typegen'
import type { Awaitable, ConfigNames, FlatConfigItem, SkiyeeEslintConfigOptions } from './types'

import { FlatConfigComposer } from 'eslint-flat-config-utils'
import { isPackageExists } from 'local-pkg'

import {
  commands,
  comments,
  disables,
  formatters,
  ignores,
  imports,
  javascript,
  jsdoc,
  jsonc,
  jsx,
  node,
  perfectionist,
  regexp,
  sortPackageJson,
  sortTsconfig,
  stylistic,
  typescript,
  unicorn,
  unocss,
  vitest,
  vue,
} from './configs'
import { interopDefault, isInEditorEnv } from './helper/utils'

const flatConfigProps = [
  'name',
  'languageOptions',
  'linterOptions',
  'processor',
  'plugins',
  'rules',
  'settings',
] satisfies (keyof FlatConfigItem)[]

const VuePackages = [
  'vue',
  'nuxt',
  'vitepress',
]

export const defaultPluginRenaming = {
  '@stylistic': 'style',

  '@typescript-eslint': 'ts',

  'import-x': 'import',

  'n': 'node',
}

/**
 * Construct an array of ESLint flat config items.
 *
 * @param {SkiyeeEslintConfigOptions & FlatConfigItem} options
 *  The options for generating the ESLint configurations.
 * @param {Awaitable<FlatConfigItem | FlatConfigItem[]>[]} userConfigs
 *  The user configurations to be merged with the generated configurations.
 * @returns {Promise<FlatConfigItem[]>}
 *  The merged ESLint configurations.
 */
export function skiyee(
  options: SkiyeeEslintConfigOptions & Omit<FlatConfigItem, 'files'> = {},
  ...userConfigs: Awaitable<FlatConfigItem | FlatConfigItem[] | FlatConfigComposer<any, any> | Linter.Config[]>[]
): FlatConfigComposer<FlatConfigItem, ConfigNames> {
  const {
    autoRenamePlugins = true,
    componentExts = [],
    gitignore: enableGitignore = true,
    jsonc: enableJsonc = true,
    jsx: enableJsx = true,
    regexp: enableRegexp = true,
    typescript: enableTypeScript = isPackageExists('typescript'),
    unicorn: enableUnicorn = true,
    unocss: enableUnoCSS = false,
    vitest: enableVitest = false,
    vue: enableVue = VuePackages.some(i => isPackageExists(i)),
  } = options

  let isInEditor = options.isInEditor
  if (isInEditor == null) {
    isInEditor = isInEditorEnv()
    if (isInEditor) {
      console.warn('[@skiyee/eslint-config] Detected running in editor, some rules are disabled.')
    }
  }

  const stylisticOptions = options.stylistic === false
    ? false
    : typeof options.stylistic === 'object'
      ? options.stylistic
      : {}

  if (stylisticOptions && !('jsx' in stylisticOptions)) {
    stylisticOptions.jsx = enableJsx
  }

  const configs: Awaitable<FlatConfigItem[]>[] = []

  if (enableGitignore) {
    configs.push(interopDefault(import('eslint-config-flat-gitignore')).then(r => [r({
      name: 'skiyee/gitignore',
      ...{
        ...(typeof enableGitignore !== 'boolean') ? enableGitignore : { strict: false },
      },
    })]))
  }

  const typescriptOptions = resolveSubOptions(options, 'typescript')
  const tsconfigPath = 'tsconfigPath' in typescriptOptions ? typescriptOptions.tsconfigPath : undefined

  // Base configs
  configs.push(
    ignores(options.ignores),
    javascript({
      isInEditor,
      overrides: getOverrides(options, 'javascript'),
    }),
    node(),
    jsdoc({
      stylistic: stylisticOptions,
    }),
    imports({
      stylistic: stylisticOptions,
    }),
    comments(),
    commands(),
    perfectionist(),
    disables(),
  )

  if (enableUnicorn) {
    configs.push(unicorn(enableUnicorn === true ? {} : enableUnicorn))
  }

  if (enableVue) {
    componentExts.push('vue')
  }

  if (enableJsx) {
    configs.push(jsx())
  }

  if (enableTypeScript) {
    configs.push(typescript({
      ...typescriptOptions,
      componentExts,
      overrides: getOverrides(options, 'typescript'),
      type: options.type,
    }))
  }

  if (stylisticOptions) {
    configs.push(stylistic({
      ...stylisticOptions,
      overrides: getOverrides(options, 'stylistic'),
    }))
  }

  if (enableRegexp) {
    configs.push(regexp(typeof enableRegexp === 'boolean' ? {} : enableRegexp))
  }

  if (enableVitest) {
    configs.push(vitest({
      isInEditor,
      overrides: getOverrides(options, 'vitest'),
    }))
  }

  if (enableVue) {
    configs.push(vue({
      ...resolveSubOptions(options, 'vue'),
      overrides: getOverrides(options, 'vue'),
      stylistic: stylisticOptions,
      typescript: !!enableTypeScript,
    }))
  }



  if (enableUnoCSS) {
    configs.push(unocss({
      ...resolveSubOptions(options, 'unocss'),
      overrides: getOverrides(options, 'unocss'),
    }))
  }

  if (enableJsonc) {
    configs.push(
      jsonc({
        overrides: getOverrides(options, 'jsonc'),
        stylistic: stylisticOptions,
      }),
      sortPackageJson(),
      sortTsconfig(),
    )
  }

  if (options.formatters) {
    configs.push(formatters(
      options.formatters,
      typeof stylisticOptions === 'boolean' ? {} : stylisticOptions,
    ))
  }

  if ('files' in options) {
    throw new Error('[@skiyee/eslint-config] The first argument should not contain the "files" property as the options are supposed to be global. Place it in the second or later config instead.')
  }

  // User can optionally pass a flat config item to the first argument
  // We pick the known keys as ESLint would do schema validation
  const fusedConfig = flatConfigProps.reduce((acc, key) => {
    if (key in options) {
      acc[key] = options[key] as any
    }
    return acc
  }, {} as FlatConfigItem)
  if (Object.keys(fusedConfig).length) {
    configs.push([fusedConfig])
  }

  let composer = new FlatConfigComposer<FlatConfigItem, ConfigNames>()

  composer = composer
    .append(
      ...configs,
      ...userConfigs as any,
    )

  if (autoRenamePlugins) {
    composer = composer.renamePlugins(defaultPluginRenaming)
  }

  return composer
}

export type ResolvedOptions<T> = T extends boolean
  ? never
  : NonNullable<T>

export function resolveSubOptions<K extends keyof SkiyeeEslintConfigOptions>(
  options: SkiyeeEslintConfigOptions,
  key: K,
): ResolvedOptions<SkiyeeEslintConfigOptions[K]> {
  return typeof options[key] === 'boolean'
    ? {} as any
    : options[key] || {}
}

export function getOverrides<K extends keyof SkiyeeEslintConfigOptions>(
  options: SkiyeeEslintConfigOptions,
  key: K,
): Partial<Linter.RulesRecord & RuleOptions> {
  const sub = resolveSubOptions(options, key)
  return {
    ...'overrides' in sub
      ? sub.overrides
      : {},
  }
}
