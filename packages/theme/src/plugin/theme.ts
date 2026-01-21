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
  LlmsContainer,
  LlmsCopyButton,
  LlmsViewOptions,
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
  LlmsContainer,
  LlmsCopyButton,
  LlmsViewOptions,
  OutlineCTA,
  SwitchAppearance,
  VersionBadge,
};

export { default as IconAlert } from '../assets/alert.svg';
export { default as IconArrowDown } from '../assets/arrow-down.svg';
export { default as IconArrowRight } from '../assets/arrow-right.svg';
export { default as IconCallstack } from '../assets/callstack.svg';
export { default as IconCheckDouble } from '../assets/check-double.svg';
export { default as IconClose } from '../assets/close.svg';
export { default as IconDetails } from '../assets/details.svg';
export { default as IconEditBox } from '../assets/edit-box.svg';
export { default as IconEmpty } from '../assets/empty.svg';
export { default as IconHeroBgShape } from '../assets/hero-bg-shape.svg';
export { default as IconInfoBox } from '../assets/info-box.svg';
export { default as IconMenu } from '../assets/menu.svg';
export { default as IconMoon } from '../assets/moon.svg';
export { default as IconNoise } from '../assets/noise.svg';
export { default as IconNotes } from '../assets/notes.svg';
export { default as IconSearch } from '../assets/search.svg';
export { default as IconSmallMenu } from '../assets/small-menu.svg';
export { default as IconSun } from '../assets/sun.svg';
export { default as IconWarningBox } from '../assets/warning-box.svg';

// @ts-ignore
export * from '@default-theme';
