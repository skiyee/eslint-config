# AGENTS.md

## Repo Map
- Single-package repo for `@skiyee/eslint-config`; there is no workspace file or subpackage boundary.
- `src/factory.ts` is the real entrypoint behind `skiyee()`. `src/index.ts` only re-exports.
- `src/configs/*` holds the rule bundles. `scripts/typegen.ts` generates `src/typegen.d.ts`. `dist/` is build output.

## Commands
- Use `pnpm` and the root scripts in `package.json`.
- `pnpm build` runs `pnpm typegen && tsup`; rerun it after changing config composition or exported types.
- `pnpm typecheck` is the main verification step. There is no `test` script in this repo.
- `pnpm lint:fix` is the repo autofix command. For a focused check, use `pnpm exec eslint <path>`.

## Repo Rules
- Do not hand-edit generated files: `src/typegen.d.ts` and `dist/`.
- Keep `eslint.config.ts` aligned with the published package; it lints this repo as a library config (`type: 'lib'`).
- Optional features auto-detect installed deps for TypeScript, Vue, UnoCSS, and Vitest; `javascript`, `jsdoc`, `imports`, `comments`, `commands`, `perfectionist`, and `disables` are always part of the base config.
- Plugin renames are on by default: `@stylistic -> style`, `@typescript-eslint -> ts`, `import-x -> import`, `n -> node`.
- `fixtures` and `_fixtures` are excluded by both `tsconfig.json` and `eslint.config.ts`.
- Commit messages are constrained by `commitlint` to conventional types such as `feat`, `fix`, `docs`, `perf`, `refactor`, `build`, `types`, `chore`, `examples`, `test`, `style`, and `ci`.
