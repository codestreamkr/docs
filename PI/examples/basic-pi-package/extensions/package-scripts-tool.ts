import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Type } from "typebox";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export default function (pi: ExtensionAPI) {
  pi.registerTool({
    name: "package_scripts",
    label: "Package Scripts",
    description: "package.json의 scripts 목록을 조회한다.",
    promptSnippet: "package.json scripts 목록 조회",
    parameters: Type.Object({}),
    async execute(_toolCallId, _params, _signal, _onUpdate, ctx) {
      const packageJson = join(ctx.cwd, "package.json");

      if (!existsSync(packageJson)) {
        return {
          content: [{ type: "text", text: "package.json이 없습니다." }],
          details: {},
        };
      }

      const pkg = JSON.parse(readFileSync(packageJson, "utf8"));
      const scripts = pkg.scripts ?? {};

      return {
        content: [{ type: "text", text: JSON.stringify(scripts, null, 2) }],
        details: { scripts },
      };
    },
  });
}
