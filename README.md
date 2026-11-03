# Codex

A command-first field reference for offensive security: pentests, CTFs, and certification prep. Every page is built around technique, command, and success indicator, and is tagged against MITRE ATT&CK, MITRE D3FEND, and the OWASP Top 10.

Live site: <https://codex.athenaos.org> · Maintained by [Athena OS](https://athenaos.org) · Content licensed [CC BY-SA 4.0](LICENSE)

Codex is built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).

## Running locally

```sh
pnpm install
pnpm dev       # dev server at http://localhost:4321
pnpm build     # production build into ./dist (also validates all frontmatter)
pnpm preview   # serve the production build
```

## Layout

```
src/
├── content/docs/codex/   # all reference pages, one .mdx per page
│   ├── network/          # recon/, services/
│   ├── web/              # sqli/, xss/, server-side/, auth/, ...
│   └── windows/          # privesc/
├── data/                 # tag registries: mitre.ts, d3fend.ts, owasp.ts, impact.ts
├── components/           # header pills, homepage, operator console, forge, etc.
└── content.config.ts     # frontmatter schema (validates tags against src/data/)
```

Each directory under `src/content/docs/codex/` is a **cluster**. Its `index.mdx` is the cluster overview, and the other pages are techniques.

## Adding a page

1. Create `src/content/docs/codex/<section>/<cluster>/<page>.mdx`.
2. Fill in the frontmatter (see below). Set `sidebar.order` to place it within the cluster.
3. Follow the page template below.
4. Run `pnpm build`. The build fails if any tag ID is unknown.

A new **cluster** also needs an entry in the `sidebar` array in `astro.config.mjs` and in `SECTIONS` at the top of `src/components/Home.astro`. Homepage page counts are computed automatically.

### Frontmatter

```yaml
---
title: SQLi Detection
description: Identifying SQL injection points and fingerprinting the underlying DBMS.
mitre: [T1190]                 # ATT&CK technique IDs
d3fend: [D3-MA, D3-NTA]        # D3FEND countermeasures (shown in the page footer)
impact: [DataExfil]            # what the technique achieves
owasp: [A05]                   # OWASP Top 10:2025 (A05 = Injection)
cve: [CVE-2020-1938]           # optional, free-form, links to NVD
noise: moderate                # optional: stealth | moderate | loud
sidebar:
  order: 2
  label: Detection
---
```

| Field | Set it on | Registry |
|---|---|---|
| `mitre` | every page | `src/data/mitre.ts` |
| `d3fend` | every page | `src/data/d3fend.ts` |
| `impact` | every page except overviews | `src/data/impact.ts` |
| `owasp` | web pages | `src/data/owasp.ts` |
| `cve` | when tied to a specific vulnerability | none (free-form) |
| `noise` | optional; single-technique pages with one clear footprint | none (`stealth` / `moderate` / `loud`) |

> **Defense pages:** MITRE ATT&CK is an offensive catalog and D3FEND is its defensive counterpart, so on a `defense.mdx` page the two tags point in opposite directions. There, `mitre` names the **attack the page defends against** (not a defense — ATT&CK has no defensive techniques), and `d3fend` names the actual countermeasures. Keeping the ATT&CK ID lets each attack line up with its mitigation under one identifier (e.g. attack `T1190` ↔ defense `D3-AH`). Omit `impact` and `noise` on defense pages.

`mitre`, `d3fend`, `impact`, and `owasp` are validated at build time. If you need an ID that isn't in a registry yet, add it there first:

- **MITRE ATT&CK:** use the canonical name from <https://attack.mitre.org>. Don't use revoked IDs (for example, T1574.002 is now T1574.001).
- **D3FEND:** check the ID on <https://d3fend.mitre.org>. The `slug` is the CamelCase name in the technique's URL.
- **Impact:** a deliberately small vocabulary. Reuse an existing label when one fits instead of adding a near-duplicate.

### Page template

Technique pages follow the same shape so readers can scan them quickly:

1. A one-line framing sentence.
2. **TL;DR**: the shortest working commands.
3. **Where / when** it applies.
4. **Steps**, each with an explicit success indicator.
5. **What to do next**: a table routing each outcome to the next page.
6. **Notes**: caveats, edge cases, false negatives.

Use Starlight's `<Aside>`, `<Tabs syncKey="...">`, and `<Steps>` components. Link to sibling pages with relative links (`../blind-time/`).

### Placeholders

Write target-specific values as placeholders. The operator console substitutes them live in every code block:

| Placeholder | Meaning |
|---|---|
| `<TARGET>`, `<INTERNAL_HOST>` | target host |
| `<ATTACKER>`, `<ATTACKER_IP>`, `<LHOST>`, `<COLLAB>` | your host / callback |
| `<LPORT>` | listener port |
| `<USER>`, `<PASSWORD>` / `<PASS>`, `<DOMAIN>` | credentials |

## Contributing

Every page has an **Edit page** link that opens the source file in GitHub's editor, which is the quickest route for typo fixes and small additions. For larger changes, fork the repo, run `pnpm build` to make sure validation passes, and open a pull request.

Codex is for authorized testing, CTFs, and training environments only.
