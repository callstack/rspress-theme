import type { FrontMatterMeta } from '@rspress/shared';
import { normalizeImagePath, useDark } from '@runtime';
import { Button, CTAButton } from 'src/theme/primitives';
// import { isExternalUrl, withBase } from '@shared';
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
}: HomeHeroProps) {
  const isDark = useDark();
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
          {hero.actions.map((action) =>
            action.theme === 'alt' ? (
              <Button isDark={isDark} key={action.text} text={action.text} />
            ) : (
              <CTAButton isDark={isDark} key={action.text} text={action.text} />
            )
          )}
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
