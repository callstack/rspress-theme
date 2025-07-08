import { Announcement, OutlineCTA } from '@callstack/rspress-theme';
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
    afterOutline={<OutlineCTA />}
  />
);

export { Layout };

export * from 'rspress/theme';
