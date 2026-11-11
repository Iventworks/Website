<script setup lang="ts">
import { siteLinks } from "~/data/links";
import { deviceScreens } from "~/data/screenshots";

usePageSeo({
	title: "Funktionen – Iventworks",
	description:
		"Teilnehmende, Programm, Zimmer, Team, Regeltermine mit Dienstplan, Aufgaben, Nachrichten, Dokumente und Finanzen: alle Funktionen von Iventworks für Freizeiten, Camps und Events.",
	ogImage: "https://www.iventworks.de/static/og/iventworks.png",
});

const areas = [
	{
		id: "persoenlich",
		icon: "i-lucide-layout-dashboard",
		title: "Persönlicher Bereich",
		description: "Für alle Ehrenamtlichen und Mitarbeitenden: der eigene Startpunkt in Iventworks.",
		points: [
			"Übersicht mit offenen Aufgaben, ungelesenen Nachrichten und der nächsten Freizeit",
			"Meine Aufgaben mit Fälligkeit und Priorität",
			"Kalender und persönliche Notizen",
			"Benachrichtigungen, wenn etwas für dich ansteht",
			"Neuigkeiten deiner Organisation",
		],
	},
	{
		id: "nachrichten",
		icon: "i-lucide-messages-square",
		title: "Nachrichten",
		description: "Chats wie im Messenger, aber bei eurer Organisation statt in privaten Gruppen.",
		points: [
			"Direkt- und Gruppenchats, dazu automatisch ein Chat pro Event, Gruppe und Kernteam",
			"Dateien und Bilder anhängen, auch per Ziehen und Ablegen",
			"Antworten, Reaktionen, Bearbeiten und Löschen",
			"Lesebestätigungen, Online-Status und wer gerade schreibt",
			"Angeheftete Nachrichten und Suche in einem oder allen Chats",
			"Live ohne Neuladen und als Push-Benachrichtigung",
		],
	},
	{
		id: "freizeiten",
		icon: "i-lucide-tent",
		title: "Freizeiten & Events",
		description: "Alles, was eine einzelne Freizeit oder ein Event ausmacht, an einem Ort.",
		points: [
			"Teilnehmende mit Kontaktdaten, Erziehungsberechtigten und Notfallkontakten",
			"Gesundheitsinfos: Allergien, Medikamente, Ernährung, Schwimmfähigkeit, Fotoerlaubnis",
			"Programm als Wochenraster oder Liste, mit Verantwortlichen",
			"Zimmer, Gruppen, Team und Zuständigkeiten",
			"Aufgaben, Notizen und Dokumente der Freizeit",
			"Statistiken und Audit-Log für die Leitung",
		],
	},
	{
		id: "regeltermine",
		icon: "i-lucide-calendar-sync",
		title: "Regeltermine & Dienstplan",
		description: "Für alles, was sich wiederholt: Gruppenstunden, Proben, Treffen.",
		points: [
			"Wöchentlich oder monatlich, alle paar Wochen oder Monate, mit üblicher Uhrzeit",
			"Jeder Termin mit eigenem Thema, Notizen, Uhrzeit und Ort",
			"Termine absagen oder zusätzliche anlegen, die Eingeteilten werden benachrichtigt",
			"Dienstplan pro Termin und Zuständigkeit",
			"Automatisch füllen: alle üblich Zuständigen oder reihum im Wechsel",
			"Mitarbeitende übernehmen offene Dienste selbst",
		],
	},
	{
		id: "finanzen",
		icon: "i-lucide-receipt-euro",
		title: "Finanzen",
		description: "Vom Budget bis zur Abrechnung, nachvollziehbar für alle Beteiligten.",
		points: [
			"Budget mit geplanten Einnahmen und Ausgaben",
			"Auslagen mit Beleg einreichen",
			"Prüfung und Freigabe durch die Leitung",
			"Teilnahmebeiträge und Zahlungsstatus",
			"Übersicht über alle Freizeiten für das Kernteam",
		],
	},
	{
		id: "kernteam",
		icon: "i-lucide-building-2",
		title: "Kernteam",
		description: "Für alle, die die Arbeit der ganzen Organisation koordinieren.",
		points: [
			"Freizeiten & Events anlegen, Leitungen festlegen und Events fürs nächste Mal kopieren",
			"Personalplanung über alle Events",
			"Finanzen und Statistiken organisationsweit",
			"Material & Ressourcen verwalten und für Events reservieren",
			"Neuigkeiten, Dokumente & Leitfäden für alle",
			"Interne Notizen und Kernteam-Chat",
		],
	},
	{
		id: "dokumente",
		icon: "i-lucide-folder-lock",
		title: "Dokumente & Freigabelinks",
		description: "Dateien sicher ablegen und gezielt mit Externen teilen.",
		points: [
			"Dokumente pro Freizeit und eine Bibliothek für die ganze Organisation",
			"Freigabelinks für Personen ohne Konto: ansehen, hochladen, bearbeiten",
			"Upload-Briefkasten, z. B. für Anmeldeformulare oder Fotos",
			"Optionales Passwort und Ablaufdatum",
			"Übersicht aller Links für Admins, Freigaben abschaltbar",
		],
	},
	{
		id: "administration",
		icon: "i-lucide-shield",
		title: "Administration",
		description: "Kontrolle darüber, wer Zugriff hat und wie Iventworks bei euch aussieht.",
		points: [
			"Zugang nur auf Einladung",
			"Rollen: Admin, Kernteam, Mitarbeitende",
			"Name, Farbe, Logo und Icon eurer Organisation",
			"Eigene Domains für eure Organisation",
			"Audit-Log mit allen wichtigen Änderungen",
		],
	},
	{
		id: "app",
		icon: "i-lucide-smartphone",
		title: "App & Push",
		description: "Auf der Freizeit am Handy, ohne App Store.",
		points: [
			"Als App installieren auf iPhone, Android und am Computer",
			"Euer Logo als App-Icon, mit der Zahl der ungelesenen Nachrichten",
			"Push-Benachrichtigungen für Nachrichten, Aufgaben, Dienste und mehr",
			"Pro Gerät einstellbar, auf Wunsch ohne Nachrichtentext",
			"Ende-zu-Ende verschlüsselt über den Push-Dienst des Geräts",
			"Online-Status auf Wunsch verbergen",
		],
	},
];

