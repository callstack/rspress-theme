import {
  isExternalUrl,
  normalizeHrefInRuntime,
  normalizeImagePath,
  useFrontmatter,
  withBase,
} from '@rspress/core/runtime';
import type { Hero } from '../../types';
import { renderHtmlOrText } from '../../utils';
import { Button } from '../button';
import styles from './index.module.scss';

const DEFAULT_HERO = {
  name: '',
  text: '',
  tagline: '',
  actions: [],
  image: undefined,
} satisfies Hero;

interface HomeHeroProps {
  routePath: string;
  beforeHeroActions?: React.ReactNode;
  afterHeroActions?: React.ReactNode;
}

function HomeHero({ beforeHeroActions, afterHeroActions }: HomeHeroProps) {
  const { frontmatter } = useFrontmatter();
  const hero = frontmatter.hero ?? DEFAULT_HERO;
  const imageSrc =
    typeof hero.image?.src === 'string'
      ? { light: hero.image.src, dark: hero.image.src }
      : hero.image?.src || { light: '', dark: '' };

  return (
    <div className={styles.container}>
      <div className={styles.heroMain}>
        {hero.image ? (
          <div>
            <img
              className={`rp-home-hero__image-img--light ${styles.heroImage}`}
              src={normalizeImagePath(imageSrc.light)}
              alt={hero.image?.alt}
              srcSet={normalizeSrcsetAndSizes(hero.image?.srcset)}
              sizes={normalizeSrcsetAndSizes(hero.image?.sizes)}
            />
            <img
              className={`rp-home-hero__image-img--dark ${styles.heroImage}`}
              src={normalizeImagePath(imageSrc.dark)}
              alt={hero.image?.alt}
              srcSet={normalizeSrcsetAndSizes(hero.image?.srcset)}
              sizes={normalizeSrcsetAndSizes(hero.image?.sizes)}
            />
          </div>
        ) : null}
        {hero?.name ? (
          <h1 className={styles.heroName} {...renderHtmlOrText(hero.name)} />
        ) : null}
      </div>
      <div className={styles.heroTaglineActions}>
        <div
          className={styles.heroTagline}
          {...renderHtmlOrText(hero.tagline)}
        />
        {beforeHeroActions}
        <div className={styles.heroActions}>
          {hero.actions?.map((action) => {
            const link = isExternalUrl(action.link)
              ? action.link
              : normalizeHrefInRuntime(withBase(action.link));

            return (
              <Button
                key={action.text}
                href={link}
                theme={action.theme}
                {...renderHtmlOrText(action.text)}
              />
            );
          })}
        </div>
      </div>
      {afterHeroActions}
    </div>
  );
}

function normalizeSrcsetAndSizes(
  field: undefined | string | string[]
): string | undefined {
  const r = (Array.isArray(field) ? field : [field]).filter(Boolean).join(', ');
  return r || undefined;
}

export { HomeHero };
export type { HomeHeroProps };
