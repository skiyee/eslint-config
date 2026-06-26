import { skiyee } from '@skiyee/eslint-config'

export default skiyee(
  {
    vue: true,
    typescript: true,
    formatters: true,
    type: 'lib',
  },
  {
    ignores: [
      'fixtures',
      '_fixtures',
    ],
  },
  {
    files: ['src/**/*.ts'],
    rules: {
      'perfectionist/sort-objects': 'error',
    },
  },
)
