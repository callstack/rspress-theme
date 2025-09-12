import fs from 'node:fs';
import path from 'node:path';
import { pluginCallstackTheme } from '@callstack/rspress-theme/plugin';
import {
  type RspressPlugin,
  defineConfig,
  mergeDocConfig,
} from '@rspress/core';
import type { UserConfig } from '@rspress/core';
import type { SocialLinks as SocialLinksComponent } from '@rspress/core/theme';
import { pluginLlms } from '@rspress/plugin-llms';
import { pluginSitemap } from '@rspress/plugin-sitemap';
import { pluginOpenGraph } from 'rsbuild-plugin-open-graph';
import pluginVercelAnalytics from 'rspress-plugin-vercel-analytics';
import { type PresetConfig, validatePresetOptions } from './options';

type SupportedSocialLinks = Exclude<
  Parameters<typeof SocialLinksComponent>[0]['socialLinks'][number]['icon'],
  { svg: string }
>;
type Socials = Partial<Record<SupportedSocialLinks, string>>;
type SocialLinks = Parameters<typeof SocialLinksComponent>[0]['socialLinks'];

function createSocialLinks(socials: Socials | undefined): SocialLinks {
  return Object.entries(socials ?? {}).map(([key, value]) => ({
    icon: key as keyof Socials,
    mode: 'link',
    content: value,
  }));
}

const createPreset = (config: PresetConfig): UserConfig => {
  const { context, docs, theme, vercelAnalytics } = config;
  const rootDir = path.join(context, docs.rootDir ?? 'docs');

  const enableVercel =
    vercelAnalytics === undefined
      ? fs.existsSync(path.join(context, 'vercel.json'))
      : Boolean(vercelAnalytics);
  const vercelOptions =
    typeof vercelAnalytics === 'object' ? vercelAnalytics : {};

  return defineConfig({
    root: rootDir,
    title: docs.title,
    description: docs.description,
    icon: docs.icon,
    globalStyles: path.join(context, 'theme/styles.css'),
    logo:
      docs.logoLight || docs.logoDark
        ? {
            light: (docs.logoLight ?? docs.logoDark) as string,
            dark: (docs.logoDark ?? docs.logoLight) as string,
          }
        : undefined,
    route: {
      cleanUrls: true,
    },
    search: {
      versioned: true,
      codeBlocks: true,
    },
    themeConfig: {
      enableContentAnimation: true,
      enableScrollToTop: false,
      footer: {
        message: `Copyright © ${new Date().getFullYear()} Callstack Open Source`,
      },
      editLink: {
        docRepoBaseUrl: docs.editUrl,
        text: 'Edit this page on GitHub',
      },
      socialLinks: createSocialLinks(docs.socials),
    },
    builderConfig: {
      plugins: [
        pluginOpenGraph({
          title: docs.title,
          type: 'website',
          url: docs.rootUrl,
          image: `${docs.rootUrl}/${docs.ogImage}`,
          description: docs.description,
          twitter: docs.socials?.x
            ? {
                site: docs.socials?.x,
                card: 'summary_large_image',
              }
            : undefined,
        }),
      ],
    },
    plugins: [
      pluginCallstackTheme(theme),
      pluginSitemap({ siteUrl: docs.rootUrl }),
      pluginLlms({
        exclude: ({ page }) => {
          return page.routePath.includes('404');
        },
      }),
      enableVercel && pluginVercelAnalytics(vercelOptions),
    ].filter(Boolean) as RspressPlugin[],
  });
};

export function withCallstackPreset(
  options: PresetConfig,
  userConfig: UserConfig
): Promise<UserConfig> {
  const parsed = validatePresetOptions(options);
  return mergeDocConfig(createPreset(parsed), userConfig);
}
