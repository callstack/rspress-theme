import * as path from 'node:path';
import { pluginCallstackTheme } from '@callstack/rspress-theme/plugin';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'My Site',
  icon: '/rspress-icon.png',
  logo: {
    light: '/logo-light.png',
    dark: '/logo-dark.png',
  },
  globalStyles: path.join(__dirname, 'styles.css'),
  themeConfig: {
    editLink: {
      docRepoBaseUrl: 'https://github.com/callstack/rspress-theme',
      text: 'Edit this page on GitHub',
    },
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: '/',
      },
      {
        icon: 'X',
        mode: 'link',
        content: '/',
      },
      {
        icon: 'discord',
        mode: 'link',
        content: '/',
      },
    ],
  },
  plugins: [pluginCallstackTheme()],
});
