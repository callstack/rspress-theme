import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import { pluginCallstackTheme } from '@callstack/rspress-theme/plugin';
import { defineConfig, mergeDocConfig } from '@rspress/core';
import type { UserConfig } from '@rspress/core';
import type { SocialLinks as SocialLinksComponent } from '@rspress/core/theme';
import { pluginLlms } from '@rspress/plugin-llms';
import { pluginSitemap } from '@rspress/plugin-sitemap';
import { pluginOpenGraph } from 'rsbuild-plugin-open-graph';
import { type PresetConfig, validatePresetOptions } from './options';

const CALLSTACK_BASE_URL = 'https://www.callstack.com';
const CALLSTACK_CONTACT_URL = 'https://www.callstack.com/contact';

type SupportedSocialLinks = Exclude<
  NonNullable<
    Parameters<typeof SocialLinksComponent>[0]['socialLinks']
  >[number]['icon'],
  { svg: string }
>;
type Socials = Partial<Record<SupportedSocialLinks, string>>;
type SocialLinks = Parameters<typeof SocialLinksComponent>[0]['socialLinks'];

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createSocialLinks(socials: Socials | undefined): SocialLinks {
  return Object.entries(socials ?? {}).map(([key, value]) => ({
    icon: key as keyof Socials,
    mode: 'link',
    content: value,
  }));
}

// Extract an @handle from an X/Twitter profile URL
function extractXHandle(profileUrl: string): string {
  try {
    const url = new URL(profileUrl);
    const handle = url.pathname.split('/')[1];
    return `@${handle}`;
  } catch {
    throw new Error('Failed to extract X handle from X profile URL');
  }
}

function addUTMParameters(
  url: string,
  location: string,
  siteTitle: string
): string {
  const urlObj = new URL(url);
  urlObj.searchParams.set('utm_campaign', 'open_source');
  urlObj.searchParams.set('utm_source', siteTitle);
  urlObj.searchParams.set('utm_medium', 'referral');
  urlObj.searchParams.set('utm_content', location);
  return urlObj.toString();
}

function getGlobalStyles(context: string): string | undefined {
  const stylesPath = path.join(context, 'theme/styles.css');
  return fs.existsSync(stylesPath) ? stylesPath : undefined;
}

const createPreset = (config: PresetConfig): UserConfig => {
  const { context, docs, vercelAnalytics } = config;
  const rootDir = path.join(context, docs.rootDir ?? 'docs');

  const enableVercel =
    vercelAnalytics === undefined
      ? fs.existsSync(path.join(context, 'vercel.json'))
      : Boolean(vercelAnalytics);
  const vercelOptions =
    typeof vercelAnalytics === 'object' ? vercelAnalytics : {};

  const defaultLinks = {
    docFooterCTA: addUTMParameters(
      CALLSTACK_CONTACT_URL,
      'FOOTER_CTA',
      docs.title
    ),
    homeBanner: addUTMParameters(
      CALLSTACK_CONTACT_URL,
      'HOME_BANNER',
      docs.title
    ),
    homeFooter: CALLSTACK_BASE_URL,
    outlineCTA: addUTMParameters(
      CALLSTACK_CONTACT_URL,
      'OUTLINE_CTA',
      docs.title
    ),
  };

  const theme = {
    ...config.theme,
    links: {
      ...defaultLinks,
      ...config.theme?.links,
    },
  };

  return defineConfig({
    root: rootDir,
    title: docs.title,
    description: docs.description,
    icon: docs.icon,
    globalStyles: getGlobalStyles(context),
    globalUIComponents: enableVercel
      ? [
          [
            path.join(path.dirname(__dirname), 'vendor/VercelAnalytics.ts'),
            { mode: process.env.NODE_ENV ?? 'development', ...vercelOptions },
          ],
        ]
      : [],
    logo:
      docs.logoLight || docs.logoDark
        ? {
            light: (docs.logoLight ?? docs.logoDark) as string,
            dark: (docs.logoDark ?? docs.logoLight) as string,
          }
        : undefined,
    markdown: {
      link: {
        checkDeadLinks: true,
      },
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
      enableScrollToTop: false,
      llmsUI: true,
      footer: {
        message: `Copyright © ${new Date().getFullYear()} Callstack`,
      },
      editLink: {
        docRepoBaseUrl: docs.editUrl,
      },
      socialLinks: createSocialLinks(docs.socials),
    },
    builderConfig: {
      plugins: [
        pluginOpenGraph({
          title: docs.title,
          type: 'website',
          url: docs.rootUrl,
          image: docs.rootUrl + docs.ogImage,
          description: docs.description,
          twitter: docs.socials?.X
            ? {
                site: extractXHandle(docs.socials?.X),
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
    ],
  });
};

export function withCallstackPreset(
  options: PresetConfig,
  userConfig: UserConfig
): Promise<UserConfig> {
  const parsed = validatePresetOptions(options);
  return mergeDocConfig(createPreset(parsed), userConfig);
}
