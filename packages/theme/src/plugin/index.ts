import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { RspressPlugin, UserConfig } from '@rspress/core';
import * as consts from './const';

type BuilderConfig = NonNullable<UserConfig['builderConfig']>;
type AliasEntry = string | (false | string)[] | false | undefined;

interface PluginCallstackThemeOptions {
  content?: {
    homeBannerButtonText?: string;
    homeBannerDescription?: string;
    homeBannerHeadline?: string;
    outlineCTAButtonText?: string;
    outlineCTADescription?: string;
    outlineCTAHeadline?: string;
  };
  links?: {
    homeBanner?: string;
    homeFooter?: string;
    outlineCTA?: string;
  };
}

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

  const { resolve } = createRequire(import.meta.url);
  const rspressThemeDefaultPath = resolve('@rspress/theme-default', {
    paths: [resolve('@rspress/core')],
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
  aliases['@rspress/core/theme'] = ckThemeExportsPath;

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
        HOME_BANNER_BUTTON_TEXT: JSON.stringify(
          options.content?.homeBannerButtonText
        ),
        HOME_BANNER_DESCRIPTION: JSON.stringify(
          options.content?.homeBannerDescription
        ),
        HOME_BANNER_HEADLINE: JSON.stringify(
          options.content?.homeBannerHeadline
        ),
        HOME_FOOTER_LINK: JSON.stringify(options.links?.homeFooter),
        OUTLINE_CTA_BUTTON_TEXT: JSON.stringify(
          options.content?.outlineCTAButtonText
        ),
        OUTLINE_CTA_DESCRIPTION: JSON.stringify(
          options.content?.outlineCTADescription
        ),
        OUTLINE_CTA_HEADLINE: JSON.stringify(
          options.content?.outlineCTAHeadline
        ),
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
    themeConfig.overview = { filterNameText: consts.OVERVIEW_FILTER_NAME_TEXT };
  } else if (!themeConfig.overview.filterNameText) {
    themeConfig.overview.filterNameText = consts.OVERVIEW_FILTER_NAME_TEXT;
  }

  if (!themeConfig.outlineTitle) {
    themeConfig.outlineTitle = consts.OUTLINE_TITLE;
  }

  if (!themeConfig.searchNoResultsText) {
    themeConfig.searchNoResultsText = consts.SEARCH_NO_RESULTS_TEXT;
  }

  if (!themeConfig.searchSuggestedQueryText) {
    themeConfig.searchSuggestedQueryText = consts.SEARCH_SUGGESTED_QUERY_TEXT;
  }

  return themeConfig;
}

function normalizeOptions(options: PluginCallstackThemeOptions) {
  return {
    content: {
      homeBannerButtonText:
        options.content?.homeBannerButtonText ?? consts.HOME_BANNER_BUTTON_TEXT,
      homeBannerDescription:
        options.content?.homeBannerDescription ??
        consts.HOME_BANNER_DESCRIPTION,
      homeBannerHeadline:
        options.content?.homeBannerHeadline ?? consts.HOME_BANNER_HEADLINE,
      outlineCTAButtonText:
        options.content?.outlineCTAButtonText ?? consts.OUTLINE_CTA_BUTTON_TEXT,
      outlineCTADescription:
        options.content?.outlineCTADescription ??
        consts.OUTLINE_CTA_DESCRIPTION,
      outlineCTAHeadline:
        options.content?.outlineCTAHeadline ?? consts.OUTLINE_CTA_HEADLINE,
    },
    links: {
      homeBanner: options.links?.homeBanner ?? consts.HOME_BANNER_LINK,
      homeFooter: options.links?.homeFooter ?? consts.HOME_FOOTER_LINK,
      outlineCTA: options.links?.outlineCTA ?? consts.OUTLINE_CTA_LINK,
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
