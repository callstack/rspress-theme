import type * as React from 'react';
import styles from './index.module.scss';

interface CardProps {
  /**
   * The title of the card.
   */
  title: React.ReactNode;
  /**
   * The content to display inside the card.
   */
  content?: React.ReactNode;
  /**
   * The style of the card.
   */
  style?: React.CSSProperties;
}

export function Card(props: CardProps) {
  const { title, content, style } = props;

  return (
    <div className={styles.card} style={style}>
      <div className={styles.cardContentContainer}>
        <span className={styles.cardTitle}>{title}</span>
        {content && <span className={styles.cardContent}>{content}</span>}
      </div>
    </div>
  );
}
