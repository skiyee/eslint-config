import type { FlatConfigItem, FormatterOptions, PartialStylisticOptions, VendoredPrettierOptions, VendoredPrettierRuleOptions } from '../../types'

import { GLOB_CSS, GLOB_GRAPHQL, GLOB_HTML, GLOB_LESS, GLOB_POSTCSS, GLOB_SCSS, GLOB_SVG } from '../../helper/globs'
import { ensurePackages, interopDefault, isPackageInScope, parserPlain } from '../../helper/utils'
import { StylisticConfigDefaults } from '../index'

function mergePrettierOptions(
  options: VendoredPrettierOptions,
  overrides: VendoredPrettierRuleOptions = {},
): VendoredPrettierRuleOptions {
  return {
    ...options,
    ...overrides,
    plugins: [
      ...(overrides.plugins || []),
      ...(options.plugins || []),
    ],
  }
}

export async function formatters(
  options: FormatterOptions | true = {},
  stylistic: PartialStylisticOptions = {},
): Promise<FlatConfigItem[]> {
  if (options === true) {
    const isPrettierPluginXmlInScope = isPackageInScope('@prettier/plugin-xml')
    options = {
      css: true,
      graphql: true,
      html: true,
      markdown: true,
      svg: isPrettierPluginXmlInScope,
    }
  }

  await ensurePackages([
    'eslint-plugin-format',
  ])

  const {
    indent,
    quotes,
    semi,
  } = {
    ...StylisticConfigDefaults,
    ...stylistic,
  }

  const prettierOptions: VendoredPrettierOptions = Object.assign(
    {
      endOfLine: 'auto',
      printWidth: 120,
      semi,
      singleQuote: quotes === 'single',
      tabWidth: typeof indent === 'number' ? indent : 2,
      trailingComma: 'all',
      useTabs: indent === 'tab',
    } satisfies VendoredPrettierOptions,
    options.prettierOptions || {},
  )

  const prettierXmlOptions: VendoredPrettierOptions = {
    xmlQuoteAttributes: 'double',
    xmlSelfClosingSpace: true,
    xmlSortAttributesByKey: false,
    xmlWhitespaceSensitivity: 'ignore',
  }

  const pluginFormat = await interopDefault(import('eslint-plugin-format'))

  const configs: FlatConfigItem[] = [
    {
      name: 'skiyee/formatter/setup',
      plugins: {
        format: pluginFormat,
      },
    },
  ]

  if (options.css) {
    configs.push(
      {
        files: [GLOB_CSS, GLOB_POSTCSS],
        languageOptions: {
          parser: parserPlain,
        },
        name: 'skiyee/formatter/css',
        rules: {
          'format/prettier': ['error', mergePrettierOptions(prettierOptions, {
            parser: 'css',
          })],
        },
      },
      {
        files: [GLOB_SCSS],
        languageOptions: {
          parser: parserPlain,
        },
        name: 'skiyee/formatter/scss',
        rules: {
          'format/prettier': ['error', mergePrettierOptions(prettierOptions, {
            parser: 'scss',
          })],
        },
      },
      {
        files: [GLOB_LESS],
        languageOptions: {
          parser: parserPlain,
        },
        name: 'skiyee/formatter/less',
        rules: {
          'format/prettier': ['error', mergePrettierOptions(prettierOptions, {
            parser: 'less',
          })],
        },
      },
    )
  }

  if (options.html) {
    configs.push({
      files: [GLOB_HTML],
      languageOptions: {
        parser: parserPlain,
      },
      name: 'skiyee/formatter/html',
      rules: {
        'format/prettier': ['error', mergePrettierOptions(prettierOptions, {
          parser: 'html',
        })],
      },
    })
  }

  if (options.svg) {
    configs.push({
      files: [GLOB_SVG],
      languageOptions: {
        parser: parserPlain,
      },
      name: 'skiyee/formatter/svg',
      rules: {
        'format/prettier': [
          'error',
          mergePrettierOptions({ ...prettierXmlOptions, ...prettierOptions }, {
            parser: 'xml',
            plugins: [
              '@prettier/plugin-xml',
            ],
          }),
        ],
      },
    })
  }

  if (options.graphql) {
    configs.push({
      files: [GLOB_GRAPHQL],
      languageOptions: {
        parser: parserPlain,
      },
      name: 'skiyee/formatter/graphql',
      rules: {
        'format/prettier': [
          'error',
          mergePrettierOptions(prettierOptions, {
            parser: 'graphql',
          }),
        ],
      },
    })
  }

  return configs
}
