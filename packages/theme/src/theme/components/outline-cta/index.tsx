import { usePageData, useSite } from '@rspress/core/runtime';
import { Button } from '../button';
import styles from './index.module.scss';

declare const OUTLINE_CTA_LINK: string;
declare const OUTLINE_CTA_BUTTON_TEXT: string;
declare const OUTLINE_CTA_DESCRIPTION: string;
declare const OUTLINE_CTA_HEADLINE: string;

interface OutlineCTAProps {
  buttonText?: string;
  description?: string;
  headline?: string;
  href?: string;
}

export function OutlineCTA({
  buttonText = OUTLINE_CTA_BUTTON_TEXT,
  description = OUTLINE_CTA_DESCRIPTION,
  headline = OUTLINE_CTA_HEADLINE,
  href = OUTLINE_CTA_LINK,
}: OutlineCTAProps) {
  const { page } = usePageData();
  const { site } = useSite();

  const isScrollToTopEnabled = site.themeConfig?.enableScrollToTop ?? true;
  const hasOutline = page.toc && page.toc.length > 0;
  const showDivider = isScrollToTopEnabled && hasOutline;

  return (
    <>
      {showDivider && <div className="rp-outline__divider" />}
      <div className={styles.container}>
        <div>
          <div className={styles.headline}>{headline}</div>
          <div className={styles.description}>{description}</div>
        </div>
        <Button external href={href}>
          {buttonText}
        </Button>
      </div>
    </>
  );
}
