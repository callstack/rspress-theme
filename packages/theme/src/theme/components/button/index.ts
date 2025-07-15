import { Link } from '@theme';
import * as React from 'react';
import { useDark } from 'rspress/runtime';
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

function getStyles(
  theme: string,
  isDarkMode: boolean,
  styles: Record<string, string>
) {
  const invert = theme === 'brand';
  const useDarkStyle = invert ? !isDarkMode : isDarkMode;
  return useDarkStyle ? styles.buttonDark : styles.buttonLight;
}

function getIconStyles(
  theme: string,
  isDarkMode: boolean,
  styles: Record<string, string>
) {
  const invert = theme === 'brand';
  const useDarkStyle = invert ? !isDarkMode : isDarkMode;
  return useDarkStyle ? styles.buttonIconDark : styles.buttonIconLight;
}

export function Button(props: ButtonProps): React.ReactNode {
  const isDark = useDark();

  const {
    dark,
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

  const isDarkMode = dark ?? isDark;
  const modeStyles = getStyles(theme, isDarkMode, styles);
  const iconModeStyles = getIconStyles(theme, isDarkMode, styles);

  return React.createElement(
    type,
    {
      className: `${styles.button} ${styles[theme]} ${modeStyles} ${className}`,
      href,
    },
    [
      children,
      React.createElement(theme === 'brand' ? IconCorner : IconArrowBarRight, {
        key: 'button-icon',
        className: `${styles['button-icon']} ${iconModeStyles}`,
        'aria-hidden': true,
        focusable: false,
      }),
    ]
  );
}
