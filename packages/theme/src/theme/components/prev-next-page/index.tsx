import { useI18n } from '@rspress/core/runtime';
import { Link, renderInlineMarkdown, usePrevNextPage } from '@theme';
import IconArrowBarRight from '../../assets/arrow-bar-right.svg?react';
import styles from './index.module.scss';

export function PrevNextPage() {
  const { prevPage, nextPage } = usePrevNextPage();
  const t = useI18n();

  return (
    <div className={styles.container}>
      {prevPage ? (
        <Link href={prevPage.link} className={styles.pagerLink}>
          <span className={styles.iconBox}>
            <IconArrowBarRight className={`${styles.icon} ${styles.iconPrev}`} />
          </span>
          <span className={styles.textWrap}>
            <span className={styles.desc}>{t('prevPageText')}</span>
            <span className={styles.title} {...renderInlineMarkdown(prevPage.text)} />
          </span>
        </Link>
      ) : (
        <div className={styles.placeholder} />
      )}
      {nextPage ? (
        <Link href={nextPage.link} className={`${styles.pagerLink} ${styles.next}`}>
          <span className={styles.textWrap}>
            <span className={styles.desc}>{t('nextPageText')}</span>
            <span className={styles.title} {...renderInlineMarkdown(nextPage.text)} />
          </span>
          <span className={styles.iconBox}>
            <IconArrowBarRight className={styles.icon} />
          </span>
        </Link>
      ) : (
        <div className={styles.placeholder} />
      )}
    </div>
  );
}
