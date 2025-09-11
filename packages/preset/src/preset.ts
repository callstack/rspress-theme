import path from 'node:path';
import { pluginCallstackTheme } from '@callstack/rspress-theme/plugin';
import { defineConfig, mergeDocConfig } from '@rspress/core';
import type { UserConfig } from '@rspress/core';
import type { SocialLinks as SocialLinksComponent } from '@rspress/core/theme';
import { pluginLlms } from '@rspress/plugin-llms';
import { pluginSitemap } from '@rspress/plugin-sitemap';
import { pluginOpenGraph } from 'rsbuild-plugin-open-graph';
import { type PresetOptions, validatePresetOptions } from './options';
import { resolvePublicAssetPath } from './utils';

type SupportedSocialLinks = Exclude<
  Parameters<typeof SocialLinksComponent>[0]['socialLinks'][number]['icon'],
  { svg: string }
>;
type Socials = Partial<Record<SupportedSocialLinks, string>>;
type SocialLinks = Parameters<typeof SocialLinksComponent>[0]['socialLinks'];
type ThemeConfig = Parameters<typeof pluginCallstackTheme>[0];
type PresetConfig = Omit<PresetOptions, 'theme'> & {
  theme?: ThemeConfig;
};

function createSocialLinks(socials: Socials | undefined): SocialLinks {
  return Object.entries(socials ?? {}).map(([key, value]) => ({
    icon: key as keyof Socials,
    mode: 'link',
    content: value,
  }));
}

const createPreset = ({ context, docs, theme }: PresetConfig): UserConfig => {
  const rootDir = path.join(context, docs.rootDir ?? 'docs');

  const resolvedIconPath = resolvePublicAssetPath(rootDir, 'icon');
  const resolvedLogoLightPath = resolvePublicAssetPath(rootDir, 'logo-light');
  const resolvedLogoDarkPath = resolvePublicAssetPath(rootDir, 'logo-dark');
  const resolvedOgImagePath = resolvePublicAssetPath(rootDir, 'og-image');

  return defineConfig({
    root: rootDir,
    title: docs.title,
    description: docs.description,
    icon: resolvedIconPath ?? '/icon.png',
    globalStyles: path.join(context, 'theme/styles.css'),
    logo: {
      light: resolvedLogoLightPath ?? '/logo-light.png',
      dark: resolvedLogoDarkPath ?? '/logo-dark.png',
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
      socialLinks: createSocialLinks(docs.socials),
    },
    builderConfig: {
      plugins: [
        pluginOpenGraph({
          title: docs.title,
          type: 'website',
          url: docs.rootUrl,
          image: `${docs.rootUrl}/${resolvedOgImagePath}`,
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
  options: PresetConfig,
  userConfig: UserConfig
): Promise<UserConfig> {
  validatePresetOptions(options);
  return mergeDocConfig(createPreset(options), userConfig);
}
