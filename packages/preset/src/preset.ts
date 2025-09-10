import path from 'node:path';
import { pluginCallstackTheme } from '@callstack/rspress-theme/plugin';
import { defineConfig, mergeDocConfig } from '@rspress/core';
import type { UserConfig } from '@rspress/core';
import type { SocialLinks as SocialLinksComponent } from '@rspress/core/theme';
import { pluginLlms } from '@rspress/plugin-llms';
import { pluginSitemap } from '@rspress/plugin-sitemap';
import { pluginOpenGraph } from 'rsbuild-plugin-open-graph';

type SupportedSocialLinks = Exclude<
  Parameters<typeof SocialLinksComponent>[0]['socialLinks'][number]['icon'],
  { svg: string }
>;

type Socials = Record<SupportedSocialLinks, string>;

interface CallstackPresetOptions {
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
  socialLinks: CallstackPresetOptions['docs']['socials']
): SocialLinks {
  return Object.entries(socialLinks).map(([key, value]) => ({
    icon: key as keyof Socials,
    mode: 'link',
    content: value,
  }));
}

export const createPreset = ({
  docs,
  root,
}: CallstackPresetOptions): UserConfig => {
  return defineConfig({
    root,
    title: docs.title,
    description: docs.description,
    icon: '/icon.png',
    globalStyles: path.join(root, 'theme/styles.css'),
    logo: {
      light: '/logo-light.png',
      dark: '/logo-dark.png',
    },
    route: {
      cleanUrls: true,
    },
    search: {
      versioned: true,
      codeBlocks: true,
    },
    themeConfig: {
      enableContentAnimation: true,
      enableScrollToTop: true,
      footer: {
        message: `Copyright © ${new Date().getFullYear()} Callstack Open Source`,
      },
      editLink: {
        docRepoBaseUrl: docs.editUrl,
        text: 'Edit this page on GitHub',
      },
      socialLinks: [...createSocialLinks(docs.socials)],
    },
    builderConfig: {
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
      ],
    },
    plugins: [
      pluginCallstackTheme(),
      pluginSitemap({
        siteUrl: docs.rootUrl,
      }),
      pluginLlms({
        exclude: ({ page }) => {
          return page.routePath.includes('404');
        },
      }),
    ],
  });
};

export function withCallstackPreset(
  options: CallstackPresetOptions,
  userConfig: UserConfig
): Promise<UserConfig> {
  return mergeDocConfig(createPreset(options), userConfig);
}
