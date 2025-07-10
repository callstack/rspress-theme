import IconArrowBarRight from './arrow-bar-right.svg?react';
import styles from './index.module.scss';

interface ButtonProps {
  isDark?: boolean;
  text: string;
}

export function Button({ isDark = false, text }: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${
        isDark ? styles.buttonDark : styles.buttonLight
      }`}
      type="button"
    >
      {text}
      <IconArrowBarRight
        className={`${styles['button-icon']} ${
          isDark ? styles.buttonIconDark : styles.buttonIconLight
        }`}
        aria-hidden="true"
        focusable="false"
      />
    </button>
  );
}
