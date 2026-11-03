// src/content.config.ts
//
// Extends Starlight's default content collection schema with custom Codex
// frontmatter fields used by the page header pills and footer.

import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { z } from 'astro:content';
import { MITRE_TECHNIQUES } from './data/mitre';
import { OWASP_2025 } from './data/owasp';
import { IMPACT } from './data/impact';
import { D3FEND } from './data/d3fend';

/**
 * A list of tag IDs that must exist in the given registry. Unknown IDs fail
 * the build with a message naming the registry file to update, so typos and
 * invented IDs can't slip through as generic fallback badges.
 */
const registryTags = (registry: Record<string, unknown>, file: string) =>
  z
    .array(z.string())
    .superRefine((ids, ctx) => {
      for (const id of ids) {
        if (!(id in registry)) {
          ctx.addIssue({
            code: 'custom',
            message: `Unknown ID "${id}". Add it to ${file} or fix the typo.`,
          });
        }
      }
    })
    .optional();

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        /**
         * MITRE ATT&CK technique IDs. Rendered as accent-colored badges at
         * the top of the page.
         * Example: mitre: [T1190, T1199]
         * IDs should match entries in src/data/mitre.ts.
         */
        mitre: registryTags(MITRE_TECHNIQUES, 'src/data/mitre.ts'),

        /**
         * OWASP Top 10:2025 category IDs (short form, no year suffix).
         * Rendered as badges at the top of the page where applicable.
         * Example: owasp: [A05]   // Injection (A03 in the 2021 edition)
         * IDs should match entries in src/data/owasp.ts (A01–A10).
         */
        owasp: registryTags(OWASP_2025, 'src/data/owasp.ts'),

        /**
         * CVE references for techniques tied to specific vulnerabilities.
         * Rendered as badges linking to NIST NVD. Free-form - no lookup.
         * Example: cve: [CVE-2020-1938]
         */
        cve: z.array(z.string()).optional(),

        /**
         * Impact labels - what the technique achieves. Rendered as
         * descriptive (non-link) pills at the top of the page.
         * Example: impact: [RCE, AuthBypass, DataExfil]
         * IDs should match entries in src/data/impact.ts.
         */
        impact: registryTags(IMPACT, 'src/data/impact.ts'),

        /**
         * MITRE D3FEND defensive countermeasure IDs. Rendered as muted
         * pills in the PAGE FOOTER (not header) - keeps offensive content
         * up top and defensive content below.
         * Example: d3fend: [D3-MH, D3-NTA]
         * IDs should match entries in src/data/d3fend.ts.
         */
        d3fend: registryTags(D3FEND, 'src/data/d3fend.ts'),

        /**
         * Operator noise budget - single-glance signal for how visible
         * this technique is to defenders. Rendered as a colored badge in
         * the page header, FIRST in the tag row (it's the operational
         * gate that decides whether the rest of the page is usable).
         *
         * Levels:
         *   - 'stealth'  : a single probe blends into normal traffic
         *   - 'moderate' : visible in logs, may trip pattern detection
         *   - 'loud'     : will trigger most SIEM/IDS rules
         *
         * Optional. Omit on conceptual/methodology pages where there's
         * no single noise level (the page covers multiple techniques
         * with different profiles).
         */
        noise: z.enum(['stealth', 'moderate', 'loud']).optional(),
      }),
    }),
  }),
};
