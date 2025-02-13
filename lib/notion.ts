// lib/notion.ts
import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const notionClient = new NotionAPI({
  authToken: process.env.NOTION_API_KEY,
});

export async function getPublishedPosts() {
  const { results } = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      and: [
        {
          property: 'Status',
          status: { equals: 'Published' },
        },
        {
          property: 'Publish Date',
          date: { on_or_before: new Date().toISOString() },
        },
      ],
    },
    sorts: [{ property: 'Publish Date', direction: 'descending' }],
  });

  return results.map((page) => {
    const properties = (page as any).properties as any;
    return {
      id: page.id,
      title: properties.Title?.title?.[0]?.plain_text || '',
      slug: properties.Slug?.rich_text?.[0]?.plain_text || '',
      publishDate: properties['Publish Date']?.date?.start || '',
      description: properties.Description?.rich_text?.[0]?.plain_text || '',
      coverImage: properties.Cover?.rich_text?.[0]?.plain_text || '',
    };
  });
}

export async function debugDatabaseSchema() {
  const database = await notion.databases.retrieve({
    database_id: process.env.NOTION_DATABASE_ID!,
  });
  console.log(JSON.stringify(database.properties, null, 2));
}
