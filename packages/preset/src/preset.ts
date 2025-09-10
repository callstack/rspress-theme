import path from 'node:path';
import { pluginCallstackTheme } from '@callstack/rspress-theme/plugin';
import { type UserConfig, defineConfig } from '@rspress/core';
import type { SocialLinks as SocialLinksComponent } from '@rspress/core/theme';
import { pluginLlms } from '@rspress/plugin-llms';
import { pluginOpenGraph } from 'rsbuild-plugin-open-graph';
import pluginSitemap from 'rspress-plugin-sitemap';

type SupportedSocialLinks = Exclude<
  Parameters<typeof SocialLinksComponent>[0]['socialLinks'][number]['icon'],
  { svg: string }
>;

type Socials = Record<SupportedSocialLinks, string>;

interface WithCallstackPresetConfig {
  docs: {
    description: string;
    editUrl: string;
    rootUrl: string;
    socials: Socials;
    title: string;
  };
  root: string;
}

type SocialLinks = Parameters<typeof SocialLinksComponent>[0]['socialLinks'];

function createSocialLinks(
  socialLinks: WithCallstackPresetConfig['docs']['socials']
): SocialLinks {
  return Object.entries(socialLinks).map(([key, value]) => ({
    icon: key as keyof Socials,
    mode: 'link',
    content: value,
  }));
}

export const withCallstackPreset = (
  { docs, root }: WithCallstackPresetConfig,
  userConfig: UserConfig
): UserConfig => {
  return defineConfig({
    root,
    title: docs.title,
    description: docs.description,
    icon: '/icon.png',
    globalStyles: path.join(root, 'theme/styles.css'),
    ...userConfig,
    logo:
      typeof userConfig.logo === 'string'
        ? userConfig.logo
        : {
            light: '/logo-light.png',
            dark: '/logo-dark.png',
            ...(typeof userConfig.logo === 'object' ? userConfig.logo : {}),
          },
    route: {
      cleanUrls: true,
      ...userConfig.route,
    },
    search: {
      versioned: true,
      codeBlocks: true,
      ...userConfig.search,
    },
    themeConfig: {
      enableContentAnimation: true,
      enableScrollToTop: true,
      ...userConfig.themeConfig,
      footer: {
        message: `Copyright © ${new Date().getFullYear()} Callstack Open Source`,
        ...userConfig.themeConfig?.footer,
      },
      editLink: {
        docRepoBaseUrl: docs.editUrl,
        text: 'Edit this page on GitHub',
        ...userConfig.themeConfig?.editLink,
      },
      socialLinks: [
        ...createSocialLinks(docs.socials),
        ...(userConfig.themeConfig?.socialLinks ?? []),
      ],
    },
    builderConfig: {
      ...userConfig.builderConfig,
      plugins: [
        pluginOpenGraph({
          title: docs.title,
          type: 'website',
          url: docs.rootUrl,
          image: `${docs.rootUrl}/og-image.jpg`,
          description: docs.description,
          twitter: {
            site: docs.socials.x,
            card: 'summary_large_image',
          },
        }),
        ...(userConfig.builderConfig?.plugins ?? []),
      ],
    },
    plugins: [
      pluginCallstackTheme(),
      pluginSitemap({
        domain: docs.rootUrl,
      }),
      pluginLlms({
        exclude: ({ page }) => {
          return page.routePath.includes('404');
        },
      }),
      ...(userConfig.plugins ?? []),
    ],
  });
};
