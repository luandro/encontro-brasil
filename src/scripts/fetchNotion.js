import { fetchNotionData, fetchNotionPage, fetchNotionBlocks } from '../lib/fetchNotionData.js';
import { generateCronograma } from '../lib/generateCronograma.js';
// import { updateJson } from '../lib/updateJson.js';

async function main() {
  try {
	const tag = 'Website';
    const data = await fetchNotionData(tag);    
    await generateCronograma(data);
    // updateJson(data);
  } catch (error) {
    console.error("Error updating files:", error);
  }
}

main();
