// src/data/d3fend.ts
//
// MITRE D3FEND defensive countermeasures - focused subset relevant to
// the offensive techniques the Codex currently covers.
//
// Pages can include a `d3fend:` frontmatter field with D3FEND IDs:
//
//   ---
//   d3fend: [D3-MH, D3-NTA]
//   ---
//
// These render in the page footer (not as a dedicated section) - defenders
// reviewing the page get a list of MITRE-canonical countermeasures they
// can name in their report or remediation plan.
//
// Why a focused subset rather than the full 267 techniques: of the seven
// D3FEND tactics, only ~20-30 techniques actually apply to web injection,
// SSRF, command injection, and similar offensive primitives that we cover.
// Listing the full taxonomy would add noise without value. As the Codex
// expands into new offensive territory (Windows privesc, AD attacks, etc.),
// new D3FEND IDs will be added here.

export interface D3fendTechnique {
  /** D3FEND ID, e.g. "D3-NTA" (Network Traffic Analysis) */
  id: string;
  /** Canonical technique name */
  name: string;
  /** Top-level tactic this falls under (Harden, Detect, Isolate, etc.) */
  tactic: 'Model' | 'Harden' | 'Detect' | 'Isolate' | 'Deceive' | 'Evict' | 'Restore';
  /** URL slug - the CamelCase form D3FEND uses in URLs (e.g. "ApplicationHardening") */
  slug: string;
}

