#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command !== 'copy-assets') {
    console.log('This utility only supports the "copy-assets" command.');
    console.log('Usage: npx @callstack/rspress-theme copy-assets <projectDir>');
    process.exit(1);
  }

  if (args.length < 2) {
    console.log('Usage: npx @callstack/rspress-theme copy-assets <projectDir>');
    process.exit(1);
  }

  const projectDir = args[1];
  const packageRoot = path.resolve(__dirname, '..');
  const srcDir = path.join(packageRoot, 'dist/assets');
  const destDir = path.resolve(projectDir, 'theme/assets');

  if (!fs.existsSync(srcDir)) {
    console.error(`Source directory does not exist: ${srcDir}`);
    process.exit(1);
  }

  fs.cpSync(srcDir, destDir, { recursive: true });
  console.log(`Assets copied to ${destDir}`);
}

main();
