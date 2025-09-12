import path from 'node:path';
import { styleText } from 'node:util';
import type { pluginCallstackTheme } from '@callstack/rspress-theme/plugin';
import type pluginVercelAnalytics from 'rspress-plugin-vercel-analytics';
import { type ZodIssue, z } from 'zod';

const nonEmptyString = z
  .string()
  .trim()
  .min(1, { message: 'must be a non-empty string' });

export const presetOptionsSchema = z.object({
  context: nonEmptyString
    .refine((value: string) => path.isAbsolute(value), {
      message: 'must be an absolute path',
    })
    .describe('Absolute path to the project root'),
  docs: z.object({
    title: nonEmptyString.describe('Title of the docs'),
    description: nonEmptyString.describe('Description of the docs'),
    editUrl: z
      .string()
      .trim()
      .url({ message: 'must be a valid URL' })
      .describe('Base URL to repository for edit links'),
    logoLight: nonEmptyString
      .optional()
      .describe(
        'Filename from docs public directory for light mode logo (default: logo-light.png)'
      ),
    logoDark: nonEmptyString
      .optional()
      .describe(
        'Filename from docs public directory for dark mode logo (default: logo-dark.png)'
      ),
    icon: nonEmptyString
      .optional()
      .describe(
        'Filename from docs public directory for site icon (default: icon.png)'
      ),
    ogImage: nonEmptyString
      .optional()
      .describe(
        'Filename from docs public directory for Open Graph image (default: og.png)'
      ),
    rootDir: nonEmptyString
      .optional()
      .describe('Root directory containing markdown docs'),
    rootUrl: z
      .string()
      .trim()
      .url({ message: 'must be a valid URL' })
      .describe('Absolute public site origin (e.g. https://example.com)'),
    socials: z
      .record(z.string().url())
      .optional()
      .describe('Map of social icon name to profile URL'),
  }),
  theme: z.unknown().optional(),
  vercelAnalytics: z
    .union([z.boolean(), z.record(z.unknown())])
    .optional()
    .describe(
      'Enable/disable Vercel Analytics or pass its config (overrides auto-detect)'
    ),
});

type ThemeConfig = Parameters<typeof pluginCallstackTheme>[0];
type VercelAnalyticsConfig = Parameters<typeof pluginVercelAnalytics>[0];
type PresetSchema = z.infer<typeof presetOptionsSchema>;

export type PresetConfig = Omit<PresetSchema, 'theme' | 'vercelAnalytics'> & {
  theme?: ThemeConfig;
  vercelAnalytics?: boolean | VercelAnalyticsConfig;
};

function error(...message: string[]): void {
  for (const msg of message) {
    console.error(styleText('red', msg));
  }
}

export function validatePresetOptions(options: unknown): PresetConfig {
  const result = presetOptionsSchema.safeParse(options);
  if (!result.success) {
    const bullets = result.error.issues
      .map((issue: ZodIssue) => {
        const pathSegments = issue.path;
        const pathLabel =
          pathSegments.length > 0 ? pathSegments.join('.') : 'root';

        // Resolve description from schema using path
        let current: z.ZodTypeAny = presetOptionsSchema;
        for (const segment of pathSegments) {
          if (current instanceof z.ZodObject) {
            const objectSchema = current as z.ZodObject<z.ZodRawShape>;
            const shape = objectSchema.shape;
            current = shape[String(segment)] as z.ZodTypeAny;
          } else if (current instanceof z.ZodRecord) {
            current = current._def.valueType;
          } else {
            break;
          }
        }
        const description = (current?._def as { description?: string })
          ?.description;

        const received = (issue as unknown as { received?: string }).received;
        const details = received
          ? `${issue.message} — received ${received}`
          : issue.message;
        const withDesc = description ? `${details} (${description})` : details;
        return `- ${pathLabel}: ${withDesc}`;
      })
      .join('\n');
    error('Invalid @callstack/rspress-preset configuration:');
    error(bullets);
    process.exit(1);
  }

  return result.data as PresetConfig;
}
