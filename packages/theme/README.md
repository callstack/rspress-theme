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
import { defineConfig } from '@rspress/shared';
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
  HomeBanner,
  HomeFeature,
  HomeFooter,
  HomeHero,
  OutlineCTA,
  PrevNextPage,
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
export { Layout, HomeLayout, PrevNextPage, HomeFeature, HomeHero };
// Don't forget to export the default theme components which are not overridden
export * from 'rspress/theme';
```

### Importing Components

You can import components from the theme as named imports:

```ts
import { Announcement } from '@callstack/rspress-theme';

// Use the component in your code
```
