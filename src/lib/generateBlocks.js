import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from 'node:url';
import { n2m } from './notionClient.js';
import axios from 'axios';
import chalk from 'chalk';
import ora from 'ora';
import { processImage } from './imageProcessor.js';
import { compressImage } from './imageCompressor.js';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_PATH = path.join(__dirname, "../../public/content/");
const IMAGES_PATH = path.join(CONTENT_PATH, "images/");

// Ensure directories exist
fs.mkdirSync(CONTENT_PATH, { recursive: true });
fs.mkdirSync(IMAGES_PATH, { recursive: true });

console.log('Content directory:', CONTENT_PATH);
console.log('Images directory:', IMAGES_PATH);

const baseUrl = process.env.BASE_URL || '/';

async function downloadAndProcessImage(url, blockName, index) {
  const spinner = ora(`Processing image ${index + 1}`).start();
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');
    
    // Remove query parameters from the URL
    const cleanUrl = url.split('?')[0];
    
    // Get the file extension, defaulting to .jpg if not present
    const extension = path.extname(cleanUrl).toLowerCase() || '.jpg';
    
    // Create a short, sanitized filename
    const sanitizedBlockName = blockName.replace(/[^a-z0-9]/gi, '').toLowerCase().slice(0, 20);
    const filename = `${sanitizedBlockName}_${index}${extension}`;
    
    const filepath = path.join(IMAGES_PATH, filename);

    spinner.text = `Processing image ${index + 1}: Resizing`;
    const { outputBuffer: resizedBuffer, originalSize, processedSize } = await processImage(buffer, filepath);

    spinner.text = `Processing image ${index + 1}: Compressing`;
    const { compressedBuffer, compressedSize } = await compressImage(resizedBuffer, filepath);

    // Save the processed and compressed image
    fs.writeFileSync(filepath, compressedBuffer);
    spinner.succeed(chalk.green(`Image ${index + 1} processed and saved: ${filepath}`));
    
    const savedBytes = originalSize - compressedSize;
    const imagePath = `${baseUrl}content/images/${filename}`.replace('//', '/');
    return { newPath: imagePath, savedBytes };
  } catch (error) {
    spinner.fail(chalk.red(`Error processing image ${index + 1} from ${url}`));
    console.error(error);
    return { newPath: url, savedBytes: 0 };
  }
}

export async function generateBlocks(data, progressCallback) {
  const blocks = [];
  const totalPages = data.length;
  let totalSaved = 0;

  for (let i = 0; i < totalPages; i++) {
    const page = data[i];
    const pageSpinner = ora(`Processing page ${i + 1}/${totalPages}`).start();

    try {
      const markdown = await n2m.pageToMarkdown(page.id);
      const markdownString = n2m.toMarkdownString(markdown);
      
      if (markdownString?.parent) {
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
              downloadAndProcessImage(imgUrl, websiteBlock, imgIndex).then(({ newPath, savedBytes }) => {
                const newImageMarkdown = fullMatch.replace(imgUrl, newPath);
                markdownString.parent = markdownString.parent.replace(fullMatch, newImageMarkdown);
                totalSaved += savedBytes;
              })
            );
            imgIndex++;
          }
          await Promise.all(imgPromises);

          const fileName = `${websiteBlock.replace(/\s+(.)/g, (_, c) => c.toUpperCase())}.md`;
          const filePath = path.join(CONTENT_PATH, fileName);
          fs.writeFileSync(filePath, markdownString.parent, 'utf8');
          
          blocks.push({
            name: websiteBlock,
            fileName: fileName
          });

          pageSpinner.succeed(chalk.green(`Page ${i + 1}/${totalPages} processed: ${fileName}`));
        } else {
          pageSpinner.fail(chalk.yellow(`No 'Website Block' property found for page ${i + 1}/${totalPages}: ${page.id}`));
        }
      } else {
        pageSpinner.fail(chalk.yellow(`Unexpected markdown structure for page ${i + 1}/${totalPages}: ${page.id}`));
      }
    } catch (error) {
      pageSpinner.fail(chalk.red(`Error processing page ${i + 1}/${totalPages}: ${page.id}`));
      console.error(error);
    }

    progressCallback({ current: i + 1, total: totalPages });
  }

  // Generate JSON file
  const jsonFilePath = path.join(CONTENT_PATH, "notionBlocks.json");
  fs.writeFileSync(jsonFilePath, JSON.stringify(blocks, null, 2), 'utf8');
  console.log(chalk.green(`\nnotionBlocks.json has been generated successfully at ${jsonFilePath}`));

  return { totalSaved };
}
