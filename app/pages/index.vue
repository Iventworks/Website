<script setup lang="ts">
import { siteLinks, supportEmail, supportPhone } from "~/data/links";
import { deviceScreens } from "~/data/screenshots";
import { hostingOptions, trustPillars } from "~/data/site";

usePageSeo({
	title: "Iventworks – Freizeiten und Events gemeinsam planen",
	description:
		"Iventworks ist die Plattform für Freizeiten, Camps und Events: Teilnehmende, Programm, Team, Dokumente und Finanzen an einem Ort. DSGVO-konform, gehostet in Deutschland oder auf eurem eigenen Server.",
	ogImage: "https://www.iventworks.de/static/og/iventworks.png",
	jsonLd: {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Iventworks",
		applicationCategory: "BusinessApplication",
		operatingSystem: "Web, iOS, Android",
		inLanguage: "de",
		description:
			"Plattform für die Planung von Freizeiten, Camps und Events – in der Cloud mit Hosting in Deutschland oder selbst gehostet.",
		url: "https://www.iventworks.de",
		image: "https://www.iventworks.de/static/logo/icon.png",
		license: "https://www.gnu.org/licenses/agpl-3.0.html",
		author: {
			"@type": "Organization",
			name: "Iventworks",
			url: "https://www.iventworks.de",
			email: supportEmail,
		},
	},
});

const stats = [
	{ value: "DSGVO", label: "konform" },
	{ value: "Deutschland", label: "Hosting-Standort" },
	{ value: "AES-256", label: "verschlüsselte Backups" },
	{ value: "AGPL", label: "Open Source" },
];

const pillars = [
	{
		icon: "i-lucide-layers",
		title: "Alles an einem Ort",
		description:
			"Teilnehmende, Programm, Zimmer, Aufgaben, Dokumente und Finanzen: keine verstreuten Tabellen, Chatgruppen und Ordner mehr.",
	},
	{
		icon: "i-lucide-users-round",
		title: "Für das ganze Team",
		description:
			"Jede und jeder Mitarbeitende hat einen eigenen Bereich mit Aufgaben, Nachrichten und Kalender. Die Leitung behält den Überblick.",
	},
	{
		icon: "i-lucide-smartphone",
		title: "Auf jedem Gerät",
		description:
			"Am Laptop planen, auf der Freizeit am Handy nachschauen. Iventworks lässt sich als App auf iPhone und Android installieren.",
	},
];

const features = [
	{
		icon: "i-lucide-users",
		title: "Teilnehmende",
		description:
			"Anmeldungen, Kontakte der Erziehungsberechtigten, Notfallkontakte, Zimmer und Gruppen. Allergien und Medikamente sieht nur das Team der Freizeit.",
	},
	{
		icon: "i-lucide-calendar-range",
		title: "Programm",
		description:
			"Das Programm als Wochenraster oder Liste, mit Ort, Verantwortlichen und Material. Jede und jeder sieht, wann sie dran sind.",
	},
	{
		icon: "i-lucide-list-checks",
		title: "Aufgaben & Zuständigkeiten",
		description:
			"Aufgaben mit Fälligkeit und Priorität verteilen, Zuständigkeiten festlegen und auf der Übersicht sehen, was offen ist.",
	},
	{
		icon: "i-lucide-messages-square",
		title: "Nachrichten",
		description:
			"Chats im Team, mit einzelnen Personen und im Kernteam. Keine privaten Messenger-Gruppen mit Daten von Teilnehmenden mehr.",
	},
	{
		icon: "i-lucide-receipt-euro",
		title: "Finanzen",
		description:
			"Budget planen, Auslagen mit Beleg einreichen und von der Leitung prüfen lassen. Teilnahmebeiträge im Blick behalten.",
	},
	{
		icon: "i-lucide-folder",
		title: "Dokumente & Freigaben",
		description:
			"Dokumente pro Freizeit und für die ganze Organisation. Freigabelinks mit Passwort und Ablaufdatum für Externe.",
	},
	{
		icon: "i-lucide-building-2",
		title: "Kernteam-Bereich",
		description:
			"Alle Freizeiten, Personalplanung, Finanzen, Statistiken sowie Material und Ressourcen über alle Events hinweg.",
	},
	{
		icon: "i-lucide-palette",
		title: "Euer Look",
		description:
			"Name, Farbe, Logo und Icon eurer Organisation, auf Wunsch unter eurer eigenen Domain.",
	},
];
</script>

