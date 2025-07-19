// @ts-nocheck
import {
  Announcement,
  Button,
  HomeBanner,
  HomeFeature,
  HomeFooter,
  HomeHero,
  LinkCard,
  OutlineCTA,
  PrevNextPage,
  VersionBadge,
} from '@callstack/rspress-theme';
import {
  HomeLayout as DefaultHomeLayout,
  Layout as DefaultLayout,
} from '@default-theme';
import React from 'react';

const Layout = (
  props: Parameters<typeof DefaultLayout>[0]
): React.JSX.Element => {
  const afterOutline = props.afterOutline ?? [
    React.createElement(OutlineCTA, {
      href: 'https://callstack.com',
    }),
  ];

  return React.createElement(DefaultLayout, { ...props, afterOutline });
};

const HomeLayout = (
  props: Parameters<typeof DefaultHomeLayout>[0]
): React.JSX.Element => {
  const afterFeatures = props.afterFeatures ?? [
    React.createElement(HomeBanner, { href: 'https://callstack.com' }),
  ];

  return React.createElement(DefaultHomeLayout, { ...props, afterFeatures });
};

export {
  // layouts
  HomeLayout,
  Layout,
  // components
  Announcement,
  Button,
  HomeBanner,
  HomeFeature,
  HomeFooter,
  HomeHero,
  LinkCard,
  OutlineCTA,
  PrevNextPage,
  VersionBadge,
};

export * from '@default-theme';
