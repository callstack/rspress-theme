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

  const Icon = theme === 'brand' ? IconCorner : IconArrowBarRight;

  const button = React.createElement(
    type,
    {
      href,
      className: `${styles.button} ${styles[theme]} ${className}`,
    },
    [
      children,
      React.createElement(Icon, {
        key: 'button-icon',
        className: styles['button-icon'],
        'aria-hidden': true,
        focusable: false,
      }),
    ]
  );

  if (dark) {
    return React.createElement('div', { className: 'dark' }, button);
  }

  return button;
}
