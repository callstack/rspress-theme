import { Link } from '@theme';
import IconArrowBarRight from './arrow-bar-right.svg?react';
import styles from './index.module.scss';

interface PrevNextPageProps {
  type: 'prev' | 'next';
  text: string;
  href: string;
}

// TODO: use locale site data
const prevPageText = 'Previous Page';
const nextPageText = 'Next Page';

export function PrevNextPage(props: PrevNextPageProps) {
  const { type, text, href } = props;
  const pageText = type === 'prev' ? prevPageText : nextPageText;
  const isPrev = type === 'prev';

  return (
    <Link href={href} className={styles.pagerLink}>
      <div className={`${styles.inner} ${isPrev ? styles.prev : styles.next}`}>
        {isPrev && (
          <span className={styles.iconWrap}>
            <span className={styles.iconBg}>
              <IconArrowBarRight
                className={`${styles.icon} ${styles.iconPrev}`}
              />
            </span>
          </span>
        )}
        <span className={styles.textWrap}>
          <span className={styles.desc}>{pageText}</span>
          <span className={styles.title}>{text}</span>
        </span>
        {!isPrev && (
          <span className={styles.iconWrap}>
            <span className={styles.iconBg}>
              <IconArrowBarRight
                className={`${styles.icon} ${styles.iconNext}`}
              />
            </span>
          </span>
        )}
      </div>
    </Link>
  );
}
