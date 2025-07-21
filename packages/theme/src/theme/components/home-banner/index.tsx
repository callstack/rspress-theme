import {
  HOME_BANNER_BUTTON_TEXT,
  HOME_BANNER_DESCRIPTION,
  HOME_BANNER_HEADLINE,
} from '../../const';
import { Button } from '../button';
import abstractAtom from './abstract-atom.avif';
import styles from './index.module.scss';

declare const HOME_BANNER_LINK: string;

interface HomeBannerProps {
  buttonText?: string;
  description?: string;
  headline?: string;
  href?: string;
}

export function HomeBanner({
  buttonText = HOME_BANNER_BUTTON_TEXT,
  description = HOME_BANNER_DESCRIPTION,
  headline = HOME_BANNER_HEADLINE,
  href = HOME_BANNER_LINK,
}: HomeBannerProps) {
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
        <h1 className={styles.headline}>{headline}</h1>
        <div className={styles.description}>
          <p className={styles.descriptionText}>{description}</p>
          <div>
            <Button dark external href={href}>
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
