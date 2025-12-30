import { usePageData } from '@rspress/core/runtime';
import { Link, SocialLinks } from '@theme';
import CKLogoDark from '../../assets/ck-logo-dark.svg?react';
import CKLogoLight from '../../assets/ck-logo-light.svg?react';
import styles from './index.module.scss';

declare const HOME_FOOTER_LINK: string;

interface SocialLink {
  href: string;
  icon: React.ReactNode;
  label: string;
}

interface HomeFooterProps {
  LinkComponent?: React.ComponentType<{
    href?: string;
    children: React.ReactNode;
  }>;
  SocialLinksComponent?: React.ComponentType<{
    socialLinks: SocialLink[];
  }>;
}

function HomeFooter(props: HomeFooterProps) {
  const { siteData } = usePageData();
  const LinkComponent = props.LinkComponent ?? Link;
  const SocialLinksComponent = props.SocialLinksComponent ?? SocialLinks;

  return (
    <footer className={styles.container}>
      <div className={styles.row}>
        <LinkComponent href={HOME_FOOTER_LINK}>
          <div className={styles.logo}>
            <CKLogoDark className={styles.logoDark} />
            <CKLogoLight className={styles.logoLight} />
          </div>
        </LinkComponent>
        <span className={styles.message}>
          {siteData.themeConfig.footer?.message}
        </span>
        <SocialLinksComponent socialLinks={siteData.themeConfig.socialLinks} />
      </div>
    </footer>
  );
}

export { HomeFooter };
export type { HomeFooterProps };
