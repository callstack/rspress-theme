import { useState } from 'react';
import { NoSSR } from 'rspress/runtime';
import IconClose from '../../assets/close.svg?react';
import styles from './index.module.scss';

interface AnnouncementProps {
  href: string;
  message: string;
  localStorageKey: string;
  display?: boolean;
}

// based on https://github.com/rspack-contrib/rstack-doc-ui/blob/main/src/announcement/index.tsx
export function Announcement({
  href,
  message,
  localStorageKey,
  display = true,
}: AnnouncementProps) {
  return (
    <NoSSR>
      <AnnouncementComponent
        href={href}
        message={message}
        localStorageKey={localStorageKey}
        display={display}
      />
    </NoSSR>
  );
}

function AnnouncementComponent({
  href,
  message,
  localStorageKey,
  display = true,
}: AnnouncementProps) {
  if (!display) {
    return null;
  }
  const [disable, setDisable] = useState(
    window.localStorage.getItem(localStorageKey) ?? false
  );

  if (disable) {
    return null;
  }

  return (
    <div className={styles.bar}>
      <a href={href} className={styles.link}>
        {message}
      </a>
      <IconClose
        className={styles.close}
        onClick={() => {
          setDisable(true);
          window.localStorage.setItem(localStorageKey, 'true');
        }}
      />
    </div>
  );
}
