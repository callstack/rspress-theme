import { Announcement } from '@callstack/rspress-theme';
import Theme from 'rspress/theme';

const Layout = () => (
  <Theme.Layout
    beforeNav={
      <Announcement
        href="./guide"
        message="Announcement Test"
        localStorageKey=""
      />
    }
  />
);

export default {
  ...Theme,
  Layout,
};

export * from 'rspress/theme';
