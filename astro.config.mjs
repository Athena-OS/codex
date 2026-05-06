// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import netlify from '@astrojs/netlify';

export default defineConfig({
	output: 'static',
	adapter: netlify(),
	vite: {
		resolve: {
			alias: {
				'@components': '/src/components',
				'@data': '/src/data',
			},
		},
	},
	integrations: [
		starlight({
			title: 'Codex',
			description: 'A curated, OS-agnostic field reference for offensive security.',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/Athena-OS/codex' }],
			// Enable the "Edit page" link in the page footer. Starlight appends
			// the file path (relative to the project root) onto this baseUrl,
			// so the resulting link goes straight to GitHub's web editor for
			// the corresponding .mdx file. Lowers the barrier to community
			// contributions — typo fixes and "this also works on Server 2022"
			// notes become a 30-second round trip instead of a fork-clone-PR
			// dance.
			editLink: {
				baseUrl: 'https://github.com/Athena-OS/codex/edit/main/',
			},
			components: {
				Head: './src/components/Head.astro',
				PageFrame: './src/components/PageFrame.astro',
				PageTitle: './src/components/PageTitle.astro',
				SiteTitle: './src/components/SiteTitle.astro',
				ThemeSelect: './src/components/ThemeSelect.astro',
				Footer: './src/components/Footer.astro',
			},
			// Customize Expressive Code's copy button to fit the Codex palette.
			// The defaults use a hardcoded green tooltip background (terminal.ansiGreen)
			// which clashes with the accent palette. We replace it with palette-aware
			// CSS variables — both the button itself and the success tooltip now
			// follow whatever hue the user picks via the palette tuner.
			expressiveCode: {
				// Map non-bundled languages to the closest bundled grammar so
				// Expressive Code stops emitting "language not found" warnings
				// for code blocks tagged with these identifiers. The displayed
				// language label on the code-block frame keeps the original
				// identifier; only the highlighting grammar changes.
				//
				// asp / aspx / jsp → html: these are all "HTML-with-embedded-
				//   script-blocks" formats. HTML highlighting catches the
				//   structural tags correctly; the script-block contents render
				//   as plain text inside, which is the same fallback Shiki
				//   would apply to fully-unknown languages anyway.
				// named → text: BIND DNS zone files have no close analog in
				//   Shiki's bundled grammars. `text` is the explicit no-op
				//   fallback recommended by Shiki for unsupported languages.
				shiki: {
					langAlias: {
						asp: 'html',
						aspx: 'html',
						jsp: 'html',
						named: 'text',
					},
				},
				styleOverrides: {
					frames: {
						// === Copy button — idle, hover, active states ===
						// Use the accent color for the button surface and border.
						// Opacities are tuned so the button reads as "tinted accent"
						// rather than fully opaque accent (which would be loud).
						inlineButtonForeground: 'var(--codex-accent)',
						inlineButtonBackground: 'var(--codex-accent)',
						inlineButtonBorder: 'var(--codex-accent)',
						inlineButtonBackgroundIdleOpacity: '0.08',
						inlineButtonBackgroundHoverOrFocusOpacity: '0.20',
						inlineButtonBackgroundActiveOpacity: '0.35',
						inlineButtonBorderOpacity: '0.55',

						// === Success tooltip — was bright green, now accent-tinted ===
						// We use the accent token directly so the "Copied!" bubble
						// follows the palette hue. Foreground is the page background
						// for solid contrast.
						tooltipSuccessBackground: 'var(--codex-accent)',
						tooltipSuccessForeground: 'var(--codex-bg)',
					},
				},
			},
			customCss: [
				'./src/styles/codex.css',
				'./src/styles/background.css',
			],
			sidebar: [
				{
					label: 'Network',
					items: [
						{
							label: 'Reconnaissance',
							collapsed: true,
							items: [{ autogenerate: { directory: 'codex/network/recon' } }],
						},
						{
							label: 'Service Footprinting',
							collapsed: true,
							items: [{ autogenerate: { directory: 'codex/network/services' } }],
						},
					],
				},
				{
					label: 'Web',
					items: [
						{
							label: 'Authentication & Sessions',
							collapsed: true,
							items: [{ autogenerate: { directory: 'codex/web/auth' } }],
						},
						{
							label: 'Command Injection',
							collapsed: true,
							items: [{ autogenerate: { directory: 'codex/web/command-injection' } }],
						},
						{
							label: 'File Inclusion',
							collapsed: true,
							items: [{ autogenerate: { directory: 'codex/web/lfi' } }],
						},
						{
							label: 'File Upload',
							collapsed: true,
							items: [{ autogenerate: { directory: 'codex/web/uploads' } }],
						},
						{
							label: 'IDOR',
							collapsed: true,
							items: [{ autogenerate: { directory: 'codex/web/idor' } }],
						},
						{
							label: 'Server-Side',
							collapsed: true,
							items: [{ autogenerate: { directory: 'codex/web/server-side' } }],
						},
						{
							label: 'Sessions',
							collapsed: true,
							items: [{ autogenerate: { directory: 'codex/web/sessions' } }],
						},
						{
							label: 'SQL Injection',
							collapsed: true,
							items: [{ autogenerate: { directory: 'codex/web/sqli' } }],
						},
						{
							label: 'Web Services & APIs',
							collapsed: true,
							items: [{ autogenerate: { directory: 'codex/web/web-services' } }],
						},
						{
							label: 'WordPress',
							collapsed: true,
							items: [{ autogenerate: { directory: 'codex/web/wordpress' } }],
						},
						{
							label: 'XSS',
							collapsed: true,
							items: [{ autogenerate: { directory: 'codex/web/xss' } }],
						},
						{
							label: 'XXE',
							collapsed: true,
							items: [{ autogenerate: { directory: 'codex/web/xxe' } }],
						},
					],
				},
				{
					label: 'Windows',
					items: [
						{
							label: 'Privilege Escalation',
							collapsed: true,
							items: [{ autogenerate: { directory: 'codex/windows/privesc' } }],
						},
					],
				},
			],
		}),
	],
});
