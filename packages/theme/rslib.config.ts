import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { type LibConfig, defineConfig } from '@rslib/core';

const isDev = process.env.NODE_ENV === 'development';

const pluginConfig: LibConfig = {
  syntax: 'es2021',
  source: {
    entry: { index: './src/plugin/index.ts' },
    tsconfigPath: './tsconfig.plugin.json',
  },
  output: {
    cleanDistPath: !isDev,
    distPath: { root: './dist/plugin' },
    target: 'node',
  },
};

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
    cleanDistPath: !isDev,
    distPath: { root: './dist' },
    target: 'web',
  },
  plugins: [pluginReact(), pluginSass()],
};

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
});
