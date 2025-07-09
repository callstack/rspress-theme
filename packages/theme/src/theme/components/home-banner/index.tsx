import styles from './index.module.scss';

interface HomeBannerProps {
  text: string;
}

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
export function HomeBanner({ text }: HomeBannerProps) {
  return (
    <div className={styles.container}>
      <span className={styles.text}>HomeBanner</span>
    </div>
  );
}
