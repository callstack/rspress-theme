import { useDark, usePageData } from '@runtime';
import { Link, SocialLinks } from '@theme';
import CKLogoDark from './ck-logo-dark.svg?react';
import CKLogoLight from './ck-logo-light.svg?react';
import styles from './index.module.scss';

interface SocialLink {
  href: string;
  icon: React.ReactNode;
  label: string;
}

interface HomeFooterProps {
  LinkComponent?: React.ComponentType<{
    href: string;
    children: React.ReactNode;
  }>;
  SocialLinksComponent?: React.ComponentType<{
    socialLinks: SocialLink[];
  }>;
}

function HomeFooter(props: HomeFooterProps) {
  const isDark = useDark();
  const { siteData } = usePageData();
  const LinkComponent = props.LinkComponent ?? Link;
  const SocialLinksComponent = props.SocialLinksComponent ?? SocialLinks;

  return (
    <footer className={styles.container}>
      <div className={styles.row}>
        <LinkComponent href="https://www.callstack.com/#">
          <div className={styles.logo}>
            {isDark ? <CKLogoDark /> : <CKLogoLight />}
          </div>
        </LinkComponent>
        <SocialLinksComponent socialLinks={siteData.themeConfig.socialLinks} />
      </div>
    </footer>
  );
}

export { HomeFooter };
export type { HomeFooterProps };
