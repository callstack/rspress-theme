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
    // setting left: 0 in style because tailwind doesn't generate rp-left-0, weird.
    <footer className="rp-absolute rp-right-0 rp-left-0 rp-bottom-0 rp-py-8 rp-px-2 rp-w-full rp-max-w-6xl rp-mx-auto" style={{left: 0}}>
      <div className={styles.row}>
        <LinkComponent href={HOME_FOOTER_LINK}>
          <div className={styles.logo}>
            <CKLogoDark className="rp-hidden dark:rp-block" />
            <CKLogoLight className="dark:rp-hidden" />
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
