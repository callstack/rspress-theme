# Callstack Rspress Theme

## Installation

To install the `@callstack/rspress-theme` package, use your package manager of choice.

For example, with npm:

```bash
npm install @callstack/rspress-theme
```

Or with yarn:

```bash
yarn add @callstack/rspress-theme
```

## Usage

To use the `rspress-theme` package, you need to add the plugin to the Rspress configuration in the plugin section. You can also import components through named imports like `Announcement`. These components can be used in your `.mdx` files or added to the layout as described in the [guide](https://rspress.dev/guide/advanced/custom-theme#extensions-based-on-the-default-theme).

### Adding the Plugin

In your `rspress.config.ts` file, import `pluginCallstackTheme` from `@callstack/rspress-theme/plugin` and add it to the plugins array:

```ts
import { defineConfig } from '@rspress/shared'
import { pluginCallstackTheme } from '@callstack/rspress-theme/plugin'

export default defineConfig({
  plugins: [
    pluginCallstackTheme(),
    // other plugins
  ],
})
```

### Importing Components

You can import components from the theme as named imports:

```ts
import { Announcement } from '@callstack/rspress-theme'

// Use the component in your code
```
