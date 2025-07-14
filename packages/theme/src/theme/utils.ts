// https://github.com/web-infra-dev/rspress/blob/d37f8bae945df7cc5deb5dd5dccac8cc5ca978eb/packages/theme-default/src/logic/utils.tsx#L1-L35

export function renderHtmlOrText(
  str?: string | number | null
):
  | { children: string | null }
  | { dangerouslySetInnerHTML: { __html: string } } {
  if (!str) {
    return { children: null };
  }

  if (typeof str === 'number') {
    return { children: str.toString() };
  }

  const hasValidHtmlElements = /<([a-z]+)([^<]*)(?:>(.*?)<\/\1>|\s*\/>)/i.test(
    str
  );

  if (hasValidHtmlElements) {
    return { dangerouslySetInnerHTML: { __html: str } };
  }

  return {
    children: str
      .replace(/\\</g, '<')
      .replace(/\\>/g, '>')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>'),
  };
}
