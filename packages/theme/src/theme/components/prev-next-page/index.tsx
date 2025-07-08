// @ts-expect-error runtime import
import { Link } from '@theme';
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
  const linkClassName =
    type === 'prev' ? styles.pagerLink : `${styles.pagerLink} ${styles.next}`;

  return (
    <Link href={href} className={linkClassName}>
      <span className={styles.desc}>{pageText}</span>
      <span className={styles.title}>{text}</span>
    </Link>
  );
}
