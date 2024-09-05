import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from 'url';
import { marked } from "marked";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonFileName = "translation.en.json";
const EN_JSON_PATH = path.join(__dirname, "../../src/assets/i18n", jsonFileName);

function htmlToText(html) {
  return html
    .replace(/<[^>]*>?/gm, "")
    .replace(/&[#A-Za-z0-9]+;/g, (entity) => {
      const entities = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'",
        "&apos;": "'",
      };
      return entities[entity] || entity;
    });
}

export function updateJson(data) {
  const enJson = JSON.parse(fs.readFileSync(EN_JSON_PATH, "utf8"));
  
  for (const item of data) {
    const parsed = marked.parse(item.parent);
    const trimmedText = htmlToText(parsed).trim();
    item.parent = trimmedText;
  }

  const orderedData = [
    // Add your ordered data here
  ];

  for (const item of orderedData) {
    enJson[item.key] = item.value;
  }

  const timestamp = new Date().toISOString();
  enJson.lastUpdated = timestamp;
  
  const currentEnJson = JSON.parse(fs.readFileSync(EN_JSON_PATH, "utf8"));
  const oldTimestamp = currentEnJson.lastUpdated;
  const oldFileName = EN_JSON_PATH.replace(
    jsonFileName,
    `${jsonFileName.replace(".json", `_${oldTimestamp}.json`)}`
  );
  fs.renameSync(EN_JSON_PATH, oldFileName);

  fs.writeFileSync(EN_JSON_PATH, JSON.stringify(enJson, null, 2), "utf8");
  console.log("en.json has been updated successfully.");
}
