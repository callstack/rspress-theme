import {
  isExternalUrl,
  normalizeHrefInRuntime,
  useFrontmatter,
  withBase,
} from '@rspress/core/runtime';
import type { Feature } from '../../types';
import { renderHtmlOrText } from '../../utils';
import styles from './index.module.scss';

const getGridClass = ({ span }: Feature): string => {
  switch (span) {
    case 2:
      return styles.grid2;
    case 3:
      return styles.grid3;
    case 4:
      return styles.grid4;
    case 6:
      return styles.grid6;
    case undefined:
      return styles.grid4;
    default:
      return '';
  }
};

export function HomeFeature() {
  const { frontmatter } = useFrontmatter();

  return (
    <div className={styles.container}>
      {frontmatter.features?.map((feature) => {
        const { icon, title, details, link: rawLink } = feature;

        let link = rawLink;
        if (rawLink) {
          link = isExternalUrl(rawLink)
            ? rawLink
            : normalizeHrefInRuntime(withBase(rawLink));
        }

        return (
          <div key={title} className={`${getGridClass(feature)} rp-rounded`}>
            <div className={styles.featureCardContainer}>
              <article
                key={title}
                className={styles.featureCard}
                style={{ cursor: link ? 'pointer' : 'auto' }}
                onClick={() => {
                  if (link) {
                    window.location.href = link;
                  }
                }}
              >
                {icon ? (
                  <div className={styles.featureIconContainer}>
                    <div
                      className={styles.featureIcon}
                      {...renderHtmlOrText(icon)}
                    />
                  </div>
                ) : null}
                <h2
                  className={styles.featureTitle}
                  {...renderHtmlOrText(title)}
                />
                <p
                  className={styles.featureDetail}
                  {...renderHtmlOrText(details)}
                />
              </article>
            </div>
          </div>
        );
      })}
    </div>
  );
}
