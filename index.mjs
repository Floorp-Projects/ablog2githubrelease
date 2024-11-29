import HTMLParser from "node-html-parser";
import util from "util";

const args = util.parseArgs({
  options: {
    url: {
      type: "string",
      short: "u",
      multiple: false,
    },
    "exclude-selectors": {
      type: "string",
      short: "e",
      multiple: true,
    },
  },
  args: process.argv.slice(2),
});

if (!args.values.url) {
  throw new Error("URL is must be specified");
}

const result = await fetch(args.values.url);
if (!result.ok) {
  throw new Error(`${result.status} ${result.statusText}`);
}
const html = await result.text();

const dom = HTMLParser.parse(html);
const content = dom.querySelector(".entry-content");
for (const selector of args.values["exclude-selectors"] ?? []) {
  content.querySelectorAll(selector).forEach(e => e.remove());
}

let markdown;
if (content.querySelector(".ys-toc")) {
  markdown = Array.from(content.querySelectorAll(".ys-toc ~ *")).map(e => e.outerHTML).join("\n");
} else {
  markdown = content.outerHTML;
}

console.log(markdown);