import { useState } from 'react';
import IconCloseCircle from './close';
import styles from './index.module.scss';

// based on https://github.com/rspack-contrib/rstack-doc-ui/blob/main/src/announcement/index.tsx

export function Announcement({
  href,
  message,
  localStorageKey,
  display = true,
}: {
  href: string;
  message: string;
  localStorageKey: string;
  display?: boolean;
}) {
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
      <IconCloseCircle
        onClick={() => {
          setDisable(true);
          window.localStorage.setItem(localStorageKey, 'true');
        }}
        className={styles.close}
      />
    </div>
  );
}
