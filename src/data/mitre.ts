// src/data/mitre.ts
//
// MITRE ATT&CK technique lookup. Used by <MitreTag /> to render technique
// badges with the official name and link to the MITRE page.
//
// Add entries as new techniques are referenced in Codex pages. The component
// will fall back to a generic "View on MITRE" label if an unknown ID is used,
// but it's better to add the canonical name here so badges look clean.
//
// IDs follow MITRE's format: T<number> for techniques, T<number>.<sub> for
// sub-techniques. URLs follow https://attack.mitre.org/techniques/<ID>/

export interface MitreTechnique {
  /** MITRE technique ID, e.g. "T1190" or "T1059.001" */
  id: string;
  /** Canonical technique name from the MITRE ATT&CK matrix */
  name: string;
  /** Tactic this technique falls under (used for grouping) */
  tactic?: string;
}

/**
 * Build the canonical MITRE URL for a technique ID.
 * Sub-techniques use the form /techniques/T1059/001/ (slash-separated).
 */
export function mitreUrl(id: string): string {
  const [parent, sub] = id.split('.');
  if (sub) {
    return `https://attack.mitre.org/techniques/${parent}/${sub}/`;
  }
  return `https://attack.mitre.org/techniques/${parent}/`;
}

/**
 * Lookup canonical name for a technique ID.
 * Returns undefined for unknown IDs - the calling component should fall back
 * to displaying just the ID.
 */
export function mitreName(id: string): string | undefined {
  return MITRE_TECHNIQUES[id]?.name;
}

/**
 * Known techniques referenced across Codex pages.
 * Extend this as new pages are added.
 */
