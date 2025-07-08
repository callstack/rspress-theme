import IconCorner from './corner';
import styles from './index.module.scss';

export const OutlineCTA = () => (
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
    <button className={styles.button} type="button">
      Let's chat
      <IconCorner className={styles['button-icon']} />
    </button>
  </div>
);
