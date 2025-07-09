import {
  Announcement,
  HomeBanner,
  HomeFeature,
  HomeFooter,
  HomeHero,
  OutlineCTA,
  PrevNextPage,
} from '@callstack/rspress-theme';
import {
  HomeLayout as RspressHomeLayout,
  Layout as RspressLayout,
} from 'rspress/theme';

const Layout = () => {
  return (
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
};

const HomeLayout = () => {
  return (
    <RspressHomeLayout
      afterFeatures={
        <>
          <HomeBanner />
          <HomeFooter />
        </>
      }
    />
  );
};

export { Layout, HomeLayout, PrevNextPage, HomeFeature, HomeHero };

export * from 'rspress/theme';
