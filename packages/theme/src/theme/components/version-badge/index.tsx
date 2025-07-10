import { usePageData } from '@runtime';
import { Badge } from '@theme';

interface VersionBadgeProps {
  version?: string;
}

export function VersionBadge({ version }: VersionBadgeProps) {
  const pageData = usePageData();

  // hide on overview pages
  if (pageData.page.frontmatter.overview) {
    return null;
  }

  const versionText = `Version: ${version ?? pageData.page.version}`;
  return (
    <div className="py-2">
      <Badge type="info" outline text={versionText} />
    </div>
  );
}
