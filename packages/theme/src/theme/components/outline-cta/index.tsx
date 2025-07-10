import { Button } from '../../primitives/button';
import styles from './index.module.scss';

export function OutlineCTA() {
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
      <Button>Let's talk</Button>
    </div>
  );
}
