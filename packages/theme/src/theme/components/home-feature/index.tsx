import type { Feature, FrontMatterMeta } from '@rspress/shared';
import { normalizeHrefInRuntime, withBase } from '@runtime';
import { isExternalUrl } from '@shared';
import {
  IconLayoutColumns,
  IconLayoutDistributeVertical,
  IconRepeat,
  IconServer,
  IconSliders2,
  IconTrendingDown,
} from './icons';
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

const getIconComponent = (icon: string) => {
  switch (icon) {
    case 'server':
      return IconServer;
    case 'layout-distribute-vertical':
      return IconLayoutDistributeVertical;
    case 'sliders':
      return IconSliders2;
    case 'repeat':
      return IconRepeat;
    case 'layout-columns':
      return IconLayoutColumns;
    case 'trending-down':
      return IconTrendingDown;
    default:
      return icon;
  }
};

const isIconComponent = (icon: string | React.ComponentType) => {
  return typeof icon === 'function';
};

export function HomeFeature({
  frontmatter,
}: {
  frontmatter: FrontMatterMeta;
  routePath: string;
}) {
  const features = frontmatter?.features;

  return (
    <div className="rp-overflow-hidden rp-m-auto rp-flex rp-flex-wrap rp-max-w-6xl">
      {features?.map((feature) => {
        const { icon, title, details, link: rawLink } = feature;
        const IconComponent = getIconComponent(icon);

        let link = rawLink;
        if (rawLink) {
          link = isExternalUrl(rawLink)
            ? rawLink
            : normalizeHrefInRuntime(withBase(rawLink));
        }

        return (
          <div
            key={title}
            className={`${getGridClass(feature)} rp-rounded hover:rp-var(--rp-c-brand)`}
          >
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
                  <div className="rp-flex rp-items-center rp-justify-center">
                    <div className={styles.featureIcon}>
                      {isIconComponent(IconComponent) ? (
                        <IconComponent />
                      ) : (
                        icon
                      )}
                    </div>
                  </div>
                ) : null}
                <h2 className={styles.featureTitle}>{title}</h2>
                <p className={styles.featureDetail}>{details}</p>
              </article>
            </div>
          </div>
        );
      })}
    </div>
  );
}
