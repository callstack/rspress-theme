import { Announcement, VersionBadge } from '@callstack/rspress-theme';
import { Layout as RspressLayout } from '@rspress/core/theme-original';

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

export { Layout };

export * from '@rspress/core/theme-original';
