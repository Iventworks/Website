/**
 * Static docs navigation — consumed by the docs sidebar and prev/next links.
 * Follows the style-guide "static data in app/data/" idiom.
 */

export interface DocsPage {
	/** Absolute page path, also the route. */
	to: string;
	title: string;
	description: string;
	icon: string;
}

export interface DocsSection {
	label: string;
	pages: DocsPage[];
}

export const docsSections: DocsSection[] = [
	{
		label: "Einführung",
		pages: [
			{
				to: "/docs",
				title: "Überblick",
				description: "Was Iventworks ist, für wen es gedacht ist und wo ihr was findet.",
				icon: "i-lucide-book-open",
			},
			{
				to: "/docs/faq",
				title: "Häufige Fragen",
				description: "Antworten auf die häufigsten Fragen zu Iventworks.",
				icon: "i-lucide-circle-help",
			},
		],
	},
	{
		label: "Erste Schritte",
		pages: [
			{
				to: "/docs/erste-schritte/anmelden",
				title: "Einladung & Anmeldung",
				description: "Eine Einladung annehmen, sich anmelden und das Passwort zurücksetzen.",
				icon: "i-lucide-log-in",
			},
			{
				to: "/docs/erste-schritte/app-installieren",
				title: "App installieren",
				description: "Iventworks auf dem Handy oder Computer als App installieren.",
				icon: "i-lucide-smartphone",
			},
			{
				to: "/docs/erste-schritte/rollen-und-rechte",
				title: "Rollen & Rechte",
				description: "Wer in Iventworks was sehen und tun darf.",
				icon: "i-lucide-key-round",
			},
		],
	},
	{
		label: "Nutzung",
		pages: [
			{
				to: "/docs/nutzung/persoenlicher-bereich",
				title: "Persönlicher Bereich",
				description: "Übersicht, Aufgaben, Kalender, Notizen und Push-Benachrichtigungen.",
				icon: "i-lucide-layout-dashboard",
			},
			{
				to: "/docs/nutzung/nachrichten",
				title: "Nachrichten",
				description: "Chats mit Anhängen, Antworten, Reaktionen, Lesebestätigungen und Suche.",
				icon: "i-lucide-messages-square",
			},
			{
				to: "/docs/nutzung/freizeiten-und-events",
				title: "Freizeiten & Events",
				description:
					"Teilnehmende, Programm, Zimmer, Team und Finanzen einer Freizeit, Events kopieren.",
				icon: "i-lucide-tent",
			},
			{
				to: "/docs/nutzung/regeltermine",
				title: "Regeltermine & Dienstplan",
				description: "Wöchentliche oder monatliche Termine und wer wann was übernimmt.",
				icon: "i-lucide-calendar-sync",
			},
			{
				to: "/docs/nutzung/dokumente-und-freigaben",
				title: "Dokumente & Freigaben",
				description: "Dateien ablegen und mit Freigabelinks an Externe weitergeben.",
				icon: "i-lucide-folder-lock",
			},
			{
				to: "/docs/nutzung/kernteam",
				title: "Kernteam-Bereich",
				description: "Events, Personal, Finanzen und Ressourcen der ganzen Organisation.",
				icon: "i-lucide-building-2",
			},
		],
	},
	{
		label: "Administration",
		pages: [
			{
				to: "/docs/administration/benutzer-und-einladungen",
				title: "Benutzer & Einladungen",
				description: "Personen einladen, Rollen vergeben und das Audit-Log nutzen.",
				icon: "i-lucide-users",
			},
			{
				to: "/docs/administration/organisation-und-domains",
				title: "Organisation & Domains",
				description: "Name, Farbe, Logo und eigene Domains eurer Organisation.",
				icon: "i-lucide-palette",
			},
		],
	},
	{
		label: "Cloud & Self-Hosting",
		pages: [
			{
				to: "/docs/cloud",
				title: "Iventworks Cloud",
				description: "Iventworks nutzen, ohne einen eigenen Server zu betreiben.",
				icon: "i-lucide-cloud",
			},
			{
				to: "/docs/self-hosting/installation",
				title: "Installation",
				description: "Iventworks mit Docker auf dem eigenen Server installieren.",
				icon: "i-lucide-server",
			},
			{
				to: "/docs/self-hosting/reverse-proxy",
				title: "Reverse Proxy & HTTPS",
				description: "Konfigurationen für Caddy, nginx, Traefik und Apache, mit WebSockets.",
				icon: "i-lucide-network",
			},
			{
				to: "/docs/self-hosting/konfiguration",
				title: "Konfiguration",
				description: "Alle Einstellungen über Umgebungsvariablen.",
				icon: "i-lucide-sliders-horizontal",
			},
			{
				to: "/docs/self-hosting/backups",
				title: "Backups",
				description: "Verschlüsselte Backups einrichten, prüfen und wiederherstellen.",
				icon: "i-lucide-database-backup",
			},
			{
				to: "/docs/self-hosting/mehrere-organisationen",
				title: "Mehrere Organisationen",
				description: "Viele Organisationen auf einer Installation, mit eigenen Domains.",
				icon: "i-lucide-building",
			},
			{
				to: "/docs/self-hosting/sicherheit",
				title: "Sicherheit",
				description: "Wie Iventworks Daten schützt und was ihr beim Betrieb beachten solltet.",
				icon: "i-lucide-shield-check",
			},
		],
	},
];

/**
 * Base URL for "Diese Seite bearbeiten" links, ending in the content folder. `null` hides the link.
 */
export const docsEditBaseUrl: string | null =
	"https://git.leicraftmc.de/Iventworks/Website/-/edit/main/content";

/** Flat list of pages in reading order, for prev/next navigation. */
export const docsPagesFlat: DocsPage[] = docsSections.flatMap((section) => section.pages);

export function getDocsPageByPath(path: string): DocsPage | undefined {
	return docsPagesFlat.find((page) => page.to === path);
}
