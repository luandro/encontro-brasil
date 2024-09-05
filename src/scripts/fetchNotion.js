import dotenv from 'dotenv';
import { fetchNotionData, fetchNotionPage, fetchNotionBlocks } from '../lib/fetchNotionData.js';
import { generateBlocks } from '../lib/generateBlocks.js';
// import { updateJson } from '../lib/updateJson.js';

// Load environment variables from .env file
dotenv.config();

async function main() {
  // Check if NOTION_API_KEY is defined
  if (!process.env.NOTION_API_KEY) {
    console.error("Error: NOTION_API_KEY is not defined in the environment variables.");
    process.exit(1);
  }
  try {
	const tag = process.env.WEBSITE_TAG;
    const data = await fetchNotionData(tag);    
    await generateBlocks(data);
    // updateJson(data);
  } catch (error) {
    console.error("Error updating files:", error);
  }
}

main();
