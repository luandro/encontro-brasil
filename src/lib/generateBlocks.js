import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from 'url';
import { n2m } from './notionClient.js';
import axios from 'axios';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_PATH = path.join(__dirname, "../../public/content/");
const IMAGES_PATH = path.join(CONTENT_PATH, "images/");

// Ensure directories exist
fs.mkdirSync(CONTENT_PATH, { recursive: true });
fs.mkdirSync(IMAGES_PATH, { recursive: true });

async function downloadImage(url, blockName, index) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');
    const extension = path.extname(url).toLowerCase() || '.jpg'; // Default to .jpg if no extension
    const filename = `${blockName}_${index}${extension}`;
    const filepath = path.join(IMAGES_PATH, filename);
    fs.writeFileSync(filepath, buffer);
    console.log(`Image downloaded and saved: ${filepath}`);
    return `/content/images/${filename}`;
  } catch (error) {
    console.error(`Error downloading image from ${url}:`, error);
    return url;
  }
}

export async function generateBlocks(data) {
  const blocks = [];

  for (const page of data) {
    const markdown = await n2m.pageToMarkdown(page.id);
    let markdownString = n2m.toMarkdownString(markdown);
    // console.log("Markdown content:", markdownString);
    
    if (markdownString && markdownString.parent) {
      const websiteBlock = page.properties["Website Block"]?.select?.name;
      if (websiteBlock) {
        // Process images
        const imgRegex = /!\[.*?\]\((.*?)\)/g;
        const imgPromises = [];
        let match;
        let imgIndex = 0;
        while ((match = imgRegex.exec(markdownString.parent)) !== null) {
          const imgUrl = match[1];
          if (!imgUrl.startsWith('http')) continue; // Skip local images
          const fullMatch = match[0];
          imgPromises.push(
            downloadImage(imgUrl, websiteBlock.replace(/\s+/g, ''), imgIndex).then(newPath => {
              const newImageMarkdown = fullMatch.replace(imgUrl, newPath);
              markdownString.parent = markdownString.parent.replace(fullMatch, newImageMarkdown);
            })
          );
          imgIndex++;
        }
        await Promise.all(imgPromises);

        const fileName = `${websiteBlock.replace(/\s+(.)/g, (_, c) => c.toUpperCase())}.md`;
        const filePath = path.join(CONTENT_PATH, fileName);
        fs.writeFileSync(filePath, markdownString.parent, 'utf8');
        console.log(`${fileName} has been generated successfully.`);
        
        blocks.push({
          name: websiteBlock,
          fileName: fileName
        });
      } else {
        console.error("No 'Website Block' property found for page:", page.id);
      }
    } else {
      console.error("Unexpected markdown structure for page:", page.id);
    }
  }

  // Generate JSON file
  const jsonFilePath = path.join(CONTENT_PATH, "notionBlocks.json");
  fs.writeFileSync(jsonFilePath, JSON.stringify(blocks, null, 2), 'utf8');
  console.log("notionBlocks.json has been generated successfully.");
}
