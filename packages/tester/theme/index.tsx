import {
  Announcement,
  HomeBanner,
  HomeFeature,
  HomeFooter,
  HomeHero,
  OutlineCTA,
  PrevNextPage,
} from '@callstack/rspress-theme';
import { useDark } from 'rspress/runtime';
import {
  HomeLayout as RspressHomeLayout,
  Layout as RspressLayout,
} from 'rspress/theme';

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

const HomeLayout = () => {
  return (
    <RspressHomeLayout
      afterFeatures={
        <>
          <HomeBanner text="HomeBanner" />
          <HomeFooter />
        </>
      }
    />
  );
};

export { Layout, HomeLayout, PrevNextPage, HomeFeature, HomeHero };

export * from 'rspress/theme';
