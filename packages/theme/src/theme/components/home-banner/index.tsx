import styles from './index.module.scss';

interface HomeBannerProps {
  text: string;
}

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
export function HomeBanner({ text }: HomeBannerProps) {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.gradient} />
        <div className={styles.pattern} />
      </div>
      <div className={styles.content}>
        <h1 className={styles.heading}>
          Need React or React Native
          <br />
          expertise you can count on?
        </h1>
        <div className={styles.description}>
          <p className={styles.descriptionText}>
            We've spent years building full-stack, cross-platform
            <br />
            apps and solving tough technical challenges.
          </p>
          <div className={styles.actions}>
            <button className={styles.ctaButton} type="button">
              <span className={styles.buttonText}>Let's talk</span>
              <div className={styles.buttonIcon}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Arrow right icon"
                >
                  <title>Arrow right</title>
                  <path
                    d="M3.5 8.5L12.5 8.5M12.5 8.5L8.5 4.5M12.5 8.5L8.5 12.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
