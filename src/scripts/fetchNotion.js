const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");
const marked = require("marked");
const fs = require("node:fs");
const path = require("node:path");

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

// Function to fetch data from the Notion database

// Function to update en.json
function updateEnJson(data) {
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
		const data = await n2m.pageToMarkdown(DATABASE_ID);
		updateEnJson(data);
	} catch (error) {
		console.error("Error updating en.json:", error);
	}
}

main();
