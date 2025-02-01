import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
  ],
  dts: true,
  clean: true,
  shims: true,
  format: ['esm', 'cjs'],
})
