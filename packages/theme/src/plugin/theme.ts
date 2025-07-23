import {
  Announcement,
  Button,
  Card,
  HomeBanner,
  HomeFeature,
  HomeFooter,
  HomeHero,
  LinkCard,
  OutlineCTA,
  PrevNextPage,
  SwitchAppearance,
  VersionBadge,
  // @ts-ignore
} from '@callstack/rspress-theme';
import {
  HomeLayout as DefaultHomeLayout,
  Layout as DefaultLayout,
  // @ts-ignore
} from '@default-theme';
import React from 'react';

const Layout = (
  props: Parameters<typeof DefaultLayout>[0]
): React.JSX.Element => {
  const afterOutline = props.afterOutline ?? [
    React.createElement(OutlineCTA, { key: 'outline-cta' }),
  ];

  return React.createElement(DefaultLayout, { ...props, afterOutline });
};

const HomeLayout = (
  props: Parameters<typeof DefaultHomeLayout>[0]
): React.JSX.Element => {
  const afterFeatures = props.afterFeatures ?? [
    React.createElement(HomeBanner, { key: 'home-banner' }),
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
  Card,
  HomeBanner,
  HomeFeature,
  HomeFooter,
  HomeHero,
  LinkCard,
  OutlineCTA,
  PrevNextPage,
  SwitchAppearance,
  VersionBadge,
};

// @ts-ignore
export * from '@default-theme';
