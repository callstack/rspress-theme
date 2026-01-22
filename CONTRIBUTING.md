# Contributing to Callstack Rspress Theme

## Development Process

All work on Callstack Rspress Theme happens directly on GitHub. Contributors send pull requests which go through review process.

> **Working on your first pull request?** You can learn how from this _free_ series: [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github).

1. Fork the repo and create your branch from `main` (a guide on [how to fork a repository](https://help.github.com/articles/fork-a-repo/)).
1. Run `pnpm install` to install all required dependencies.

### Setup

This project uses a monorepo structure with pnpm workspaces:

- `packages/theme/` - Main theme package
- `packages/tester/` - Test site for development and testing

### Local Development

1. Start the development server for the `theme` package:

   ```bash
   pnpm --filter ./packages/theme dev
   ```

1. Start the development server for the `tester` app:

   ```bash
   pnpm --filter ./packages/tester dev
   ```

1. Open the tester app in your browser at `http://localhost:3000`

1. Make changes to the theme components in `packages/theme/src/`

1. Changes should be automatically reflected in the tester app

## Linting & typechecking

Currently we use TypeScript for typechecking, [Biome](https://biomejs.dev/) for linting and formatting the code.

- `pnpm lint`: run Biome for linting and formatting
- `pnpm typecheck`: run TypeScript type checking

## Commit message convention

We prefix our commit messages with one of the following to signify the kind of change:

- **chore**: Changes which don't affect the published packages or are not related to documentation or tests
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **test**: Adding missing tests or correcting existing tests

**Note:** Commit messages are automatically validated using [commitlint](https://commitlint.js.org/). If your commit message doesn't follow the convention, the commit will be rejected. The format should be: `<type>: <description>` (e.g., `feat: add new theme component`).

## Sending a pull request

When you're sending a pull request:

- Prefer small pull requests focused on one change.
- Verify that TypeScript, Biome and all tests are passing.
- Preview the documentation to make sure it looks good.
- Follow the pull request template when opening a pull request.

## Publishing workflow

This part is for maintainers only, documenting steps to manually publish the packages with Changesets.

### Stable version

1. Pull latest changes for the stable branch.
1. Run `pnpm build` to build the packages.
1. Run `pnpm changeset add` to add an empty changeset.
1. Run `pnpm changeset version` to update versions.
1. Run `pnpm lint` to fix the formatting.
1. Commit the changes with `git commit -m "chore: changeset version"`.
1. Run `pnpm changeset publish` to publish to npm.
1. Generate release notes in the project's `Release` tab on GitHub.

## Reporting issues

You can report issues on our [bug tracker](https://github.com/callstack/rspress-theme/issues). Please follow the issue template when opening an issue.

## License

By contributing to Callstack Rspress Theme, you agree that your contributions will be licensed under its **MIT** license.
