import fs from 'node:fs';
import path from 'node:path';
import { styleText } from 'node:util';

export const PUBLIC_ASSET_EXTENSIONS = [
  'png',
  'svg',
  'jpg',
  'jpeg',
  'webp',
  'avif',
  'ico',
] as const;

export function resolvePublicAssetPath(
  docsRoot: string,
  basename: string
): string | undefined {
  // public dir that contains the exposed assets
  const publicDirectoryPath = path.join(docsRoot, 'public');
  const publicAssets = fs.readdirSync(publicDirectoryPath) ?? [];

  for (const ext of PUBLIC_ASSET_EXTENSIONS) {
    const candidate = `${basename}.${ext}`;
    if (publicAssets.includes(candidate)) {
      return `/${candidate}`;
    }
  }

  console.warn(
    styleText(
      'yellow',
      `[@callstack/rspress-preset] No asset found for "${basename}".`
    )
  );
  return undefined;
}
