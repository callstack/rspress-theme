declare module '*.module.css';
declare module '*.module.scss';

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.svg?react' {
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module '*.png' {
  const content: string;
  export default content;
}

// rspress aliases
declare module '@theme';
declare module '@runtime';
declare module '@shared';