export const MITRE_TECHNIQUES: Record<string, MitreTechnique> = {
  // === Initial Access ===
  'T1078': {
    id: 'T1078',
    name: 'Valid Accounts',
    tactic: 'Initial Access',
  },
  'T1190': {
    id: 'T1190',
    name: 'Exploit Public-Facing Application',
    tactic: 'Initial Access',
  },
  'T1133': {
    id: 'T1133',
    name: 'External Remote Services',
    tactic: 'Initial Access',
  },

  // === Execution ===
  'T1059': {
    id: 'T1059',
    name: 'Command and Scripting Interpreter',
    tactic: 'Execution',
  },
  'T1059.001': {
    id: 'T1059.001',
    name: 'PowerShell',
    tactic: 'Execution',
  },
  'T1059.003': {
    id: 'T1059.003',
    name: 'Windows Command Shell',
    tactic: 'Execution',
  },
  'T1059.004': {
    id: 'T1059.004',
    name: 'Unix Shell',
    tactic: 'Execution',
  },
  'T1059.007': {
    id: 'T1059.007',
    name: 'JavaScript',
    tactic: 'Execution',
  },
  'T1203': {
    id: 'T1203',
    name: 'Exploitation for Client Execution',
    tactic: 'Execution',
  },

  // === Persistence ===
  'T1505': {
    id: 'T1505',
    name: 'Server Software Component',
    tactic: 'Persistence',
  },
  'T1505.003': {
    id: 'T1505.003',
    name: 'Web Shell',
    tactic: 'Persistence',
  },

  // === Privilege Escalation ===
  'T1068': {
    id: 'T1068',
    name: 'Exploitation for Privilege Escalation',
    tactic: 'Privilege Escalation',
  },

  // === Defense Evasion ===
  'T1027': {
    id: 'T1027',
    name: 'Obfuscated Files or Information',
    tactic: 'Defense Evasion',
  },
  'T1140': {
    id: 'T1140',
    name: 'Deobfuscate/Decode Files or Information',
    tactic: 'Defense Evasion',
  },

  // === Credential Access ===
  'T1552': {
    id: 'T1552',
    name: 'Unsecured Credentials',
    tactic: 'Credential Access',
  },
  'T1552.001': {
    id: 'T1552.001',
    name: 'Credentials In Files',
    tactic: 'Credential Access',
  },
  'T1552.005': {
    id: 'T1552.005',
    name: 'Cloud Instance Metadata API',
    tactic: 'Credential Access',
  },

  // === Reconnaissance (PRE-ATT&CK - passive/external footprinting) ===
  'T1589': {
    id: 'T1589',
    name: 'Gather Victim Identity Information',
    tactic: 'Reconnaissance',
  },
  'T1589.002': {
    id: 'T1589.002',
    name: 'Email Addresses',
    tactic: 'Reconnaissance',
  },
  'T1589.003': {
    id: 'T1589.003',
    name: 'Employee Names',
    tactic: 'Reconnaissance',
  },
  'T1590': {
    id: 'T1590',
    name: 'Gather Victim Network Information',
    tactic: 'Reconnaissance',
  },
  'T1590.001': {
    id: 'T1590.001',
    name: 'Domain Properties',
    tactic: 'Reconnaissance',
  },
  'T1590.002': {
    id: 'T1590.002',
    name: 'DNS',
    tactic: 'Reconnaissance',
  },
  'T1591': {
    id: 'T1591',
    name: 'Gather Victim Org Information',
    tactic: 'Reconnaissance',
  },
  'T1592': {
    id: 'T1592',
    name: 'Gather Victim Host Information',
    tactic: 'Reconnaissance',
  },
  'T1593': {
    id: 'T1593',
    name: 'Search Open Websites/Domains',
    tactic: 'Reconnaissance',
  },
  'T1593.002': {
    id: 'T1593.002',
    name: 'Search Engines',
    tactic: 'Reconnaissance',
  },
  'T1594': {
    id: 'T1594',
    name: 'Search Victim-Owned Websites',
    tactic: 'Reconnaissance',
  },
  'T1595': {
    id: 'T1595',
    name: 'Active Scanning',
    tactic: 'Reconnaissance',
  },
  'T1595.001': {
    id: 'T1595.001',
    name: 'Scanning IP Blocks',
    tactic: 'Reconnaissance',
  },
  'T1595.002': {
    id: 'T1595.002',
    name: 'Vulnerability Scanning',
    tactic: 'Reconnaissance',
  },
  'T1596': {
    id: 'T1596',
    name: 'Search Open Technical Databases',
    tactic: 'Reconnaissance',
  },
  'T1596.001': {
    id: 'T1596.001',
    name: 'DNS/Passive DNS',
    tactic: 'Reconnaissance',
  },
  'T1596.003': {
    id: 'T1596.003',
    name: 'Digital Certificates',
    tactic: 'Reconnaissance',
  },

  // === Credential Access ===
  'T1110': {
    id: 'T1110',
    name: 'Brute Force',
    tactic: 'Credential Access',
  },
  'T1110.001': {
    id: 'T1110.001',
    name: 'Password Guessing',
    tactic: 'Credential Access',
  },
  'T1110.003': {
    id: 'T1110.003',
    name: 'Password Spraying',
    tactic: 'Credential Access',
  },
  'T1040': {
    id: 'T1040',
    name: 'Network Sniffing',
    tactic: 'Credential Access',
  },
  'T1003': {
    id: 'T1003',
    name: 'OS Credential Dumping',
    tactic: 'Credential Access',
  },

  // === Discovery ===
  'T1018': {
    id: 'T1018',
    name: 'Remote System Discovery',
    tactic: 'Discovery',
  },
  'T1046': {
    id: 'T1046',
    name: 'Network Service Discovery',
    tactic: 'Discovery',
  },
  'T1083': {
    id: 'T1083',
    name: 'File and Directory Discovery',
    tactic: 'Discovery',
  },
  'T1087': {
    id: 'T1087',
    name: 'Account Discovery',
    tactic: 'Discovery',
  },
  'T1087.001': {
    id: 'T1087.001',
    name: 'Local Account',
    tactic: 'Discovery',
  },
  'T1087.002': {
    id: 'T1087.002',
    name: 'Domain Account',
    tactic: 'Discovery',
  },
  'T1135': {
    id: 'T1135',
    name: 'Network Share Discovery',
    tactic: 'Discovery',
  },
  'T1016': {
    id: 'T1016',
    name: 'System Network Configuration Discovery',
    tactic: 'Discovery',
  },
  'T1049': {
    id: 'T1049',
    name: 'System Network Connections Discovery',
    tactic: 'Discovery',
  },
  'T1082': {
    id: 'T1082',
    name: 'System Information Discovery',
    tactic: 'Discovery',
  },

  // === Lateral Movement ===
  'T1021': {
    id: 'T1021',
    name: 'Remote Services',
    tactic: 'Lateral Movement',
  },
  'T1021.001': {
    id: 'T1021.001',
    name: 'Remote Desktop Protocol',
    tactic: 'Lateral Movement',
  },
  'T1021.002': {
    id: 'T1021.002',
    name: 'SMB/Windows Admin Shares',
    tactic: 'Lateral Movement',
  },
  'T1021.004': {
    id: 'T1021.004',
    name: 'SSH',
    tactic: 'Lateral Movement',
  },
  'T1021.005': {
    id: 'T1021.005',
    name: 'VNC',
    tactic: 'Lateral Movement',
  },
  'T1021.006': {
    id: 'T1021.006',
    name: 'Windows Remote Management',
    tactic: 'Lateral Movement',
  },
  'T1199': {
    id: 'T1199',
    name: 'Trusted Relationship',
    tactic: 'Lateral Movement',
  },
  'T1210': {
    id: 'T1210',
    name: 'Exploitation of Remote Services',
    tactic: 'Lateral Movement',
  },
  'T1080': {
    id: 'T1080',
    name: 'Taint Shared Content',
    tactic: 'Lateral Movement',
  },

  // === Collection ===
  'T1005': {
    id: 'T1005',
    name: 'Data from Local System',
    tactic: 'Collection',
  },
  'T1213': {
    id: 'T1213',
    name: 'Data from Information Repositories',
    tactic: 'Collection',
  },

  // === Command and Control ===
  'T1071': {
    id: 'T1071',
    name: 'Application Layer Protocol',
    tactic: 'Command and Control',
  },
  'T1071.001': {
    id: 'T1071.001',
    name: 'Web Protocols',
    tactic: 'Command and Control',
  },
  'T1071.004': {
    id: 'T1071.004',
    name: 'DNS',
    tactic: 'Command and Control',
  },

  // === Impact ===
  'T1485': {
    id: 'T1485',
    name: 'Data Destruction',
    tactic: 'Impact',
  },

  // === Session-attack and client-side coverage ===
  'T1185': {
    id: 'T1185',
    name: 'Browser Session Hijacking',
    tactic: 'Collection',
  },
  'T1212': {
    id: 'T1212',
    name: 'Exploitation for Credential Access',
    tactic: 'Credential Access',
  },
  'T1539': {
    id: 'T1539',
    name: 'Steal Web Session Cookie',
    tactic: 'Credential Access',
  },
  'T1550.004': {
    id: 'T1550.004',
    name: 'Web Session Cookie',
    tactic: 'Lateral Movement',
  },
  'T1557': {
    id: 'T1557',
    name: 'Adversary-in-the-Middle',
    tactic: 'Credential Access',
  },

  // === Resource-exhaustion / DoS ===
  'T1499': {
    id: 'T1499',
    name: 'Endpoint Denial of Service',
    tactic: 'Impact',
  },

  // === Web-application-specific (CAPEC and OWASP cross-references) ===
  // SQL injection - primarily mapped to T1190 (initial access) but the
  // post-exploitation behaviour also covers T1213 (data collection)
  // and T1552.001 (credential discovery in files/databases).

  // SSTI - typically reaches RCE, mapping to T1190 + T1059.

  // Server-Side Includes - Apache mod_include exploitation, T1190 + T1505.003
  // (web shell persistence is the natural follow-up).
};
