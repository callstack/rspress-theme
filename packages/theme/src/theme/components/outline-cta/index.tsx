import IconCorner from './corner';
import styles from './index.module.scss';

export const OutlineCTA = ({ isDark }: { isDark: boolean }) => {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.headline}>
          Need to boost your app's performance?
        </div>
        <div className={styles.description}>
          We help React Native teams enhance speed, responsiveness, and
          efficiency.
        </div>
      </div>
      <button
        className={`${styles.button} ${isDark ? styles.buttonDark : styles.buttonLight}`}
        type="button"
      >
        Let's chat
        <IconCorner
          className={`${styles['button-icon']} ${isDark ? styles.buttonIconDark : styles.buttonIconLight}`}
          aria-hidden="true"
          focusable="false"
        />
      </button>
    </div>
  );
};
