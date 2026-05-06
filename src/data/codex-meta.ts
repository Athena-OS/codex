// src/data/codex-meta.ts
//
// Site-wide metadata referenced by the AI menu URL builders.
// Edit baseUrl to match your deployment.

export const CODEX_META = {
  /** Base URL of the deployed Codex (no trailing slash) */
  baseUrl: 'https://codex.athenaos.org',

  /**
   * Question template prepended to the page URL when "Open in Claude/ChatGPT".
   * Keep it generic - operators may have wildly different things to ask.
   */
  aiQueryTemplate: (pageUrl: string): string =>
    `Read ${pageUrl} and answer questions about the content.`,
};
