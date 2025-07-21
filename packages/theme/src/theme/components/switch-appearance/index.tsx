import { type MouseEvent, useContext } from 'react';
import { DataContext, ThemeContext, flushSync } from 'rspress/runtime';
import IconMoon from '../../assets/moon.svg?react';
import IconSun from '../../assets/sun.svg?react';
import './index.module.scss';

const supportAppearanceTransition = () => {
  return (
    typeof document?.startViewTransition === 'function' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
};

// two view-transition name is conflicted, 'flip' and 'root', see https://github.com/web-infra-dev/rspress/pull/1272
const removeClipViewTransition = () => {
  const styleDom = document.createElement('style');
  styleDom.innerHTML = `
      .rspress-doc {
        view-transition-name: none !important;
      }
  `;
  document.head.appendChild(styleDom);
  return () => {
    document.head.removeChild(styleDom);
  };
};

export function SwitchAppearance({ onClick }: { onClick?: () => void }) {
  const { data: pageData } = useContext(DataContext);
  const { theme, setTheme = () => {} } = useContext(ThemeContext);

  const handleClick = (event: MouseEvent) => {
    const supported = supportAppearanceTransition();
    const enabled = pageData.siteData?.themeConfig?.enableAppearanceAnimation;

    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const isDark = nextTheme === 'dark';

    if (supported && enabled) {
      const x = event.clientX;
      const y = event.clientY;

      const endRadius = Math.hypot(
        Math.max(x, innerWidth - x + 200),
        Math.max(y, innerHeight - y + 200)
      );

      const dispose = removeClipViewTransition();
      const transition = document.startViewTransition(async () => {
        flushSync(() => {
          setTheme(nextTheme);
          onClick?.();
        });
      });

      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      transition.ready.then(() => {
        document.documentElement
          .animate(
            {
              clipPath: isDark ? [...clipPath].reverse() : clipPath,
            },
            {
              duration: 400,
              easing: 'ease-in',
              pseudoElement: isDark
                ? '::view-transition-old(root)'
                : '::view-transition-new(root)',

              id: '',
            }
          )
          .finished.then(() => {
            dispose();
          });
      });
    } else {
      setTheme(nextTheme);
      onClick?.();
    }
  };

  return (
    <div onClick={handleClick} className="md:rp-mr-2 rspress-nav-appearance">
      <div className="rp-p-1 rp-border rp-border-solid rp-border-gray-300 rp-text-gray-400 rp-cursor-pointer rp-rounded-md hover:rp-border-gray-600 hover:rp-text-gray-600 dark:hover:rp-border-gray-200 dark:hover:rp-text-gray-200 rp-transition-all rp-duration-300 rp-w-7 rp-h-7">
        <IconMoon
          className="dark:rp-hidden"
          width="18"
          height="18"
          fill="currentColor"
        />
        <IconSun
          className="rp-hidden dark:rp-block"
          width="18"
          height="18"
          fill="currentColor"
        />
      </div>
    </div>
  );
}
