import { Badge } from '@theme';
import { usePageData } from 'rspress/runtime';

interface VersionBadgeProps {
  version?: string;
}

export function VersionBadge({ version }: VersionBadgeProps) {
  const pageData = usePageData();

  // hide on overview pages
  if (pageData.page.frontmatter.overview) {
    return null;
  }

  const currentVersion = version ?? pageData.page.version;
  const versionText = `Version: ${currentVersion}`;

  return (
    <div className="py-2">
      <Badge type="info" outline text={versionText} />
    </div>
  );
}
