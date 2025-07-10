import { Button } from '../../primitives/button';
import styles from './index.module.scss';

interface OutlineCTAProps {
  href: string;
}

export function OutlineCTA({ href }: OutlineCTAProps) {
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
      <Button external href={href}>
        Let's talk
      </Button>
    </div>
  );
}
