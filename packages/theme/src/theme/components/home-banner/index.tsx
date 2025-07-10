import { Button } from '../../primitives/button';
import abstractAtom from './abstract-atom.avif';
import styles from './index.module.scss';

interface HomeBannerProps {
  href: string;
}

export function HomeBanner({ href }: HomeBannerProps) {
  return (
    <div className={`rp-max-w-6xl ${styles.container}`}>
      <div className={styles.background}>
        <div className={styles.gradient} />
        <div className={styles.pattern} />
      </div>
      <img
        className={styles.logo}
        src={abstractAtom}
        alt="Abstract Logo"
        aria-hidden="true"
      />
      <div className={styles.content}>
        <h1 className={styles.heading}>
          Need React or React Native
          <br />
          expertise you can count on?
        </h1>
        <div className={styles.description}>
          <p className={styles.descriptionText}>
            We've spent years building full-stack, cross-platform apps and
            solving tough technical challenges.
          </p>
          <div>
            <Button dark external href={href}>
              Let's talk
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
