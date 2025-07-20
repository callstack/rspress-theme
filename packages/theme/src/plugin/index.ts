import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { RspressPlugin, UserConfig } from 'rspress/core';

type BuilderConfig = NonNullable<UserConfig['builderConfig']>;

const { resolve } = createRequire(import.meta.url);
const dirname = path.dirname(fileURLToPath(import.meta.url));

function getThemeAssets() {
  const assetsDirPath = path.join(dirname, '../assets');
  const contents = fs.readdirSync(assetsDirPath);
  return contents
    .map(path.parse)
    .map(({ base, name }) => [
      `@theme-assets/${name}`,
      path.join(assetsDirPath, base),
    ]);
}

function getThemeAliases(
  existingThemeAlias: string | string[] | false | undefined
): Record<string, string | string[]> {
  const ckThemeExportsPath = path.join(dirname, 'theme');
  const rspressThemeDefaultPath = resolve('@rspress/theme-default', {
    paths: [resolve('rspress')],
  });

  const aliases: Record<string, string | string[]> = {};

  // Handle @theme alias
  if (Array.isArray(existingThemeAlias)) {
    const index = existingThemeAlias.indexOf(rspressThemeDefaultPath);
    if (index !== -1) {
      aliases['@theme'] = existingThemeAlias.filter(Boolean).slice();
      aliases['@theme'].splice(index, 0, ckThemeExportsPath);
    } else {
      // Add CK theme path to existing array
      aliases['@theme'] = [...existingThemeAlias, ckThemeExportsPath];
    }
  } else {
    // Replace single string with CK theme path
    aliases['@theme'] = ckThemeExportsPath;
  }

  // Add alias for @default-theme to avoid circular dependency
  aliases['@default-theme'] = rspressThemeDefaultPath;
  // Alias rspress/theme to our theme to keep the theme override pattern from Rspress docs
  aliases['rspress/theme'] = ckThemeExportsPath;

  return aliases;
}

function getBuilderConfig(): BuilderConfig {
  const assetOverrides = getThemeAssets();

  return {
    resolve: {
      alias: (alias) => {
        // add '@theme-assets' aliases but keep the custom ones from user
        for (const [assetAlias, assetPath] of assetOverrides) {
          if (Array.isArray(alias[assetAlias])) {
            alias[assetAlias].push(assetPath);
          } else if (alias[assetAlias]) {
            alias[assetAlias] = [alias[assetAlias], assetPath];
          } else {
            alias[assetAlias] = assetPath;
          }
        }

        // remove & add existing @theme-assets alias to keep specific aliases on top
        const themeAssetsAlias = alias['@theme-assets'];
        // biome-ignore lint/performance/noDelete: change property order
        delete alias['@theme-assets'];
        Object.assign(alias, { '@theme-assets': themeAssetsAlias });

        // add '@theme', '@default-theme' & 'rspress/theme' aliases
        // @ts-ignore
        const themeAliases = getThemeAliases(alias['@theme']);
        Object.assign(alias, themeAliases);
      },
    },
  };
}

function addFonts(head: UserConfig['head'] = []) {
  // Fira Code font
  head.push(
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '<link href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap" rel="stylesheet">'
  );
  return head;
}

function addThemeOverrides(themeConfig: UserConfig['themeConfig'] = {}) {
  if (!themeConfig.overview) {
    themeConfig.overview = { filterNameText: '' };
  } else if (!themeConfig.overview.filterNameText) {
    themeConfig.overview.filterNameText = '';
  }

  if (!themeConfig.outlineTitle) {
    themeConfig.outlineTitle = 'Contents';
  }

  if (!themeConfig.searchNoResultsText) {
    themeConfig.searchNoResultsText =
      'No results found, try something different than';
  }

  if (!themeConfig.searchSuggestedQueryText) {
    themeConfig.searchSuggestedQueryText = '';
  }

  return themeConfig;
}

export function pluginCallstackTheme(): RspressPlugin {
  return {
    name: 'plugin-callstack-theme',
    // replace default theme & theme assets
    builderConfig: getBuilderConfig(),
    // add ck theme defaults if not present
    config: (config) => {
      config.head = addFonts(config.head);
      config.themeConfig = addThemeOverrides(config.themeConfig);

      return config;
    },
    // inject style overrides
    globalStyles: path.join(path.dirname(dirname), 'styles/styles.css'),
  };
}
