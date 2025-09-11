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
      // e.g. enableColorModeSwitch: true
    },
  },
  defineConfig({
    // Your extra/override Rspress config if needed
  })
);
```

### Required/expected public assets

Place these files under your docs root `public/` directory (based on `docs.rootDir`, default `docs/public/`):

- `icon.(png|svg|jpg|jpeg|webp|avif|ico)` → site favicon (`icon`)
- `logo-light.(png|svg|jpg|jpeg|webp|avif)` → light logo
- `logo-dark.(png|svg|jpg|jpeg|webp|avif)` → dark logo
- `og-image.(png|svg|jpg|jpeg|webp|avif)` → OG image

## Options Reference

```ts
withCallstackPreset(options, userConfig?)
```

- **options.context** (string, required): Absolute path to your project root (e.g. `__dirname`).
- **options.docs** (object, required):
  - **title** (string, required): Docs site title.
  - **description** (string, required): Site description.
  - **editUrl** (url string, required): Base repo URL used to build “Edit this page” links.
  - **rootDir** (string, optional): Directory containing markdown docs. Default: `docs`.
  - **rootUrl** (url string, required): Absolute site origin, e.g. `https://docs.example.com`.
  - **socials** (record, optional): Map of social icon name → URL. Keys must match Rspress theme `socialLinks` icons (e.g. `github`, `x`, `discord`, …).
- **options.theme** (object, optional): Passed through to `@callstack/rspress-theme/plugin`. See that package for available settings.
- **userConfig** (Rspress `UserConfig`, optional): Your additional config merged after the preset config via `mergeDocConfig`.
