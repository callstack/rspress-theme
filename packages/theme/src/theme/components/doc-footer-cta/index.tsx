import { usePageData } from '@rspress/core/runtime';
import abstractAtom from '../../assets/abstract-atom.avif';
import { Button } from '../button';
import styles from './index.module.scss';

declare const DOC_FOOTER_CTA_LINK: string;
declare const DOC_FOOTER_CTA_BUTTON_TEXT: string;
declare const DOC_FOOTER_CTA_HEADLINE: string;

interface DocFooterCTAProps {
  buttonText?: string;
  headline?: string;
  href?: string;
}

export function DocFooterCTA({
  buttonText = DOC_FOOTER_CTA_BUTTON_TEXT,
  headline = DOC_FOOTER_CTA_HEADLINE,
  href = DOC_FOOTER_CTA_LINK,
}: DocFooterCTAProps) {
  const pageData = usePageData();

  // hide on overview pages
  if (pageData.page.frontmatter.overview) {
    return null;
  }

  return (
    <div className={styles.container}>
      <img
        className={styles.logo}
        src={abstractAtom}
        alt="Abstract Logo"
        aria-hidden="true"
      />
      <div className={styles.content}>
        <div className={styles.headlineContainer}>
          <h1 className={styles.headline}>{headline}</h1>
        </div>
        <div className={styles.buttonContainer}>
          <Button dark external href={href}>
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
