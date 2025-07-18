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

### Adding the Alliance No. 2 Font

The theme uses **Alliance No. 2** as the header font family. This is a licensed font that you need to add to your project manually.

1. **Create a `styles.css` file** in your project root or in a `styles` directory.

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
import { defineConfig } from 'rspress/core';
import { pluginCallstackTheme } from '@callstack/rspress-theme/plugin';

export default defineConfig({
  plugins: [pluginCallstackTheme()],
  globalStyles: './styles.css', // or the path to your styles.css file
});
```

## Usage

To use the `rspress-theme` package, you need to add the plugin to the Rspress configuration in the plugin section. You can also import components through named imports like `Announcement`. These components can be used in your `.mdx` files or added to the layout as described in the [guide](https://rspress.dev/guide/advanced/custom-theme#extensions-based-on-the-default-theme).

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

### Overriding the Default Theme

> Learn more about theme customization in the [Rspress documentation](https://v2.rspress.rs/guide/advanced/custom-theme#extensions-based-on-the-default-theme).

To take full advantage of the theme components, you should create or modify a `theme/index.tsx` file in your project. This file acts as the entry point for your theme customizations and component overrides. Here’s an example setup:

```tsx
// theme/index.tsx
import {
  Announcement,
  Button,
  HomeBanner,
  HomeFeature,
  HomeFooter,
  HomeHero,
  LinkCard,
  OutlineCTA,
  PrevNextPage,
  VersionBadge,
} from '@callstack/rspress-theme';
import {
  HomeLayout as RspressHomeLayout,
  Layout as RspressLayout,
} from 'rspress/theme';

// You can customize the default Layout and HomeLayout like this:
const Layout = () => (
  <RspressLayout
    beforeNav={
      <Announcement
        href="./guide"
        message="Announcement Test"
        localStorageKey=""
      />
    }
    afterOutline={<OutlineCTA href="https://callstack.com" />}
  />
);

const HomeLayout = () => (
  <RspressHomeLayout
    afterFeatures={
      <>
        <HomeBanner href="https://callstack.com" />
        <HomeFooter />
      </>
    }
  />
);

// Export your custom layouts and any components you want available via '@theme'
export {
  Layout,
  HomeLayout,
  Button,
  PrevNextPage,
  HomeFeature,
  HomeHero,
  LinkCard,
  VersionBadge,
  Announcement,
};
// Don't forget to export the default theme components which are not overridden
export * from 'rspress/theme';
```

### Copying Assets

To override the default assets and replace them with the Callstack theme assets, run the following command:

```bash
npx @callstack/rspress-theme copy-assets <projectDir>
```

This will copy the assets to the `theme/assets` directory in your project.

> Note: This command should be run after you have installed the package and before you start using the theme.

### Importing Components

You can import components from the theme as named imports:

```ts
import { Announcement } from '@callstack/rspress-theme';

// Use the component in your code
```
