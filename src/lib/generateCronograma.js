import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from 'url';
import { n2m } from './notionClient.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CRONOGRAMA_PATH = path.join(__dirname, "../../public/conteudo/cronograma.md");

export async function generateCronograma(data) {
  let content = "# Cronograma do Evento\n\n";
  
  for (const page of data) {
    const title = page.properties.Name.title[0]?.plain_text;
    const markdown = await n2m.pageToMarkdown(page.id);
    const markdownString = n2m.toMarkdownString(markdown);
    
    content += `## ${title}\n${markdownString}\n\n`;
  }
  
  fs.writeFileSync(CRONOGRAMA_PATH, content, 'utf8');
  console.log("cronograma.md has been generated successfully.");
}
