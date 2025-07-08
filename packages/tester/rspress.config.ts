import * as path from 'node:path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'My Site',
  icon: '/rspress-icon.png',
  logo: {
    light: '/logo-light.png',
    dark: '/logo-dark.png',
  },
  themeConfig: {
    overview: {
      filterNameText: '',
    },
    outlineTitle: 'Contents',
    searchNoResultsText: 'No results found, try something different than',
    searchSuggestedQueryText: '',
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/web-infra-dev/rspress',
      },
    ],
  },
  // for the purpose of development, it's easier to override the styles directly
  globalStyles: path.resolve(__dirname, '..', 'theme', 'static', 'styles.css'),
});
