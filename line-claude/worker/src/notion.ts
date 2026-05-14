import type { Env } from "./env";

// Save a structured voice note to a Notion database.
// Expects the target DB to have these properties:
//   - Name (title)
//   - Kind (select)        e.g. todo / note / event / idea
//   - Due (date)            optional
//   - Tags (multi_select)
//   - Summary (rich_text)
// If your schema differs, edit the body below.

type VoiceNote = {
  title: string;
  kind: string;
  dueAt: string | null;
  tags: string[];
  summary: string;
  items: string[];
};

export async function saveNote(env: Env, note: VoiceNote, transcript: string): Promise<string> {
  if (!env.NOTION_TOKEN || !env.NOTION_DATABASE_ID) {
    throw new Error("notion not configured");
  }

  const body = {
    parent: { database_id: env.NOTION_DATABASE_ID },
    properties: {
      Name: { title: [{ text: { content: note.title } }] },
      Kind: { select: { name: note.kind } },
      ...(note.dueAt ? { Due: { date: { start: note.dueAt } } } : {}),
      Tags: { multi_select: note.tags.map((t) => ({ name: t })) },
      Summary: { rich_text: [{ text: { content: note.summary.slice(0, 1900) } }] },
    },
    children: [
      {
        object: "block",
        type: "heading_2",
        heading_2: { rich_text: [{ text: { content: "重點" } }] },
      },
      ...note.items.map((item) => ({
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: { rich_text: [{ text: { content: item } }] },
      })),
      {
        object: "block",
        type: "heading_2",
        heading_2: { rich_text: [{ text: { content: "逐字稿" } }] },
      },
      {
        object: "block",
        type: "paragraph",
        paragraph: { rich_text: [{ text: { content: transcript.slice(0, 1900) } }] },
      },
    ],
  };

  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.NOTION_TOKEN}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`notion ${res.status}: ${await res.text()}`);
  }
  const j = (await res.json()) as { url: string };
  return j.url;
}
