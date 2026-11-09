/** Content blocks shared by several pages (landing, security, hosting). */
import { siteLinks } from "./links";

export interface TrustPillar {
	icon: string;
	title: string;
	description: string;
}

/** The four promises shown on the landing page and expanded on /sicherheit. */
export const trustPillars: TrustPillar[] = [
	{
		icon: "i-lucide-shield-check",
		title: "Sicherheit zuerst",
		description:
			"Strenge Trennung der Organisationen, Rechte nach Rolle, Schutz vor Passwort-Raten und moderne Sicherheits-Header. Sicherheit ist bei uns kein Zusatz, sondern die Grundlage.",
	},
	{
		icon: "i-lucide-scale",
		title: "DSGVO-konform",
		description:
			"Datensparsam gebaut: keine Tracker, keine Werbung, keine externen Dienste im Browser. Gesundheitsdaten sieht nur das Team der jeweiligen Freizeit.",
	},
	{
		icon: "i-lucide-database-backup",
		title: "Backups",
		description:
			"Automatische, mit AES-256 verschlüsselte Backups von Datenbank und Dateien, auf Wunsch zusätzlich in einem externen Speicher.",
	},
	{
		icon: "i-lucide-map-pin",
		title: "Gehostet in Deutschland",
		description:
			"Die Iventworks Cloud läuft auf Servern in Deutschland, unter europäischem Datenschutzrecht. Wer alles selbst in der Hand haben will, hostet Iventworks einfach selbst.",
	},
];

export interface HostingOption {
	icon: string;
	title: string;
	description: string;
	points: string[];
	to: string;
	buttonText: string;
	buttonIcon: string;
	highlight?: boolean;
}

export const hostingOptions: HostingOption[] = [
	{
		icon: "i-lucide-cloud",
		title: "Iventworks Cloud",
		description:
			"Ihr bekommt eure eigene Iventworks-Instanz, ohne einen Server betreuen zu müssen. Betrieb, Updates und Backups übernehmen wir.",
		points: [
			"Hosting in Deutschland",
			"Eigene Adresse unter app.iventworks.de oder eure eigene Domain",
			"Tägliche, verschlüsselte Backups",
			"Updates ohne Aufwand für euch",
			"Persönlicher Support per E-Mail",
		],
		to: siteLinks.contactMail,
		buttonText: "Cloud anfragen",
		buttonIcon: "i-lucide-mail",
		highlight: true,
	},
	{
		icon: "i-lucide-server",
		title: "Self-Hosting",
		description:
			"Iventworks ist Open Source. Ihr könnt es mit Docker auf eurem eigenen Server betreiben und behaltet die volle Kontrolle über eure Daten.",
		points: [
			"Kostenlos und Open Source (AGPL-3.0)",
			"Fertiges Docker-Image und Docker Compose",
			"Eingebaute, verschlüsselte Backups, optional nach S3",
			"Eine oder viele Organisationen pro Installation",
			"Ausführliche Anleitung in der Dokumentation",
		],
		to: "/docs/self-hosting/installation",
		buttonText: "Zur Installationsanleitung",
		buttonIcon: "i-lucide-book-open",
	},
];
