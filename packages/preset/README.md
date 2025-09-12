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

Use the preset helper `withCallstackPreset` to generate a complete Rspress config from a small set of options, and then merge it with your own overrides if needed.

> The preset wires up the Callstack theme, sensible defaults, sitemap and open-graph plugins, search, clean URLs, and common theme config.

Update your `rspress.config.ts`:

```ts
import { defineConfig } from '@rspress/core';
import { withCallstackPreset } from '@callstack/rspress-preset';

export default withCallstackPreset(
  {
    context: __dirname,
    docs: {
      title: 'My Project',
      description: 'Awesome docs powered by Rspress',
      editUrl: 'https://github.com/org/repo/edit/main',
      rootUrl: 'https://docs.example.com',
      icon: 'icon.ico',
      logoLight: 'logo-light.png',
      logoDark: 'logo-dark.png',
      ogImage: 'og-image.png',
      // Optional: defaults to 'docs'
      rootDir: 'docs', 
      // Optional: social links; keys follow Rspress theme icons
      socials: {
        github: 'https://github.com/org/repo',
        x: 'https://x.com/my_profile',
      },
    },
    // Optional: forwarded to @callstack/rspress-theme/plugin
    theme: {
      // theme settings
    },
    // Optional: boolean or config for rspress-plugin-vercel-analytics.
    vercelAnalytics: true,
  },
  defineConfig({
    // Your extra/override Rspress config if needed
  })
);
```

### Required/expected public assets

All graphical assets are optional but recommended. Place files in `<docs.rootDir>/public/` (default `docs/public/`), and set their filenames via theme options (`docs.icon`, `docs.logoLight`, `docs.logoDark`, `docs.ogImage`).

- **Favicon**: e.g. `/icon.png` (supports `png|svg|ico`)
- **Logo (light)**: e.g. `/logo-light.png` (supports `png|svg|jpg|jpeg|webp|avif`)
- **Logo (dark)**: e.g. `/logo-dark.png` (supports `png|svg|jpg|jpeg|webp|avif`)
- **Open Graph image**: e.g. `/og-image.png` (supports `png|svg|jpg|jpeg|webp|avif`)

If only one of `logoLight` or `logoDark` is provided, it will be used for both modes.

## Options Reference

```ts
withCallstackPreset(options, userConfig)
```

- **options** (object, required): Preset options.
- **options.context** (string, required): Absolute path to your project root (e.g. `__dirname`).
- **options.docs** (object, required):
  - **title** (string, required): Docs site title.
  - **description** (string, required): Site description.
  - **editUrl** (url string, required): Base repo URL used to build “Edit this page” links.
  - **icon** (string, optional): Filename from docs public directory for site icon.
  - **logoLight** (string, optional): Filename from docs public for light logo.
  - **logoDark** (string, optional): Filename from docs public for dark logo.
  - **ogImage** (string, optional): Filename from docs public for Open Graph image.
  - **rootDir** (string, optional): Directory containing markdown docs. Default: `docs`.
  - **rootUrl** (url string, required): Absolute site origin, e.g. `https://docs.example.com`.
  - **socials** (record, optional): Map of social icon name → URL. Keys must match Rspress theme `socialLinks` icons (e.g. `github`, `x`, `discord`, …).
- **options.theme** (object, optional): Passed through to `@callstack/rspress-theme/plugin`. See that package for available settings.
- **options.vercelAnalytics** (boolean | object, optional): Enable/disable Vercel Analytics or pass its config. If omitted, it auto-enables when a `vercel.json` exists at the project root.

- **userConfig** (Rspress `UserConfig`, optional): Your additional config merged after the preset config via `mergeDocConfig`.
