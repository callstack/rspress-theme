import * as path from 'node:path';
import { withCallstackPreset } from '@callstack/rspress-preset';

export default withCallstackPreset(
  {
    context: path.join(__dirname),
    docs: {
      title: 'My Site',
      description: 'My Site Description',
      editUrl: 'https://github.com/callstack/rspress-theme',
      rootDir: 'docs',
      rootUrl: 'https://callstack.com',
      socials: {
        github: 'https://github.com/callstack/rspress-theme',
        X: 'https://github.com/callstack/rspress-theme',
        discord: 'https://github.com/callstack/rspress-theme',
      },
    },
    theme: {
      content: {
        homeBannerButtonText: 'Home Banner Button Text',
        homeBannerDescription: 'Home Banner Description',
        homeBannerHeadline: 'Home Banner Headline',
        outlineCTAButtonText: 'Outline CTA Button Text',
        outlineCTADescription: 'Outline CTA Description',
        outlineCTAHeadline: 'Outline CTA Headline',
      },
      links: {
        homeBanner: 'https://callstack.com?source=banner',
        homeFooter: 'https://callstack.com?source=footer',
        outlineCTA: 'https://callstack.com?source=outline-cta',
      },
    },
  },
  {
    builderConfig: {
      performance: {
        buildCache: false,
      },
    },
  }
);
