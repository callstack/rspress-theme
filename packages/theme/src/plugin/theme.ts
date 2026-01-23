import {
  Announcement,
  Badge,
  Button,
  Card,
  DocFooterCTA,
  HomeBanner,
  HomeFeature,
  HomeFooter,
  HomeHero,
  LinkCard,
  OutlineCTA,
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
  const afterDocContent = props.afterDocContent ?? [
    React.createElement(DocFooterCTA, { key: 'doc-footer-cta' }),
  ];

  return React.createElement(DefaultLayout, {
    ...props,
    afterOutline,
    afterDocContent,
  });
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
  Badge,
  Button,
  Card,
  HomeBanner,
  HomeFeature,
  HomeFooter,
  HomeHero,
  LinkCard,
  OutlineCTA,
  SwitchAppearance,
  VersionBadge,
};

export { default as IconAlert } from '../assets/alert.svg?react';
export { default as IconArrowDown } from '../assets/arrow-down.svg?react';
export { default as IconArrowRight } from '../assets/arrow-right.svg?react';
export { default as IconCallstack } from '../assets/callstack.svg?react';
export { default as IconCheckDouble } from '../assets/check-double.svg?react';
export { default as IconClose } from '../assets/close.svg?react';
export { default as IconDetails } from '../assets/details.svg?react';
export { default as IconEditBox } from '../assets/edit-box.svg?react';
export { default as IconEmpty } from '../assets/empty.svg?react';
export { default as IconHeroBgShape } from '../assets/hero-bg-shape.svg?react';
export { default as IconInfoBox } from '../assets/info-box.svg?react';
export { default as IconMenu } from '../assets/menu.svg?react';
export { default as IconMoon } from '../assets/moon.svg?react';
export { default as IconNoise } from '../assets/noise.svg?react';
export { default as IconNotes } from '../assets/notes.svg?react';
export { default as IconSearch } from '../assets/search.svg?react';
export { default as IconSmallMenu } from '../assets/small-menu.svg?react';
export { default as IconSun } from '../assets/sun.svg?react';
export { default as IconWarningBox } from '../assets/warning-box.svg?react';
export { default as IconDown } from '../assets/arrow-down.svg?react';
export { default as IconCopy } from '../assets/copy.svg?react';
export { default as IconSuccess } from '../assets/check.svg?react';
export { default as IconExternalLink } from '../assets/upload.svg?react';
export { default as IconLink } from '../assets/link.svg?react';

// @ts-ignore
export * from '@default-theme';
