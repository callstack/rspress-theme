import { useDark, usePageData } from '@runtime';
import { SocialLinks } from '@theme';
import CKLogoDark from './ck-logo-dark.svg?react';
import CKLogoLight from './ck-logo-light.svg?react';
import styles from './index.module.scss';

interface SocialLink {
  href: string;
  icon: React.ReactNode;
  label: string;
}

interface HomeFooterProps {
  SocialLinksComponent?: React.ComponentType<{
    socialLinks: SocialLink[];
  }>;
}

function HomeFooter({ SocialLinksComponent }: HomeFooterProps) {
  const isDark = useDark();
  const { siteData } = usePageData();
  const SocialLinksToRender = SocialLinksComponent ?? SocialLinks;

  return (
    <footer className={styles.container}>
      <div className={styles.row}>
        <div className={styles.logo}>
          {isDark ? <CKLogoDark /> : <CKLogoLight />}
        </div>
        <SocialLinksToRender socialLinks={siteData.themeConfig.socialLinks} />
      </div>
    </footer>
  );
}

export { HomeFooter };
export type { HomeFooterProps };
