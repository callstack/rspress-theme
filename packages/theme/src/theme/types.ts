export interface Hero {
  name: string;
  text: string;
  tagline: string;
  image?: {
    src: string | { dark: string; light: string };
    alt: string;
    /**
     * `srcset` and `sizes` are attributes of `<img>` tag. Please refer to https://mdn.io/srcset for the usage.
     * When the value is an array, rspress will join array members with commas.
     **/
    sizes?: string | string[];
    srcset?: string | string[];
  };
  actions: {
    text: string;
    link: string;
    theme: 'brand' | 'alt';
  }[];
}

export interface Feature {
  icon: string;
  title: string;
  details: string;
  span?: number;
  link?: string;
}

export type PageType = 'home' | 'doc' | 'custom' | '404' | 'blank';

export interface FrontMatterMeta {
  title?: string;
  description?: string;
  overview?: boolean;
  pageType?: PageType;
  features?: Feature[];
  hero?: Hero;
  sidebar?: boolean;
  outline?: boolean;
  lineNumbers?: boolean;
  overviewHeaders?: number[];
  titleSuffix?: string;
  head?: [string, Record<string, string>][];
  context?: string;
  footer?: boolean;
  [key: string]: unknown;
}
