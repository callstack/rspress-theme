import type { FrontMatterMeta } from '@rspress/shared';
import { normalizeHrefInRuntime, normalizeImagePath, withBase } from '@runtime';
import { isExternalUrl } from '@shared';
import { Button } from '../button';
import styles from './index.module.scss';

const DEFAULT_HERO = {
  name: '',
  text: '',
  tagline: '',
  actions: [],
  image: undefined,
} satisfies FrontMatterMeta['hero'];

interface HomeHeroProps {
  frontmatter: FrontMatterMeta;
  routePath: string;
  beforeHeroActions?: React.ReactNode;
  afterHeroActions?: React.ReactNode;
}

function HomeHero({
  beforeHeroActions,
  afterHeroActions,
  frontmatter,
  routePath,
}: HomeHeroProps) {
  const hero = frontmatter.hero ?? DEFAULT_HERO;
  const imageSrc =
    typeof hero.image?.src === 'string'
      ? { light: hero.image.src, dark: hero.image.src }
      : hero.image?.src || { light: '', dark: '' };

  return (
    <div className={`rp-overflow-hidden rp-max-w-6xl ${styles.container}`}>
      <div className={styles.heroMain}>
        {hero.image ? (
          <div>
            <img
              className={`dark:rp-hidden ${styles.heroImage}`}
              src={normalizeImagePath(imageSrc.light)}
              alt={hero.image?.alt}
              srcSet={normalizeSrcsetAndSizes(hero.image?.srcset)}
              sizes={normalizeSrcsetAndSizes(hero.image?.sizes)}
            />
            <img
              className={`rp-hidden dark:rp-block ${styles.heroImage}`}
              src={normalizeImagePath(imageSrc.dark)}
              alt={hero.image?.alt}
              srcSet={normalizeSrcsetAndSizes(hero.image?.srcset)}
              sizes={normalizeSrcsetAndSizes(hero.image?.sizes)}
            />
          </div>
        ) : null}
        {hero?.name ? <h1 className={styles.heroName}>{hero.name}</h1> : null}
      </div>
      <div className={styles.heroTaglineActions}>
        <div className={styles.heroTagline}>{hero.tagline}</div>
        {beforeHeroActions}
        <div className={styles.heroActions}>
          {hero.actions.map((action) => {
            const link = isExternalUrl(action.link)
              ? action.link
              : normalizeHrefInRuntime(withBase(action.link, routePath));

            return (
              <Button key={action.text} href={link} theme={action.theme}>
                {action.text}
              </Button>
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
