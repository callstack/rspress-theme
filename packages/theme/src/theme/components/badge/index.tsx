import styles from './index.module.scss';

interface BadgeProps {
  /**
   * The content to display inside the badge. Can be a string or React nodes.
   */
  children?: React.ReactNode;
  /**
   * The type of badge, which determines its color and style.
   * @default 'tip'
   */
  type?: 'tip' | 'info' | 'warning' | 'danger' | 'note';
  /**
   * The text content to display inside the badge (for backwards compatibility).
   */
  text?: string;
  /**
   * Whether to display the badge with an outline style.
   * @default false
   */
  outline?: boolean;
}

export function Badge({
  children,
  type = 'tip',
  text,
  outline = false,
}: BadgeProps) {
  const content = children || text;

  return (
    <span
      className={`${styles.badge} ${styles[type]} ${
        outline ? styles.outline : ''
      }`}
    >
      {content}
    </span>
  );
}
