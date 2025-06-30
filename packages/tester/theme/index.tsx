import { Announcement } from '@callstack/rspress-theme';
import { Layout as RspressLayout } from 'rspress/theme';

const Layout = () => (
  <RspressLayout
    beforeNav={
      <Announcement
        href="./guide"
        message="Announcement Test"
        localStorageKey=""
      />
    }
  />
);

export { Layout };

export * from 'rspress/theme';
