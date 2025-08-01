import {
  OUTLINE_CTA_BUTTON_TEXT,
  OUTLINE_CTA_DESCRIPTION,
  OUTLINE_CTA_HEADLINE,
} from '../../const';
import { Button } from '../button';
import styles from './index.module.scss';

declare const OUTLINE_CTA_LINK: string;

interface OutlineCTAProps {
  buttonText?: string;
  description?: string;
  headline?: string;
  href?: string;
}

export function OutlineCTA({
  buttonText = OUTLINE_CTA_BUTTON_TEXT,
  description = OUTLINE_CTA_DESCRIPTION,
  headline = OUTLINE_CTA_HEADLINE,
  href = OUTLINE_CTA_LINK,
}: OutlineCTAProps) {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.headline}>{headline}</div>
        <div className={styles.description}>{description}</div>
      </div>
      <Button external href={href}>
        {buttonText}
      </Button>
    </div>
  );
}
