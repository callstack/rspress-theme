import {
  Announcement,
  HomeFeature,
  OutlineCTA,
  PrevNextPage,
} from '@callstack/rspress-theme';
import { useDark } from 'rspress/runtime';
import { Layout as RspressLayout } from 'rspress/theme';

const Layout = () => {
  const isDark = useDark();

  return (
    <RspressLayout
      beforeNav={
        <Announcement
          href="./guide"
          message="Announcement Test"
          localStorageKey=""
        />
      }
      afterOutline={<OutlineCTA isDark={isDark} />}
    />
  );
};

export { Layout, PrevNextPage, HomeFeature };

export * from 'rspress/theme';
