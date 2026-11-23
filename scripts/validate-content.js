import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = fileURLToPath(new URL("../src/content/posts/", import.meta.url));
const errors = [];

for (const file of readdirSync(dir).filter((f) => f.endsWith(".md"))) {
  const text = readFileSync(join(dir, file), "utf8").replace(/\r\n/g, "\n");
  const fm = text.match(/^---\n([\s\S]*?)\n---/)?.[1];
  const fail = (msg) => errors.push(`${file}: ${msg}`);

  if (!/^[a-z0-9]+(-[a-z0-9]+)*\.md$/.test(file)) fail("filename must be lowercase-kebab-case (it becomes the URL)");
  if (!fm) { fail("missing front matter"); continue; }

  const field = (name) => fm.match(new RegExp(`^${name}:\\s*(.*)$`, "m"))?.[1].trim().replace(/^["']|["']$/g, "");
  if (!field("title")) fail("missing title");
  if (!field("description")) fail("missing description");
  const date = field("date");
  if (!date || !/^\d{4}-\d{2}-\d{2}/.test(date) || isNaN(Date.parse(date))) fail("missing or invalid date (use YYYY-MM-DD)");
  const draft = field("draft");
  if (draft && !["true", "false"].includes(draft)) fail("draft must be true or false");
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("Content OK");
