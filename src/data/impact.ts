// src/data/impact.ts
//
// Impact pill taxonomy - short labels for what a technique achieves.
//
// Used in page frontmatter:
//
//   ---
//   impact: [RCE, DataExfil]
//   ---
//
// The component (ImpactPill.astro) renders the canonical short label.
// We deliberately use a closed vocabulary (not free-form strings) so the
// pills stay consistent across pages and a future reader can scan them
// quickly without learning custom terminology per page.

export interface ImpactLabel {
  /** Short ID used in frontmatter (compact, hacker-coded) */
  id: string;
  /** Display label shown in the pill */
  label: string;
  /** Optional longer description for tooltips */
  description: string;
}

export const IMPACT: Record<string, ImpactLabel> = {
  // === Execution / Code-running impacts ===
  RCE: {
    id: 'RCE',
    label: 'RCE',
    description: 'Remote Code Execution - execute arbitrary code on the target',
  },
  LCE: {
    id: 'LCE',
    label: 'LCE',
    description: 'Local Code Execution - execute code as the current user/process',
  },
  ServerSideEval: {
    id: 'ServerSideEval',
    label: 'Server-side eval',
    description: 'Server interprets attacker-controlled expression (SSTI, XSLT, etc.)',
  },

  // === Access / Authentication impacts ===
  AuthBypass: {
    id: 'AuthBypass',
    label: 'Auth Bypass',
    description: 'Bypass authentication controls to access protected resources',
  },
  PrivEsc: {
    id: 'PrivEsc',
    label: 'PrivEsc',
    description: 'Privilege escalation - gain higher privileges than authorized',
  },
  SessionTakeover: {
    id: 'SessionTakeover',
    label: 'Session Takeover',
    description: 'Take over an authenticated user session',
  },
  AccountTakeover: {
    id: 'AccountTakeover',
    label: 'Account Takeover',
    description: 'Gain persistent control of another user account (password reset, email change, credential overwrite)',
  },
  AdminCompromise: {
    id: 'AdminCompromise',
    label: 'Admin Compromise',
    description: 'Gain administrative control of the application or host',
  },
  SystemCompromise: {
    id: 'SystemCompromise',
    label: 'System Compromise',
    description: 'Full control of the host operating system (SYSTEM / root)',
  },
  DomainCompromise: {
    id: 'DomainCompromise',
    label: 'Domain Compromise',
    description: 'Control of the Active Directory domain (Domain Admin or equivalent)',
  },
  FilterBypass: {
    id: 'FilterBypass',
    label: 'Filter Bypass',
    description: 'Evade input filters, WAF rules, or access-control checks',
  },

  // === Data impacts ===
  DataExfil: {
    id: 'DataExfil',
    label: 'Data Exfil',
    description: 'Extract data from the target system or database',
  },
  CredentialTheft: {
    id: 'CredentialTheft',
    label: 'Credential Theft',
    description: 'Obtain user credentials, secrets, or authentication tokens',
  },
  FileRead: {
    id: 'FileRead',
    label: 'File Read',
    description: 'Read arbitrary files from the target system',
  },
  FileWrite: {
    id: 'FileWrite',
    label: 'File Write',
    description: 'Write arbitrary files to the target system',
  },
  SourceCodeDisclosure: {
    id: 'SourceCodeDisclosure',
    label: 'Source Disclosure',
    description: 'Read application source code, exposing logic, secrets, and further bugs',
  },
  Integrity: {
    id: 'Integrity',
    label: 'Integrity',
    description: 'Tamper with data or content the target trusts',
  },
  Defacement: {
    id: 'Defacement',
    label: 'Defacement',
    description: 'Alter visible content presented to users of the target',
  },

  // === Network / Lateral impacts ===
  InternalAccess: {
    id: 'InternalAccess',
    label: 'Internal Access',
    description: 'Reach internal services not normally exposed to attackers',
  },
  CloudMetadata: {
    id: 'CloudMetadata',
    label: 'Cloud Metadata',
    description: 'Access cloud instance metadata (AWS IMDS, GCP, Azure)',
  },
  Pivot: {
    id: 'Pivot',
    label: 'Pivot',
    description: 'Use the compromised host as a stepping-stone to other targets',
  },
  SSRF: {
    id: 'SSRF',
    label: 'SSRF',
    description: 'Make the server issue requests on the attacker\'s behalf',
  },

  // === Information gathering ===
  Reconnaissance: {
    id: 'Reconnaissance',
    label: 'Recon',
    description: 'Learn about the target environment before acting on it',
  },
  Discovery: {
    id: 'Discovery',
    label: 'Discovery',
    description: 'Enumerate users, groups, processes, and software on a compromised host',
  },

  // === Social engineering ===
  PhishingDelivery: {
    id: 'PhishingDelivery',
    label: 'Phishing Delivery',
    description: 'Use the trusted target domain to deliver phishing content or redirects',
  },

  // === Availability / Disruption ===
  DoS: {
    id: 'DoS',
    label: 'DoS',
    description: 'Denial of service - disrupt availability of the target',
  },
};

/** Get the display label for an impact id. */
export function impactLabel(id: string): string {
  return IMPACT[id]?.label ?? id;
}

/** Get the tooltip description for an impact id. */
export function impactDescription(id: string): string | null {
  return IMPACT[id]?.description ?? null;
}
