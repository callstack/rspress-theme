import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { RspressPlugin, UserConfig } from '@rspress/core';
import * as consts from './const';

type BuilderConfig = NonNullable<UserConfig['builderConfig']>;
type AliasEntry = string | (false | string)[] | false | undefined;

interface PluginCallstackThemeOptions {
  content?: {
    docFooterCTAButtonText?: string;
    docFooterCTAHeadline?: string;
    homeBannerButtonText?: string;
    homeBannerDescription?: string;
    homeBannerHeadline?: string;
    outlineCTAButtonText?: string;
    outlineCTADescription?: string;
    outlineCTAHeadline?: string;
  };
  links?: {
    docFooterCTA?: string;
    homeBanner?: string;
    homeFooter?: string;
    outlineCTA?: string;
  };
}

const dirname = path.dirname(fileURLToPath(import.meta.url));

function excludeFalse<T>(value: T): value is Exclude<T, false> {
  return value !== false;
}

function getThemeAliases(
  existingThemeAlias: AliasEntry
): Record<string, string | string[]> {
  const ckThemeExportsPath = path.join(dirname, 'theme');

  const { resolve } = createRequire(import.meta.url);
  const rspressCoreThemePath = resolve('@rspress/core/theme', {
    paths: [resolve('@rspress/core/package.json')],
  });

  const aliases: Record<string, string | string[]> = {};

  // Handle @theme alias
  if (Array.isArray(existingThemeAlias)) {
    const index = existingThemeAlias.indexOf(rspressCoreThemePath);
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
  aliases['@default-theme'] = rspressCoreThemePath;
  // Alias rspress/theme to our theme to keep the theme override pattern from Rspress docs
  aliases['@rspress/core/theme'] = ckThemeExportsPath;
  // Alias @theme-original and @rspress/core/theme-original to always override
  // the original theme
  aliases['@theme-original'] = ckThemeExportsPath;
  aliases['@rspress/core/theme-original'] = ckThemeExportsPath;

  return aliases;
}

function getBuilderConfig(options: PluginCallstackThemeOptions): BuilderConfig {
  return {
    source: {
      define: {
        DOC_FOOTER_CTA_BUTTON_TEXT: JSON.stringify(
          options.content?.docFooterCTAButtonText
        ),
        DOC_FOOTER_CTA_HEADLINE: JSON.stringify(
          options.content?.docFooterCTAHeadline
        ),
        DOC_FOOTER_CTA_LINK: JSON.stringify(options.links?.docFooterCTA),
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
        // add '@theme', '@default-theme' & 'rspress/theme' aliases
        // @ts-ignore
        const themeAliases = getThemeAliases(alias['@theme']);
        Object.assign(alias, themeAliases);
      },
    },
  };
}

function getI18nSourceOverrides(
  existingI18nSource: UserConfig['i18nSource'] = {}
): UserConfig['i18nSource'] {
  const i18nSource: UserConfig['i18nSource'] = {
    ...existingI18nSource,
  };

  if (!i18nSource['overview.filterNameText']) {
    i18nSource['overview.filterNameText'] = {
      en: consts.OVERVIEW_FILTER_NAME_TEXT,
      zh: consts.OVERVIEW_FILTER_NAME_TEXT,
    };
  }

  if (!i18nSource.outlineTitle) {
    i18nSource.outlineTitle = {
      en: consts.OUTLINE_TITLE,
      zh: consts.OUTLINE_TITLE,
    };
  }

  if (!i18nSource.searchNoResultsText) {
    i18nSource.searchNoResultsText = {
      en: consts.SEARCH_NO_RESULTS_TEXT,
      zh: consts.SEARCH_NO_RESULTS_TEXT,
    };
  }

  if (!i18nSource.searchSuggestedQueryText) {
    i18nSource.searchSuggestedQueryText = {
      en: consts.SEARCH_SUGGESTED_QUERY_TEXT,
      zh: consts.SEARCH_SUGGESTED_QUERY_TEXT,
    };
  }

  if (!i18nSource.editLinkText) {
    i18nSource.editLinkText = {
      en: consts.EDIT_LINK_TEXT,
      zh: consts.EDIT_LINK_TEXT,
    };
  }

  return i18nSource;
}

function normalizeOptions(options: PluginCallstackThemeOptions) {
  return {
    content: {
      docFooterCTAButtonText:
        options.content?.docFooterCTAButtonText ??
        consts.DOC_FOOTER_CTA_BUTTON_TEXT,
      docFooterCTAHeadline:
        options.content?.docFooterCTAHeadline ?? consts.DOC_FOOTER_CTA_HEADLINE,
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
      docFooterCTA: options.links?.docFooterCTA ?? consts.DOC_FOOTER_CTA_LINK,
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
    config: (config) => {
      config.i18nSource = getI18nSourceOverrides(config.i18nSource);
      return config;
    },
    // inject style overrides
    globalStyles: path.join(path.dirname(dirname), 'styles/styles.css'),
  };
}
