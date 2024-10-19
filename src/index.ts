import path from "node:path";
import { RspressPlugin } from "@rspress/shared";

export function themePlugin(): RspressPlugin {
  return {
    name: "callstack-rspress-theme",
    globalStyles: path.join(__dirname, "..", "styles", "theme.css"),
  };
}
