import { defineConfig, LibConfig } from '@rslib/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginSass } from '@rsbuild/plugin-sass'

const pluginConfig: LibConfig = {
  syntax: 'es2021',
  source: {
    entry: { index: './src/index.ts' },
    tsconfigPath: './tsconfig.plugin.json',
  },
}

const themeConfig: LibConfig = {
  banner: {
    js: ['// inject component styles', 'import "./index.css"'].join('\n'),
  },
  syntax: 'es2021',
  source: {
    entry: { index: './src/theme/index.ts' },
    tsconfigPath: './tsconfig.theme.json',
  },
  output: {
    distPath: { root: './dist/theme' },
    target: 'web',
  },
  plugins: [pluginReact(), pluginSass()],
}

export default defineConfig({
  lib: [
    {
      ...themeConfig,
      id: 'theme-esm',
      format: 'esm',
      dts: { bundle: true },
    },
    {
      ...pluginConfig,
      id: 'plugin-esm',
      format: 'esm',
      dts: true,
    },
    {
      ...pluginConfig,
      id: 'plugin-cjs',
      format: 'cjs',
    },
  ],
})
