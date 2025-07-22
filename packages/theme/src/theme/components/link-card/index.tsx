import type * as React from 'react';
import ArrowRight from '../../assets/arrow-right.svg?react';
import styles from './index.module.scss';

interface LinkCardProps {
  /**
   * The URL of the link.
   */
  href: string;
  /**
   * The title of the link.
   */
  title: string;
  /**
   * The description of the link.
   */
  description?: React.ReactNode;
  /**
   * The style of the link card.
   */
  style?: React.CSSProperties;
}

export function LinkCard(props: LinkCardProps) {
  const { href, title, description, style } = props;

  return (
    <div className={styles.linkCard} style={style}>
      <div className={styles.linkCardContent}>
        <a href={href} className={styles.link}>
          {title && <span className={styles.linkCardTitle}>{title}</span>}
        </a>
        <span className={styles.linkCardDescription}>{description}</span>
      </div>
      <div className={styles.linkCardArrow}>
        <ArrowRight />
      </div>
    </div>
  );
}
