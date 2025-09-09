import { usePageData } from '@rspress/core/runtime';
import { Badge } from '@theme';
import styles from './index.module.scss';

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
    <div className={styles.container}>
      <Badge type="info" text={versionText} />
    </div>
  );
}
