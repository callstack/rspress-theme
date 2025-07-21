import { Button } from '../button';
import styles from './index.module.scss';

declare const OUTLINE_CTA_LINK: string;

interface OutlineCTAProps {
  href?: string;
}

export function OutlineCTA({ href = OUTLINE_CTA_LINK }: OutlineCTAProps) {
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