export const D3FEND: Record<string, D3fendTechnique> = {
  // === HARDEN - Application & Message hardening (most relevant for injection) ===
  'D3-AH': {
    id: 'D3-AH',
    name: 'Application Hardening',
    tactic: 'Harden',
    slug: 'ApplicationHardening',
  },
  'D3-ACH': {
    id: 'D3-ACH',
    name: 'Application Configuration Hardening',
    tactic: 'Harden',
    slug: 'ApplicationConfigurationHardening',
  },
  'D3-MH': {
    id: 'D3-MH',
    name: 'Message Hardening',
    tactic: 'Harden',
    slug: 'MessageHardening',
  },
  'D3-MENCR': {
    id: 'D3-MENCR',
    name: 'Message Encryption',
    tactic: 'Harden',
    slug: 'MessageEncryption',
  },
  'D3-MAN': {
    id: 'D3-MAN',
    name: 'Message Authentication',
    tactic: 'Harden',
    slug: 'MessageAuthentication',
  },

  // === HARDEN - Credentials ===
  'D3-CH': {
    id: 'D3-CH',
    name: 'Credential Hardening',
    tactic: 'Harden',
    slug: 'CredentialHardening',
  },
  'D3-MFA': {
    id: 'D3-MFA',
    name: 'Multi-factor Authentication',
    tactic: 'Harden',
    slug: 'Multi-factorAuthentication',
  },
  'D3-SPP': {
    id: 'D3-SPP',
    name: 'Strong Password Policy',
    tactic: 'Harden',
    slug: 'StrongPasswordPolicy',
  },

  // === HARDEN - Platform ===
  'D3-PH': {
    id: 'D3-PH',
    name: 'Platform Hardening',
    tactic: 'Harden',
    slug: 'PlatformHardening',
  },
  'D3-EAL': {
    id: 'D3-EAL',
    name: 'Executable Allowlisting',
    tactic: 'Isolate',
    slug: 'ExecutableAllowlisting',
  },
  'D3-SU': {
    id: 'D3-SU',
    name: 'Software Update',
    tactic: 'Harden',
    slug: 'SoftwareUpdate',
  },

  // === DETECT - Message / Network analysis ===
  'D3-MA': {
    id: 'D3-MA',
    name: 'Message Analysis',
    tactic: 'Detect',
    slug: 'MessageAnalysis',
  },
  'D3-NTA': {
    id: 'D3-NTA',
    name: 'Network Traffic Analysis',
    tactic: 'Detect',
    slug: 'NetworkTrafficAnalysis',
  },
  'D3-NTCD': {
    id: 'D3-NTCD',
    name: 'Network Traffic Community Deviation',
    tactic: 'Detect',
    slug: 'NetworkTrafficCommunityDeviation',
  },
  'D3-IPCTA': {
    id: 'D3-IPCTA',
    name: 'IPC Traffic Analysis',
    tactic: 'Detect',
    slug: 'IPCTrafficAnalysis',
  },

  // === DETECT - Process & file ===
  'D3-PA': {
    id: 'D3-PA',
    name: 'Process Analysis',
    tactic: 'Detect',
    slug: 'ProcessAnalysis',
  },
  'D3-PSA': {
    id: 'D3-PSA',
    name: 'Process Spawn Analysis',
    tactic: 'Detect',
    slug: 'ProcessSpawnAnalysis',
  },
  'D3-FA': {
    id: 'D3-FA',
    name: 'File Analysis',
    tactic: 'Detect',
    slug: 'FileAnalysis',
  },
  'D3-UBA': {
    id: 'D3-UBA',
    name: 'User Behavior Analysis',
    tactic: 'Detect',
    slug: 'UserBehaviorAnalysis',
  },

  // === ISOLATE - Network isolation (relevant for SSRF / cloud metadata) ===
  'D3-NI': {
    id: 'D3-NI',
    name: 'Network Isolation',
    tactic: 'Isolate',
    slug: 'NetworkIsolation',
  },
  'D3-ITF': {
    id: 'D3-ITF',
    name: 'Inbound Traffic Filtering',
    tactic: 'Isolate',
    slug: 'InboundTrafficFiltering',
  },
  'D3-OTF': {
    id: 'D3-OTF',
    name: 'Outbound Traffic Filtering',
    tactic: 'Isolate',
    slug: 'OutboundTrafficFiltering',
  },
  'D3-EI': {
    id: 'D3-EI',
    name: 'Execution Isolation',
    tactic: 'Isolate',
    slug: 'ExecutionIsolation',
  },

  // === EVICT - Cleanup after detection ===
  'D3-CE': {
    id: 'D3-CE',
    name: 'Credential Eviction',
    tactic: 'Evict',
    slug: 'CredentialEviction',
  },
  'D3-PE': {
    id: 'D3-PE',
    name: 'Process Eviction',
    tactic: 'Evict',
    slug: 'ProcessEviction',
  },

  // === Added for auth, session, and Windows privesc pages ===
  // IDs verified against the D3FEND ontology (d3fend-ontology, d3fend-protege.ttl).
  'D3-TB': {
    id: 'D3-TB',
    name: 'Token Binding',
    tactic: 'Harden',
    slug: 'TokenBinding',
  },
  'D3-LFP': {
    id: 'D3-LFP',
    name: 'Local File Permissions',
    tactic: 'Isolate',
    slug: 'LocalFilePermissions',
  },
  'D3-IAA': {
    id: 'D3-IAA',
    name: 'Identifier Activity Analysis',
    tactic: 'Detect',
    slug: 'IdentifierActivityAnalysis',
  },
  'D3-RAPA': {
    id: 'D3-RAPA',
    name: 'Resource Access Pattern Analysis',
    tactic: 'Detect',
    slug: 'ResourceAccessPatternAnalysis',
  },
  'D3-LAM': {
    id: 'D3-LAM',
    name: 'Local Account Monitoring',
    tactic: 'Detect',
    slug: 'LocalAccountMonitoring',
  },
  'D3-PM': {
    id: 'D3-PM',
    name: 'Platform Monitoring',
    tactic: 'Detect',
    slug: 'PlatformMonitoring',
  },
  'D3-FIM': {
    id: 'D3-FIM',
    name: 'File Integrity Monitoring',
    tactic: 'Detect',
    slug: 'FileIntegrityMonitoring',
  },
  'D3-SYSM': {
    id: 'D3-SYSM',
    name: 'System Mapping',
    tactic: 'Model',
    slug: 'SystemMapping',
  },
};

/** Get the canonical name for a D3FEND ID. */
export function d3fendName(id: string): string | null {
  return D3FEND[id]?.name ?? null;
}

/** Get the tactic category for a D3FEND ID. */
export function d3fendTactic(id: string): string | null {
  return D3FEND[id]?.tactic ?? null;
}

/**
 * Construct the D3FEND technique URL.
 *
 * D3FEND URL pattern uses the CamelCase technique name, e.g.:
 *   D3-AH (Application Hardening) → https://d3fend.mitre.org/technique/d3f:ApplicationHardening/
 *
 * The slug is stored in the lookup table per technique.
 */
export function d3fendUrl(id: string): string {
  const technique = D3FEND[id];
  if (!technique) return 'https://d3fend.mitre.org/';
  return `https://d3fend.mitre.org/technique/d3f:${technique.slug}/`;
}
