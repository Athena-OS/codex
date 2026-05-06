// src/pages/[...slug].md.ts
//
// Serves raw Markdown source of any docs page at <page-url>.md
//
// URL mapping:
//   /codex/web/sqli/                       (rendered HTML page from index.mdx)
//     ↔ /codex/web/sqli.md                 (this endpoint serves the markdown)
//
//   /codex/web/sqli/detection/             (rendered HTML page from detection.mdx)
//     ↔ /codex/web/sqli/detection.md       (this endpoint serves the markdown)
//
// The slug computation strips both `.mdx` and a trailing `/index` so that
// folder index pages get the correct path (without `/index` in the URL).
//
// This endpoint:
//   - Powers the "View as Markdown" link in the AI menu (opens in new tab)
//   - Powers the "Copy page" action (fetched via JS, copied to clipboard)
//   - Allows AI agents to fetch page content without HTML scraping

import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * Convert an entry id to its corresponding slug for the .md route.
 *
 * Examples:
 *   "codex/web/sqli/index"          → "codex/web/sqli"
 *   "codex/web/sqli/detection"      → "codex/web/sqli/detection"
 *   "codex/web/server-side/index"   → "codex/web/server-side"
 *   "codex/web/server-side/ssrf/index" → "codex/web/server-side/ssrf"
 */
function entryIdToSlug(id: string): string {
  // Astro 4+ already strips .mdx from entry.id, but defensive in case it
  // doesn't on some setups.
  let slug = id.replace(/\.mdx?$/, '');
  // Strip trailing /index - the URL for an index.mdx is its parent path.
  slug = slug.replace(/\/index$/, '');
  return slug;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const docs = await getCollection('docs');
  return docs.map((entry: CollectionEntry<'docs'>) => ({
    params: { slug: entryIdToSlug(entry.id) },
    props: { entry },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const entry = props.entry as CollectionEntry<'docs'>;

  // Build a small header so consumers know what they're looking at
  const title = entry.data.title || entry.id;
  const description = entry.data.description || '';

  const header = [
    `# ${title}`,
    description ? `\n> ${description}` : '',
    `\n<!-- Source: ${entry.id} -->`,
    `<!-- Codex offensive-security reference - codex.athenaos.org -->\n\n`,
  ].join('\n');

  // Get the raw body (frontmatter is automatically stripped by Astro)
  const body = entry.body || '';

  // Return as plain text - content type is critical for AI tools that fetch
  // this URL; HTML would defeat the purpose.
  return new Response(header + body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
