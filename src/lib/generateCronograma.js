import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from 'url';
import { n2m } from './notionClient.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_PATH = path.join(__dirname, "../../public/conteudo/");

export async function generateCronograma(data) {
  for (const page of data) {
    const markdown = await n2m.pageToMarkdown(page.id);
    const markdownString = n2m.toMarkdownString(markdown);
    console.log("Markdown content:", markdownString);
    
    if (markdownString && markdownString.parent) {
      const websiteBlock = page.properties["Website Block"]?.select?.name;
      if (websiteBlock) {
        const fileName = `${websiteBlock.replace(/\s+(.)/g, (_, c) => c.toUpperCase())}.md`;
        const filePath = path.join(CONTENT_PATH, fileName);
        fs.writeFileSync(filePath, markdownString.parent, 'utf8');
        console.log(`${fileName} has been generated successfully.`);
      } else {
        console.error("No 'Website Block' property found for page:", page.id);
      }
    } else {
      console.error("Unexpected markdown structure for page:", page.id);
    }
  }
}
