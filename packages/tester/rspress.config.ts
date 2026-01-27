import * as path from 'node:path';
import { withCallstackPreset } from '@callstack/rspress-preset';
import { pluginCallstackTheme } from '@callstack/rspress-theme/plugin';
import { defineConfig } from '@rspress/core';

const isDev = process.env.NODE_ENV === 'development';

const themeOptions = {
  content: {
    homeBannerButtonText: 'Home Banner Button Text',
    homeBannerDescription: 'Home Banner Description',
    homeBannerHeadline: 'Home Banner Headline',
    outlineCTAButtonText: 'Outline CTA Button Text',
    outlineCTADescription: 'Outline CTA Description',
    outlineCTAHeadline: 'Outline CTA Headline',
  },
};

const devConfig = defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'My Site',
  llms: true,
  description: 'My Site Description',
  logo: {
    dark: '/logo-dark.png',
    light: '/logo-light.png',
  },
  themeConfig: {
    editLink: {
      docRepoBaseUrl: 'https://github.com/callstack/rspress-theme',
    },
    enableScrollToTop: false,
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/callstack/rspress-theme',
      },
      { icon: 'X', mode: 'link', content: 'https://x.com/repack_rn' },
      {
        icon: 'discord',
        mode: 'link',
        content: 'https://github.com/callstack/rspress-theme',
      },
    ],
  },
  plugins: [pluginCallstackTheme(themeOptions)],
  builderConfig: {
    performance: {
      buildCache: false,
    },
  },
});

const prodConfig = withCallstackPreset(
  {
    context: path.join(__dirname),
    docs: {
      title: 'My Site',
      logoDark: '/logo-dark.png',
      logoLight: '/logo-light.png',
      description: 'My Site Description',
      editUrl: 'https://github.com/callstack/rspress-theme',
      rootDir: 'docs',
      rootUrl: 'https://callstack.com',
      socials: {
        github: 'https://github.com/callstack/rspress-theme',
        X: 'https://x.com/repack_rn',
        discord: 'https://github.com/callstack/rspress-theme',
      },
    },
    theme: themeOptions,
  },
  {
    base: process.env.RSPRESS_BASE || '/',
    builderConfig: {
      output: {
        assetPrefix: process.env.RSPRESS_BASE || '/',
      },
      performance: {
        buildCache: false,
      },
    },
  }
);

export default isDev ? devConfig : prodConfig;
