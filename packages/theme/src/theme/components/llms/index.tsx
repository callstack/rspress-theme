import * as React from 'react';
import IconArrowDown from '../../../assets/arrow-down.svg?react';
import IconCopy from '../../assets/copy.svg?react';
import IconLink from '../../assets/link.svg?react';
import IconUpload from '../../assets/upload.svg?react';
import styles from './index.module.scss';

interface LlmsContainerProps {
  children?: React.ReactNode;
}

export function LlmsContainer({ children }: LlmsContainerProps) {
  return <div className={styles.container}>{children}</div>;
}

interface LlmsCopyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  getMarkdown?: () => Promise<string>;
}

export function LlmsCopyButton({
  getMarkdown,
  children,
  ...props
}: LlmsCopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      let markdown = '';

      if (getMarkdown) {
        markdown = await getMarkdown();
      } else {
        // Fallback: try to get markdown from the page's .md route
        const currentPath = window.location.pathname;
        const mdPath = currentPath.endsWith('/')
          ? `${currentPath.slice(0, -1)}.md`
          : `${currentPath}.md`;

        const response = await fetch(mdPath);
        if (response.ok) {
          markdown = await response.text();
        }
      }

      if (markdown) {
        await navigator.clipboard.writeText(markdown);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error('Failed to copy markdown:', error);
    }
  };

  return (
    <button
      type="button"
      className={`${styles.button} ${styles.copyButton}`}
      onClick={handleCopy}
      aria-label={copied ? 'Copied!' : 'Copy Markdown'}
      {...props}
    >
      <IconCopy aria-hidden="true" />
      {children || (copied ? 'Copied!' : 'Copy Markdown')}
    </button>
  );
}

type ViewOption =
  | {
      title: string;
      icon?: React.ReactNode;
      onClick?: () => void;
    }
  | {
      title: string;
      href: string;
      icon?: React.ReactNode;
    }
  | 'markdownLink'
  | 'chatgpt'
  | 'claude';

interface LlmsViewOptionsProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  options?: ViewOption[];
}

const defaultOptions: ViewOption[] = ['markdownLink', 'chatgpt', 'claude'];

export function LlmsViewOptions({
  options = defaultOptions,
  ...props
}: LlmsViewOptionsProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getMarkdownUrl = () => {
    const currentPath = window.location.pathname;
    const origin = window.location.origin;
    const mdPath = currentPath.endsWith('/')
      ? `${currentPath.slice(0, -1)}.md`
      : `${currentPath}.md`;
    return `${origin}${mdPath}`;
  };

  const resolveOption = (option: ViewOption) => {
    if (option === 'markdownLink') {
      return {
        title: 'Copy Markdown Link',
        icon: <IconLink aria-hidden="true" />,
        onClick: async () => {
          const url = getMarkdownUrl();
          await navigator.clipboard.writeText(url);
          setIsOpen(false);
        },
      };
    }

    if (option === 'chatgpt') {
      return {
        title: 'Open in ChatGPT',
        icon: <IconUpload aria-hidden="true" />,
        href: `https://chat.openai.com/?hints=search&q=${encodeURIComponent(`Read ${getMarkdownUrl()}`)}`,
      };
    }

    if (option === 'claude') {
      return {
        title: 'Open in Claude',
        icon: <IconUpload aria-hidden="true" />,
        href: `https://claude.ai/new?q=${encodeURIComponent(`Read ${getMarkdownUrl()}`)}`,
      };
    }

    return option;
  };

  const resolvedOptions = options.map(resolveOption);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        type="button"
        className={styles.button}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        {...props}
      >
        View Options
        <IconArrowDown aria-hidden="true" />
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu} role="menu">
          {resolvedOptions.map((option) => {
            if ('href' in option && option.href) {
              return (
                <a
                  key={option.title}
                  href={option.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.dropdownItem}
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  {option.icon}
                  {option.title}
                </a>
              );
            }

            return (
              <button
                key={option.title}
                type="button"
                className={styles.dropdownItem}
                role="menuitem"
                onClick={() => {
                  if ('onClick' in option && option.onClick) {
                    option.onClick();
                  }
                  setIsOpen(false);
                }}
              >
                {option.icon}
                {option.title}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
