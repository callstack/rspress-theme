# Callstack Rspress Theme

## Installation

To install the `@callstack/rspress-theme` package, use your package manager of choice.

```bash
npm install @callstack/rspress-theme
# or
yarn add @callstack/rspress-theme
# or
pnpm add @callstack/rspress-theme
# or
bun add @callstack/rspress-theme
```

### Adding the `Alliance No. 2 Font`

The theme uses **Alliance No. 2** as the header font family. This is a licensed font that you need to add to your project manually. See [Adding the Alliance No. 2 Font](#adding-the-alliance-no-2-font) for more details.

Alternatively, you can point to a different header font - see [Replacing the Alliance No. 2 Font](#replacing-the-alliance-no-2-font) for more details.

## Usage

To use the `rspress-theme` package, you need to add the plugin to the Rspress configuration in the plugin section. You can also import components through named imports like `Announcement`. These components can be used in your `.mdx` files or added to the layout as described in the [guide](https://rspress.dev/guide/advanced/custom-theme#extensions-based-on-the-default-theme).

> The plugin automatically injects overrides for the default theme as well as theme icons. There is no need to create overrides manually via `theme/index.tsx`.

### Adding the Plugin

In your `rspress.config.ts` file, import `pluginCallstackTheme` from `@callstack/rspress-theme/plugin` and add it to the plugins array:

```ts
import { defineConfig } from 'rspress/core';
import { pluginCallstackTheme } from '@callstack/rspress-theme/plugin';

export default defineConfig({
  plugins: [
    pluginCallstackTheme(),
    // other plugins
  ],
});
```

### Importing Components

You can import components from the theme as named imports:

```mdx
import { Announcement } from '@callstack/rspress-theme';

// Use the component in your code

<Announcement
  href="./guide"
  message="Announcement Test"
  localStorageKey="announcement-test"
/>
;
```

### Adding `Alliance No. 2 Font`

1. **Create a `styles.css` file** in `theme` directory (or create the theme directory if needed).

2. **Add the font declarations** to your `styles.css` file:

```css
@font-face {
  font-family: 'Alliance No. 2';
  font-style: normal;
  font-weight: 400;
  font-display: block;
  src: url('./fonts/alliance-no-2-regular.ttf') format('truetype');
}

@font-face {
  font-family: 'Alliance No. 2';
  font-style: normal;
  font-weight: 500;
  font-display: block;
  src: url('./fonts/alliance-no-2-medium.ttf') format('truetype');
}
```

3. **Link the styles in your Rspress config** by adding the `globalStyles` option:

```ts
import path from 'node:path';
import { defineConfig } from 'rspress/core';
import { pluginCallstackTheme } from '@callstack/rspress-theme/plugin';

export default defineConfig({
  plugins: [pluginCallstackTheme()],
  globalStyles: path.join(__dirname, './theme/styles.css'),
});
```

### Replacing `Alliance No. 2 Font`

To use a different header font, you can modify the `var(--ck-header-font-family)` CSS variable. You can add this CSS to your `styles.css` file or any other global stylesheet that's loaded by your Rspress configuration:

```css
:root {
  --ck-header-font-family: 'Your Custom Font', sans-serif;
}
```