<template>
	<div>
		<!-- Hero -->
		<section
			class="relative overflow-hidden bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(232,121,249,0.15),transparent)] pt-20 pb-24 sm:pt-28"
		>
			<div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
				<div class="absolute h-96 w-96 rounded-full bg-primary-500/10 blur-3xl" style="top: 10%; left: 20%" />
				<div class="absolute h-96 w-96 rounded-full bg-primary-400/5 blur-3xl" style="top: 40%; right: 15%" />
			</div>

			<UContainer class="relative z-10">
				<div class="mx-auto max-w-4xl text-center">
					<h1 class="mb-6 text-4xl leading-[1.1] font-bold tracking-tight text-white sm:text-5xl md:text-7xl">
						Freizeiten planen.
						<span class="bg-linear-to-tr from-primary-400 to-primary-200 bg-clip-text text-transparent">Gemeinsam.</span>
					</h1>

					<p class="mx-auto mb-8 max-w-2xl text-lg leading-[1.6] text-slate-400 sm:text-xl lg:text-2xl">
						Iventworks bringt Teilnehmende, Programm, Team, Dokumente und Finanzen eurer Freizeiten an
						einen Ort. Sicher, DSGVO-konform und gehostet in Deutschland.
					</p>

					<div class="mb-6 flex flex-col justify-center gap-4 sm:flex-row">
						<UButton :to="siteLinks.contactMail" size="xl" color="primary" class="justify-center px-8" icon="i-lucide-mail">
							Kontaktanfrage
						</UButton>
						<UButton to="/funktionen" size="xl" color="neutral" variant="outline" class="justify-center px-8" icon="i-lucide-sparkles">
							Funktionen ansehen
						</UButton>
					</div>

					<p class="mb-16 text-sm text-slate-500">
						Sicherheit zuerst · DSGVO-konform · Gehostet in Deutschland · Open Source
					</p>
				</div>

				<DeviceShowcase :screens="deviceScreens.overview" />

				<div class="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-8 text-center md:grid-cols-4">
					<div v-for="stat in stats" :key="stat.value" class="space-y-1">
						<div class="text-2xl font-bold text-primary-400 md:text-3xl">{{ stat.value }}</div>
						<div class="text-sm text-slate-500">{{ stat.label }}</div>
					</div>
				</div>
			</UContainer>
		</section>

		<!-- Was ist Iventworks? -->
		<section id="was-ist-iventworks" class="bg-slate-950/50 py-24">
			<UContainer>
				<div class="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
					<div>
						<UBadge color="primary" variant="soft" size="xl" class="mb-3">Was ist Iventworks?</UBadge>
						<h2 class="mb-6 text-3xl font-bold text-white sm:text-4xl">
							Weniger Organisationschaos, mehr Zeit für die Freizeit
						</h2>
						<div class="space-y-4 text-lg leading-relaxed text-slate-400">
							<p>
								Eine Freizeit vorzubereiten heißt: Anmeldungen sammeln, Zimmer verteilen, Programm
								planen, Aufgaben im Team verteilen, Belege einsammeln und am Ende abrechnen. Meist
								verteilt auf Tabellen, Messenger-Gruppen und E-Mails.
							</p>
							<p>
								Iventworks ist die gemeinsame Plattform dafür: für Ehrenamtliche und Mitarbeitende,
								für die <span class="text-slate-200">Leitung</span> einer Freizeit und für das
								<span class="text-slate-200">Kernteam</span>, das alle Events eurer Organisation im
								Blick behält.
							</p>
						</div>
						<UButton to="/funktionen" color="primary" variant="link" class="mt-4 px-0" trailing-icon="i-lucide-arrow-right">
							Alle Funktionen
						</UButton>
					</div>

					<div class="space-y-4">
						<div
							v-for="pillar in pillars"
							:key="pillar.title"
							class="flex gap-4 rounded-xl border border-slate-800 bg-slate-900/50 p-5"
						>
							<div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-500/10">
								<UIcon :name="pillar.icon" class="text-xl text-primary-400" />
							</div>
							<div>
								<h3 class="mb-1 text-lg font-semibold text-white">{{ pillar.title }}</h3>
								<p class="leading-relaxed text-slate-400">{{ pillar.description }}</p>
							</div>
						</div>
					</div>
				</div>
			</UContainer>
		</section>

		<!-- Funktionen -->
		<section id="funktionen" class="py-24">
			<UContainer>
				<SiteSectionHeader
					badge="Funktionen"
					title="Alles, was eure Freizeit braucht"
					description="Von der ersten Anmeldung bis zur Abrechnung, für alle, die mitplanen."
				/>

				<div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
					<UCard
						v-for="feature in features"
						:key="feature.title"
						class="border-slate-800 bg-slate-900/50 transition duration-300 hover:-translate-y-1 hover:border-primary-400/50"
					>
						<div class="space-y-3 p-2">
							<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500/10">
								<UIcon :name="feature.icon" class="text-xl text-primary-400" />
							</div>
							<h3 class="text-lg font-semibold text-white">{{ feature.title }}</h3>
							<p class="leading-relaxed text-slate-400">{{ feature.description }}</p>
						</div>
					</UCard>
				</div>

				<div class="mt-10 text-center">
					<UButton to="/funktionen" size="lg" color="neutral" variant="outline" trailing-icon="i-lucide-arrow-right">
						Alle Funktionen ansehen
					</UButton>
				</div>
			</UContainer>
		</section>

		<!-- Sicherheit & Datenschutz -->
		<section id="sicherheit" class="relative bg-slate-950/50 py-24">
			<UContainer class="relative z-10">
				<SiteSectionHeader
					badge="Sicherheit & Datenschutz"
					title="Eure Daten in sicheren Händen"
					description="Bei Freizeiten geht es um Kinder, Jugendliche und Gesundheitsdaten. Deshalb steht Sicherheit bei Iventworks an erster Stelle."
				/>

				<div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
					<div
						v-for="pillar in trustPillars"
						:key="pillar.title"
						class="flex flex-col rounded-xl border border-slate-800 bg-slate-900/50 p-6"
					>
						<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500/10">
							<UIcon :name="pillar.icon" class="text-xl text-primary-400" />
						</div>
						<h3 class="mb-2 text-lg font-semibold text-white">{{ pillar.title }}</h3>
						<p class="leading-relaxed text-slate-400">{{ pillar.description }}</p>
					</div>
				</div>

				<div class="mt-10 text-center">
					<UButton to="/sicherheit" size="lg" color="neutral" variant="outline" trailing-icon="i-lucide-arrow-right">
						Mehr zu Sicherheit & Datenschutz
					</UButton>
				</div>
			</UContainer>
		</section>

		<!-- Cloud oder Self-Hosting -->
		<section id="hosting" class="relative py-24">
			<div class="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-primary-500/5 to-transparent" />

			<UContainer class="relative z-10">
				<SiteSectionHeader
					badge="Cloud & Self-Hosting"
					title="Ihr entscheidet, wo Iventworks läuft"
					description="Nutzt die Iventworks Cloud mit Hosting in Deutschland oder betreibt Iventworks auf eurem eigenen Server."
				/>

				<div class="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
					<div
						v-for="option in hostingOptions"
						:key="option.title"
						class="flex flex-col rounded-xl border bg-slate-900/80 p-8"
						:class="option.highlight ? 'border-primary-500/50' : 'border-slate-800'"
					>
						<div class="mb-4 flex items-center gap-3">
							<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500/10">
								<UIcon :name="option.icon" class="text-xl text-primary-400" />
							</div>
							<h3 class="text-xl font-semibold text-white">{{ option.title }}</h3>
						</div>
						<p class="mb-6 leading-relaxed text-slate-400">{{ option.description }}</p>
						<ul class="mb-8 flex-1 space-y-2">
							<li v-for="point in option.points" :key="point" class="flex items-start gap-2 text-slate-300">
								<UIcon name="i-lucide-check" class="mt-1 shrink-0 text-primary-400" />
								{{ point }}
							</li>
						</ul>
						<UButton
							:to="option.to"
							size="lg"
							:color="option.highlight ? 'primary' : 'neutral'"
							:variant="option.highlight ? 'solid' : 'outline'"
							:icon="option.buttonIcon"
							class="justify-center"
						>
							{{ option.buttonText }}
						</UButton>
					</div>
				</div>
			</UContainer>
		</section>

		<!-- CTA -->
		<section class="relative overflow-hidden bg-slate-950/50 py-28">
			<UContainer class="relative z-10">
				<div class="mx-auto max-w-3xl text-center">
					<h2 class="mb-8 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
						Bist du bereit für entspannte
						<span class="bg-linear-to-tr from-primary-400 to-primary-200 bg-clip-text text-transparent">Event- und Freizeitplanung</span>?
					</h2>
					<div class="flex flex-col justify-center gap-4 sm:flex-row">
						<UButton :to="siteLinks.contactMail" size="xl" color="primary" class="justify-center px-8" icon="i-lucide-mail">
							Kontaktanfrage
						</UButton>
						<UButton to="/docs" size="xl" color="neutral" variant="outline" class="justify-center px-8" icon="i-lucide-book-open">
							Dokumentation
						</UButton>
					</div>
					<p class="mt-6 text-sm text-slate-500">
						Oder schreibt direkt an
						<NuxtLink :to="siteLinks.contactMail" class="text-primary-400 hover:underline">{{ supportEmail }}</NuxtLink>
						oder ruft an:
						<NuxtLink :to="siteLinks.phone" class="text-primary-400 hover:underline">{{ supportPhone }}</NuxtLink>
					</p>
				</div>
			</UContainer>
		</section>
	</div>
</template>
