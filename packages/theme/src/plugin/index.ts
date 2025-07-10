import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { RspressPlugin, UserConfig } from '@rspress/shared';

const dirname = path.dirname(fileURLToPath(import.meta.url));

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
    // add ck theme defaults if not present
    config: (config) => {
      config.head = addFonts(config.head);
      config.themeConfig = addThemeOverrides(config.themeConfig);

      return config;
    },
    // inject style overrides
    globalStyles: path.join(path.dirname(dirname), 'styles/styles.css'),
    // add aliases for runtime and shared
    builderConfig: {
      resolve: {
        alias: {
          '@runtime': '@rspress/core/runtime',
          '@shared': '@rspress/shared',
        },
      },
    },
  };
}
