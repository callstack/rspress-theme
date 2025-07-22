import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { RspressPlugin, UserConfig } from 'rspress/core';

type BuilderConfig = NonNullable<UserConfig['builderConfig']>;
type AliasEntry = string | (false | string)[] | false | undefined;

interface PluginCallstackThemeOptions {
  links?: {
    homeBanner?: string;
    homeFooter?: string;
    outlineCTA?: string;
  };
}

const { resolve } = createRequire(import.meta.url);
const dirname = path.dirname(fileURLToPath(import.meta.url));

function excludeFalse<T>(value: T): value is Exclude<T, false> {
  return value !== false;
}

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
  existingThemeAlias: AliasEntry
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
      aliases['@theme'] = existingThemeAlias.filter(excludeFalse).slice();
      aliases['@theme'].splice(index, 0, ckThemeExportsPath);
    } else {
      // Add CK theme path to existing array
      aliases['@theme'] = existingThemeAlias
        .filter(excludeFalse)
        .concat(ckThemeExportsPath);
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

function getThemeAssetAlias(
  existingAssetAlias: AliasEntry
): Record<string, string | string[]> {
  const assetOverrides = getThemeAssets();
  const aliases: Record<string, string | string[]> = {};

  for (const [assetAlias, assetPath] of assetOverrides) {
    if (Array.isArray(existingAssetAlias)) {
      aliases[assetAlias] = existingAssetAlias.filter(excludeFalse);
      aliases[assetAlias].push(assetPath);
    } else if (existingAssetAlias) {
      aliases[assetAlias] = [existingAssetAlias, assetPath];
    } else {
      aliases[assetAlias] = assetPath;
    }
  }

  return aliases;
}

function getBuilderConfig(options: PluginCallstackThemeOptions): BuilderConfig {
  return {
    source: {
      define: {
        HOME_BANNER_LINK: JSON.stringify(options.links?.homeBanner),
        HOME_FOOTER_LINK: JSON.stringify(options.links?.homeFooter),
        OUTLINE_CTA_LINK: JSON.stringify(options.links?.outlineCTA),
      },
    },
    resolve: {
      alias: (alias) => {
        // add '@theme-assets' aliases but keep the custom ones from user
        const assetAliases = getThemeAssetAlias(alias['@theme-assets']);
        Object.assign(alias, assetAliases);

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

function normalizeOptions(options: PluginCallstackThemeOptions) {
  return {
    links: {
      homeBanner: options.links?.homeBanner ?? 'https://callstack.com',
      homeFooter: options.links?.homeFooter ?? 'https://callstack.com',
      outlineCTA: options.links?.outlineCTA ?? 'https://callstack.com',
    },
  };
}

export function pluginCallstackTheme(
  options: PluginCallstackThemeOptions = {}
): RspressPlugin {
  const normalizedOptions = normalizeOptions(options);
  return {
    name: 'plugin-callstack-theme',
    // replace default theme & theme assets
    builderConfig: getBuilderConfig(normalizedOptions),
    // add ck theme defaults if not present
    config: (config) => {
      config.themeConfig = addThemeOverrides(config.themeConfig);
      return config;
    },
    // inject style overrides
    globalStyles: path.join(path.dirname(dirname), 'styles/styles.css'),
  };
}
