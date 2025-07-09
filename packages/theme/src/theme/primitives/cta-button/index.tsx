import IconCorner from './corner-down-right.svg?react';
import styles from './index.module.scss';

interface CTAButtonProps {
  isDark?: boolean;
  text: string;
}

export function CTAButton({ isDark = false, text }: CTAButtonProps) {
  return (
    <button
      className={`${styles.button} ${
        isDark ? styles.buttonDark : styles.buttonLight
      }`}
      type="button"
    >
      {text}
      <IconCorner
        className={`${styles['button-icon']} ${
          isDark ? styles.buttonIconDark : styles.buttonIconLight
        }`}
        aria-hidden="true"
        focusable="false"
      />
    </button>
  );
}
