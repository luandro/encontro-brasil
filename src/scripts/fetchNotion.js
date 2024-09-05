import { fetchNotionData } from '../lib/fetchNotionData.js';
import { generateCronograma } from '../lib/generateCronograma.js';
import { updateJson } from '../lib/updateJson.js';

async function main() {
  try {
    const data = await fetchNotionData();
    await generateCronograma(data);
    updateJson(data);
  } catch (error) {
    console.error("Error updating files:", error);
  }
}

main();
