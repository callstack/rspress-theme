import { useSite } from '@rspress/core/runtime';
import { Link } from '@theme';
import * as React from 'react';
import IconArrowBarRight from '../../assets/arrow-bar-right.svg?react';
import IconCorner from '../../assets/corner-down-right.svg?react';
import styles from './index.module.scss';

interface ButtonProps {
  type?: string;
  theme?: 'brand' | 'alt';
  href?: string;
  external?: boolean;
  className?: string;
  children?: React.ReactNode;
  dark?: boolean;
  location?: string;
}

declare const UTM_CAMPAIGN: string;
declare const UTM_MEDIUM: string;

export function Button(props: ButtonProps): React.ReactNode {
  const {
    dark = false,
    theme = 'brand',
    href = '/',
    external = false,
    className = '',
    children,
    location,
  } = props;
  let type: string | typeof Link | null = null;
  let finalHref = href;

  const site = useSite();

  // Handle UTM parameters for callstack.com external links
  if (external && href.includes('callstack.com')) {
    if (!location) {
      console.warn('location prop is missing for external callstack.com link');
    } else {
      const url = new URL(href);
      url.searchParams.set('utm_campaign', UTM_CAMPAIGN);
      url.searchParams.set('utm_source', site.site.title);
      url.searchParams.set('utm_medium', UTM_MEDIUM);
      url.searchParams.set('utm_content', location);
      finalHref = url.toString();
    }
  }

  if (props.type === 'button') {
    type = 'button';
  } else if (props.type === 'a') {
    type = external ? 'a' : Link;
  } else {
    type = 'a';
  }

  return React.createElement('div', { className: dark ? 'dark' : undefined }, [
    React.createElement(
      type,
      {
        key: 'button-1',
        className: `dark:rp-hidden rp-block ${styles.button} ${styles[theme]} ${className}`,
        href: finalHref,
      },
      [
        children,
        React.createElement(
          theme === 'brand' ? IconCorner : IconArrowBarRight,
          {
            key: 'button-icon-1',
            className: `${styles['button-icon']}`,
            'aria-hidden': true,
            focusable: false,
          }
        ),
      ]
    ),
    React.createElement(
      type,
      {
        key: 'button-2',
        className: `rp-hidden dark:rp-block ${styles.button} ${styles[theme]} ${className}`,
        href: finalHref,
      },
      [
        children,
        React.createElement(
          theme === 'brand' ? IconCorner : IconArrowBarRight,
          {
            key: 'button-icon-2',
            className: `${styles['button-icon']}`,
            'aria-hidden': true,
            focusable: false,
          }
        ),
      ]
    ),
  ]);
}
