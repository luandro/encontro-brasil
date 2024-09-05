import { notion, DATABASE_ID } from './notionClient.js';

export async function fetchNotionData() {
  const response = await notion.databases.query({
    database_id: DATABASE_ID,
  });
  return response.results;
}
