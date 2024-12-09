import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { RspressPlugin } from '@rspress/shared'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export function pluginCallstackTheme(): RspressPlugin {
  return {
    name: 'plugin-callstack-theme',
    globalStyles: path.join(dirname, 'styles.css'),
  }
}