import { Link } from '@theme';
import * as React from 'react';
import IconArrowBarRight from './arrow-bar-right.svg?react';
import IconCorner from './corner-down-right.svg?react';
import styles from './index.module.scss';

interface ButtonProps {
  type?: string;
  theme?: 'brand' | 'alt';
  href?: string;
  external?: boolean;
  className?: string;
  children?: React.ReactNode;
  dark?: boolean;
}

export function Button(props: ButtonProps): React.ReactNode {
  const {
    dark = false,
    theme = 'brand',
    href = '/',
    external = false,
    className = '',
    children,
  } = props;
  let type: string | typeof Link | null = null;

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
        href,
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
        href,
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
