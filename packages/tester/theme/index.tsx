import {
  Announcement,
  HomeBanner,
  HomeFeature,
  HomeFooter,
  HomeHero,
  OutlineCTA,
  PrevNextPage,
} from '@callstack/rspress-theme';
import { usePageData } from 'rspress/runtime';
import {
  Badge,
  HomeLayout as RspressHomeLayout,
  Layout as RspressLayout,
} from 'rspress/theme';

const VersionBadge = () => {
  const pageData = usePageData();

  // hide on overview pages since it's badly positioned
  if (pageData.page.frontmatter.overview) {
    return null;
  }

  if (pageData.page.routePath.startsWith('/blog')) {
    return null;
  }

  return (
    <div className="py-2">
      <Badge type="info" outline text="Version: v5" />
    </div>
  );
};

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
      beforeDocContent={<VersionBadge />}
      afterOutline={<OutlineCTA href="https://callstack.com" />}
    />
  );
};

const HomeLayout = () => {
  return (
    <RspressHomeLayout
      afterFeatures={
        <>
          <HomeBanner href="https://callstack.com" />
          <HomeFooter />
        </>
      }
    />
  );
};

export { Layout, HomeLayout, PrevNextPage, HomeFeature, HomeHero };

export * from 'rspress/theme';
