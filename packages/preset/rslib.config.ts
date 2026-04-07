import { defineConfig, type LibConfig } from '@rslib/core';

const presetConfig: LibConfig = {
  syntax: 'es2021',
  output: {
    target: 'node',
  },
};

export default defineConfig({
  lib: [
    {
      ...presetConfig,
      id: 'plugin-esm',
      format: 'esm',
      dts: true,
    },
    {
      ...presetConfig,
      id: 'plugin-cjs',
      format: 'cjs',
    },
  ],
});
