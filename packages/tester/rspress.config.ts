import * as path from 'node:path';
import { pluginCallstackTheme } from '@callstack/rspress-theme/plugin';
import { defineConfig } from '@rspress/core';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'My Site',
  icon: '/rspress-icon.png',
  logo: {
    light: '/logo-light.png',
    dark: '/logo-dark.png',
  },
  globalStyles: path.join(__dirname, 'styles.css'),
  builderConfig: {
    performance: {
      buildCache: false,
    },
  },
  themeConfig: {
    footer: {
      message: 'Copyright © 2025 Callstack',
    },
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
  plugins: [
    pluginCallstackTheme({
      content: {
        homeBannerButtonText: 'Home Banner Button Text',
        homeBannerDescription: 'Home Banner Description',
        homeBannerHeadline: 'Home Banner Headline',
        outlineCTAButtonText: 'Outline CTA Button Text',
        outlineCTADescription: 'Outline CTA Description',
        outlineCTAHeadline: 'Outline CTA Headline',
      },
      links: {
        homeBanner: 'https://callstack.com?source=banner',
        homeFooter: 'https://callstack.com?source=footer',
        outlineCTA: 'https://callstack.com?source=outline-cta',
      },
    }),
  ],
});
