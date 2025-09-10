# Callstack Rspress Preset

## Installation

To install the `@callstack/rspress-preset` package, use your package manager of choice.

```bash
npm install @callstack/rspress-preset
# or
yarn add @callstack/rspress-preset
# or
pnpm add @callstack/rspress-preset
# or
bun add @callstack/rspress-preset
```

## Usage

To use the `rspress-theme` package, you need to add the plugin to the Rspress configuration in the plugin section. You can also import components through named imports like `Announcement`. These components can be used in your `.mdx` files or added to the layout as described in the [guide](https://rspress.dev/guide/advanced/custom-theme#extensions-based-on-the-default-theme).

> The plugin automatically injects overrides for the default theme as well as theme icons. There is no need to create overrides manually via `theme/index.tsx`.

### Adding the Plugin

In your `rspress.config.ts` file, import `pluginCallstackTheme` from `@callstack/rspress-theme/plugin` and add it to the plugins array:

```ts
import { defineConfig } from '@rspress/core';
import { pluginCallstackTheme } from '@callstack/rspress-theme/plugin';

export default defineConfig({
  plugins: [
    pluginCallstackTheme(),
    // other plugins
  ],
});
```
