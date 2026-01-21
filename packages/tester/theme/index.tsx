import {
  Announcement,
  LlmsContainer,
  LlmsCopyButton,
  LlmsViewOptions,
  VersionBadge,
} from '@callstack/rspress-theme';
import {
  Layout as RspressLayout,
  getCustomMDXComponent as basicGetCustomMDXComponent,
} from '@rspress/core/theme-original';

const Layout = () => {
  return (
    <RspressLayout
      beforeNav={
        <Announcement
          href="./guide"
          message="Announcement Test"
          localStorageKey="announcement-test"
        />
      }
      beforeDocContent={<VersionBadge version="v5" />}
    />
  );
};

function getCustomMDXComponent() {
  const { h1: H1, ...mdxComponents } = basicGetCustomMDXComponent();

  const CustomH1 = (props: React.ComponentProps<typeof H1>) => {
    return (
      <>
        <H1 {...props} />
        <LlmsContainer>
          <LlmsCopyButton />
          <LlmsViewOptions />
        </LlmsContainer>
      </>
    );
  };

  return {
    ...mdxComponents,
    h1: CustomH1,
  };
}

export { getCustomMDXComponent, Layout };

export * from '@rspress/core/theme-original';
