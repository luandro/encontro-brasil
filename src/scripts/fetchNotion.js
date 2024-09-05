import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { marked } from "marked";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize the Notion client
if (!process.env.NOTION_API_KEY) {
	throw new Error(
		"NOTION_API_KEY is not defined in the environment variables.",
	);
}

if (!process.env.DATABASE_ID) {
	throw new Error("DATABASE_ID is not defined in the environment variables.");
}

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const n2m = new NotionToMarkdown({ notionClient: notion });

// The ID of the Notion database
const DATABASE_ID = process.env.DATABASE_ID;

// Path to the English json file
const jsonFileName = "translation.en.json";
const EN_JSON_PATH = path.join(__dirname, "../src/assets/i18n", jsonFileName);

// Path to the cronograma.md file
const CRONOGRAMA_PATH = path.join(__dirname, "../../public/conteudo/cronograma.md");

// Function to fetch data from the Notion database
async function fetchNotionData() {
  const response = await notion.databases.query({
    database_id: DATABASE_ID,
  });
  return response.results;
}

// Function to generate cronograma.md
async function generateCronograma(data) {
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

// Function to update en.json
function updateJson(data) {
	const enJson = JSON.parse(fs.readFileSync(EN_JSON_PATH, "utf8"));
	for (const item of data) {
		const parsed = marked.parse(item.parent);
		const htmlToText = (html) => {
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
		};
		const trimmedText = htmlToText(parsed).trim();
		item.parent = trimmedText;
	}
	const orderedData = [
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
		`${jsonFileName.replace(".json", `_${oldTimestamp}.json`)}`,
	);
	fs.renameSync(EN_JSON_PATH, oldFileName);

	fs.writeFileSync(EN_JSON_PATH, JSON.stringify(enJson, null, 2), "utf8");
}
console.log("en.json has been updated successfully.");

// Main function
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
