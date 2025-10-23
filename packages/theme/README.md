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

> **Important**: Since this theme is based on Rspress beta, you must match the exact beta version of `@rspress/core` and `@rspress/shared`. The theme is tightly coupled to the beta API and may break with version mismatches. Once Rspress 2 is stable, this requirement will likely become more flexible.

### Adding the `Alliance No. 2 Font`

The theme uses **Alliance No. 2** as the header font family. This is a licensed font that can only be used with Callstack projects. This font is already configured and included with the theme—no additional setup is required.

If you want to use a different header font instead, see [Replacing the Alliance No. 2 Font](#replacing-the-alliance-no-2-font) for instructions.

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

### Configurable options

You can customize texts and links used by built‑in components through the plugin options. All options are optional.

- **content** (consumed by components):
  - **docFooterCTAHeadline**: Used by `DocFooterCTA` (rendered after doc content).
  - **docFooterCTAButtonText**: Used by `DocFooterCTA` (rendered after doc content).
  - **homeBannerHeadline**: Used by `HomeBanner` (rendered on the home page after features).
  - **homeBannerDescription**: Used by `HomeBanner` (rendered on the home page after features).
  - **homeBannerButtonText**: Used by `HomeBanner` (rendered on the home page after features).
  - **outlineCTAHeadline**: Used by `OutlineCTA` (rendered below the outline on doc pages).
  - **outlineCTADescription**: Used by `OutlineCTA` (rendered below the outline on doc pages).
  - **outlineCTAButtonText**: Used by `OutlineCTA` (rendered below the outline on doc pages).

- **links** (target URLs for calls to action):
  - **docFooterCTA**: Button link in `DocFooterCTA`.
  - **homeBanner**: Button link in `HomeBanner`.
  - **homeFooter**: Logo link in `HomeFooter`.
  - **outlineCTA**: Button link in `OutlineCTA`.

Example usage in `rspress.config.ts`:

```ts
import { defineConfig } from '@rspress/core';
import { pluginCallstackTheme } from '@callstack/rspress-theme/plugin';

export default defineConfig({
  plugins: [
    pluginCallstackTheme({
      content: {
        docFooterCTAHeadline: 'Need expert help?',
        docFooterCTAButtonText: 'Contact us',
        homeBannerHeadline: 'Build better apps, faster',
        homeBannerDescription: 'We partner with teams to ship quality software.',
        homeBannerButtonText: 'Get in touch',
        outlineCTAHeadline: 'Performance issues?',
        outlineCTADescription: 'We can help you diagnose and fix bottlenecks.',
        outlineCTAButtonText: 'Schedule a chat',
      },
      links: {
        docFooterCTA: 'https://example.com/contact',
        homeBanner: 'https://example.com/contact',
        homeFooter: 'https://example.com',
        outlineCTA: 'https://example.com/performance',
      },
    }),
  ],
});
```

Note: The plugin also applies default `themeConfig` values when missing, which you can override in your Rspress config:

```ts
export default defineConfig({
  themeConfig: {
    outlineTitle: 'Contents', // default
    overview: { filterNameText: '' }, // default
    searchNoResultsText: 'No results found, try something different than', // default
    searchSuggestedQueryText: '', // default
  },
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

### Replacing `Alliance No. 2 Font`

To use a different header font, you can modify the `var(--ck-header-font-family)` CSS variable. You can add this CSS to your `styles.css` file or any other global stylesheet that's loaded by your Rspress configuration:

1. **Create a `styles.css` file** in `theme` directory (or create the theme directory if needed).

2. **Define CSS Variable** in your `styles.css` file:

```css
:root {
  --ck-header-font-family: 'Your Custom Font', sans-serif;
}
```

3. **Link the styles in your Rspress config** by adding the `globalStyles` option:

```ts
import path from 'node:path';
import { defineConfig } from '@rspress/core';
import { pluginCallstackTheme } from '@callstack/rspress-theme/plugin';

export default defineConfig({
  plugins: [pluginCallstackTheme()],
  globalStyles: path.join(__dirname, './theme/styles.css'),
});
```
