// src/data/owasp.ts
//
// OWASP Top 10:2025 lookup table.
//
// 2025 brought significant changes to both the order and the categories:
//
//   - A02 was Cryptographic Failures, now Security Misconfiguration (moved up from A05)
//   - A03 was Injection, now Software Supply Chain Failures (NEW slot)
//   - A05 was Security Misconfiguration, now Injection (moved DOWN from A03)
//   - A06 was Vulnerable and Outdated Components, now Insecure Design
//   - A10 was SSRF, now Mishandling of Exceptional Conditions
//     (SSRF was REMOVED from the Top 10 - it's no longer a distinct
//      category. Pages on SSRF should leave the owasp: field empty, or
//      could reference OWASP API Security Top 10 separately.)
//
// Source: https://owasp.org/Top10/2025/
//
// Pages can include an `owasp:` frontmatter field with OWASP category IDs:
//
//   ---
//   owasp: [A05]                  # → A05:2025 - Injection
//   ---
//   owasp: [A01, A05]              # multiple
//
// Component (OwaspTag.astro) looks up the canonical name and URL from this
// table and renders a badge.

export interface OwaspCategory {
  /** Short ID, e.g. "A01" */
  id: string;
  /** Full ID with year, e.g. "A01:2025" */
  fullId: string;
  /** Canonical category name from OWASP, e.g. "Broken Access Control" */
  name: string;
  /** Official OWASP page URL */
  url: string;
}

export const OWASP_2025: Record<string, OwaspCategory> = {
  A01: {
    id: 'A01',
    fullId: 'A01:2025',
    name: 'Broken Access Control',
    url: 'https://owasp.org/Top10/2025/A01_2025-Broken_Access_Control/',
  },
  A02: {
    id: 'A02',
    fullId: 'A02:2025',
    name: 'Security Misconfiguration',
    url: 'https://owasp.org/Top10/2025/A02_2025-Security_Misconfiguration/',
  },
  A03: {
    id: 'A03',
    fullId: 'A03:2025',
    name: 'Software Supply Chain Failures',
    url: 'https://owasp.org/Top10/2025/A03_2025-Software_Supply_Chain_Failures/',
  },
  A04: {
    id: 'A04',
    fullId: 'A04:2025',
    name: 'Cryptographic Failures',
    url: 'https://owasp.org/Top10/2025/A04_2025-Cryptographic_Failures/',
  },
  A05: {
    id: 'A05',
    fullId: 'A05:2025',
    name: 'Injection',
    url: 'https://owasp.org/Top10/2025/A05_2025-Injection/',
  },
  A06: {
    id: 'A06',
    fullId: 'A06:2025',
    name: 'Insecure Design',
    url: 'https://owasp.org/Top10/2025/A06_2025-Insecure_Design/',
  },
  A07: {
    id: 'A07',
    fullId: 'A07:2025',
    name: 'Authentication Failures',
    url: 'https://owasp.org/Top10/2025/A07_2025-Authentication_Failures/',
  },
  A08: {
    id: 'A08',
    fullId: 'A08:2025',
    name: 'Software or Data Integrity Failures',
    url: 'https://owasp.org/Top10/2025/A08_2025-Software_or_Data_Integrity_Failures/',
  },
  A09: {
    id: 'A09',
    fullId: 'A09:2025',
    name: 'Security Logging and Alerting Failures',
    url: 'https://owasp.org/Top10/2025/A09_2025-Security_Logging_and_Alerting_Failures/',
  },
  A10: {
    id: 'A10',
    fullId: 'A10:2025',
    name: 'Mishandling of Exceptional Conditions',
    url: 'https://owasp.org/Top10/2025/A10_2025-Mishandling_of_Exceptional_Conditions/',
  },
};

// Kept as backward-compatible export name (was OWASP_2021).
// Code referring to OWASP_2021 still works.
export const OWASP_2021 = OWASP_2025;

/** Get the full display id (e.g. "A05:2025") for a short id ("A05"). */
export function owaspFullId(id: string): string {
  return OWASP_2025[id]?.fullId ?? id;
}

/** Get the canonical category name for a short id. */
export function owaspName(id: string): string | null {
  return OWASP_2025[id]?.name ?? null;
}

/** Get the official URL for a short id. */
export function owaspUrl(id: string): string {
  return OWASP_2025[id]?.url ?? 'https://owasp.org/Top10/2025/';
}
