import { pluginImageCompress } from '@rsbuild/plugin-image-compress';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { defineConfig, type LibConfig } from '@rslib/core';

const pluginConfig: LibConfig = {
  syntax: 'es2021',
  source: {
    entry: { index: './src/plugin/index.ts', theme: './src/plugin/theme.ts' },
    tsconfigPath: './tsconfig.plugin.json',
  },
  output: {
    distPath: { root: './dist/plugin' },
    externals: ['@callstack/rspress-theme', '@default-theme', 'react'],
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
    distPath: { root: './dist' },
    externals: ['@theme'],
    target: 'web',
    copy: [
      { from: './src/styles', to: 'styles' },
      { from: './src/assets', to: 'assets' },
    ],
  },
  plugins: [pluginImageCompress(), pluginReact(), pluginSass(), pluginSvgr()],
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
