import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { RspressPlugin, UserConfig } from 'rspress/core';

type BuilderConfig = UserConfig['builderConfig'];

const { resolve } = createRequire(import.meta.url);
const dirname = path.dirname(fileURLToPath(import.meta.url));

function getBuilderConfig(): BuilderConfig {
  const ckThemeExportsPath = path.join(dirname, 'theme');
  const rspressThemeDefaultPath = resolve('@rspress/theme-default', {
    paths: [resolve('rspress')],
  });

  return {
    resolve: {
      alias: (alias) => {
        // alias '@theme' to CK theme exports instead of the default theme
        if (Array.isArray(alias['@theme'])) {
          const index = alias['@theme'].indexOf(rspressThemeDefaultPath);
          if (index !== -1) {
            alias['@theme'][index] = ckThemeExportsPath;
          } else {
            alias['@theme'].push(ckThemeExportsPath);
          }
        } else {
          alias['@theme'] = ckThemeExportsPath;
        }

        // alias '@default-theme' to the default theme
        alias['@default-theme'] = rspressThemeDefaultPath;
        // alias 'rspress/theme' to CK theme exports
        alias['rspress/theme'] = ckThemeExportsPath;
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
