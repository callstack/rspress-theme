import type { Feature, FrontMatterMeta } from '@rspress/shared';
import {
  IconLayoutColumns,
  IconLayoutDistributeVertical,
  IconRepeat,
  IconServer,
  IconSliders2,
  IconTrendingDown,
} from './icons';
import styles from './index.module.scss';

const getGridClass = (feature: Feature): string => {
  const { span } = feature;
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
        const { icon, title, details } = feature;
        const IconComponent = getIconComponent(icon);

        return (
          <div
            key={title}
            className={`${getGridClass(feature)} rp-rounded hover:rp-var(--rp-c-brand)`}
          >
            <div className="rp-h-full rp-p-2">
              <article
                key={title}
                className={`rspress-home-feature-card ${styles.featureCard} rp-h-full rp-p-8 rp-rounded-4xl rp-border-transparent`}
              >
                {icon ? (
                  <div className="rp-flex rp-items-center rp-justify-center">
                    <div className="rspress-home-feature-icon rp-w-12 rp-h-12 rp-text-3xl rp-text-center">
                      {isIconComponent(IconComponent) ? (
                        <IconComponent />
                      ) : (
                        icon
                      )}
                    </div>
                  </div>
                ) : null}

                <h2 className="rspress-home-feature-title rp-font-bold rp-text-center">
                  {title}
                </h2>
                <p className="rspress-home-feature-detail rp-leading-6 rp-pt-2 rp-text-sm rp-text-text-2 rp-font-medium">
                  {details}
                </p>
              </article>
            </div>
          </div>
        );
      })}
    </div>
  );
}