const extras = [
	{
		icon: "i-lucide-copy-plus",
		title: "Fürs nächste Mal kopieren",
		description:
			"Die Freizeit vom letzten Jahr als Vorlage: Team, Programm, Zuständigkeiten, Aufgaben und Dokumente übernehmen, die Termine wandern mit.",
	},
	{
		icon: "i-lucide-building",
		title: "Mehrere Organisationen",
		description:
			"Eine Installation kann viele Organisationen bedienen, jede mit eigenen Benutzern, Daten, Farben und Domains.",
	},
	{
		icon: "i-lucide-key-round",
		title: "API & API-Schlüssel",
		description:
			"Eine dokumentierte REST-API mit persönlichen API-Schlüsseln, für eigene Auswertungen und Anbindungen.",
	},
	{
		icon: "i-lucide-code-2",
		title: "Open Source",
		description:
			"Der komplette Quellcode ist unter der AGPL-3.0 offen. Ihr könnt nachvollziehen, was mit euren Daten passiert.",
	},
];
</script>

<template>
	<div>
		<section
			class="relative overflow-hidden bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(232,121,249,0.15),transparent)] pt-20 pb-20 sm:pt-28"
		>
			<UContainer class="relative z-10">
				<div class="mx-auto mb-16 max-w-3xl text-center">
					<UBadge color="primary" variant="soft" size="xl" class="mb-6">Funktionen</UBadge>
					<h1 class="mb-6 text-4xl leading-[1.1] font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
						Alles für eure
						<span class="bg-linear-to-tr from-primary-400 to-primary-200 bg-clip-text text-transparent">Freizeiten</span>
					</h1>
					<p class="text-lg leading-[1.6] text-slate-400 sm:text-xl">
						Von der Anmeldung über das Programm bis zur Abrechnung. Für Ehrenamtliche, Leitungen,
						Kernteam und Admins, am Laptop und am Handy.
					</p>
				</div>

				<DeviceShowcase :screens="deviceScreens.event" />
			</UContainer>
		</section>

		<section class="bg-slate-950/50 py-24">
			<UContainer>
				<SiteSectionHeader
					badge="Im Überblick"
					title="Was Iventworks kann"
					description="Jede Person sieht genau das, was sie für ihre Rolle braucht."
				/>

				<div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
					<div
						v-for="area in areas"
						:id="area.id"
						:key="area.id"
						class="flex scroll-mt-24 flex-col rounded-xl border border-slate-800 bg-slate-900/50 p-6"
					>
						<div class="mb-4 flex items-center gap-3">
							<div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-500/10">
								<UIcon :name="area.icon" class="text-xl text-primary-400" />
							</div>
							<h2 class="text-xl font-semibold text-white">{{ area.title }}</h2>
						</div>
						<p class="mb-4 text-slate-400">{{ area.description }}</p>
						<ul class="space-y-2">
							<li v-for="point in area.points" :key="point" class="flex items-start gap-2 text-sm text-slate-300">
								<UIcon name="i-lucide-check" class="mt-0.5 shrink-0 text-primary-400" />
								{{ point }}
							</li>
						</ul>
					</div>
				</div>
			</UContainer>
		</section>

		<section class="py-24">
			<UContainer>
				<SiteSectionHeader badge="Außerdem" title="Gebaut für den echten Einsatz" />

				<div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
					<UCard
						v-for="extra in extras"
						:key="extra.title"
						class="border-slate-800 bg-slate-900/50 transition duration-300 hover:-translate-y-1 hover:border-primary-400/50"
					>
						<div class="space-y-3 p-2">
							<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500/10">
								<UIcon :name="extra.icon" class="text-xl text-primary-400" />
							</div>
							<h3 class="text-lg font-semibold text-white">{{ extra.title }}</h3>
							<p class="leading-relaxed text-slate-400">{{ extra.description }}</p>
						</div>
					</UCard>
				</div>

				<div class="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
					<UButton :to="siteLinks.contactMail" size="xl" color="primary" class="justify-center px-8" icon="i-lucide-mail">
						Kontaktanfrage
					</UButton>
					<UButton to="/docs" size="xl" color="neutral" variant="outline" class="justify-center px-8" icon="i-lucide-book-open">
						Zur Dokumentation
					</UButton>
				</div>
			</UContainer>
		</section>
	</div>
</template>
