import path from "node:path";
import { fileURLToPath } from "node:url";
import { RspressPlugin } from "@rspress/shared";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export function themePlugin(): RspressPlugin {
  return {
    name: "callstack-rspress-theme",
    globalStyles: path.join(dirname, "..", "styles", "theme.css"),
  };
}
