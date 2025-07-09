import { useDark } from '@runtime';
import { CTAButton } from '../../primitives/cta-button';
import styles from './index.module.scss';

export function OutlineCTA() {
  const isDark = useDark();

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
      <CTAButton isDark={isDark} text="Let's talk" />
    </div>
  );
}
