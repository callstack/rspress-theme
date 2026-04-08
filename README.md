# Callstack Rspress Theme

See the appropriate README file for integration instructions:
- *(recommended)* for a mostly automated setup with sensible defaults, use the [Callstack Rspress preset](./packages/preset/README.md), which has an escape hatch to configure the low-level theme
- for a manual, low-level integration, use the [Callstack Rspress theme](./packages/theme/README.md)

## Deployment and PR Previews

This repository includes GitHub Actions workflows for deploying your documentation site and automatically creating previews for pull requests.

### Setup

To enable deployments and PR previews in your repository, copy the following files to your repository:

1. `.github/actions/build-docs/action.yml` - Reusable action for building documentation
2. `.github/workflows/deploy.yml` - Workflow for deploying the main site
3. `.github/workflows/pr-preview.yml` - Workflow for deploying PR previews

It should work out of the box. 
In rare cases, you may need to customize them to match your project structure (e.g., adjust paths, package names, or build directories).

### GitHub Pages Configuration

Before deployments will work, you need to configure your repository's GitHub Pages settings:

1. **Deploy Pages from branch**
   - Go to your repository's **Settings** > **Pages**
   - Under "Source", select **Deploy from branch**
   - Choose the branch you want to deploy from (typically `gh-pages`)
   - Select the root directory (`/`)

   > **Important:** Do not select "GitHub Actions" as the source - this option has a misleading name and does not work with PR previews.

2. **Grant workflow permissions**
   - Go to **Settings** > **Actions** > **General**
   - Scroll to **Workflow permissions**
   - Select **Read and write permissions**
   - This allows the workflow to make changes to your deployment branch

### Important: Image Syntax in Markdown Files

When using images in your markdown files (especially in frontmatter for icons), you need to use the correct syntax for PR previews to work properly.

**❌ Incorrect:**
```markdown
icon: <img src="/layout-columns.svg" />
```

**✅ Correct:**
```markdown
icon: /layout-columns.svg
```

The action expects image paths as strings, not HTML img tags. This ensures images resolve correctly in both local development and PR preview deployments.

### Additional Resources

For more information about PR previews, including advanced configuration options, see the [official PR preview action documentation](https://github.com/rossjrw/pr-preview-action).

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.