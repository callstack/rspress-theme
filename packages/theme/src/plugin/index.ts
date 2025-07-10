import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { RspressPlugin } from '@rspress/shared';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export function pluginCallstackTheme(): RspressPlugin {
  return {
    name: 'plugin-callstack-theme',
    // add ck theme defaults if not present
    config: (config) => {
      const themeConfig = config.themeConfig ?? {};

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

      return { ...config, themeConfig };
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
