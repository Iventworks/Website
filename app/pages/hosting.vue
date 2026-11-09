<script setup lang="ts">
import { siteLinks } from "~/data/links";
import { hostingOptions } from "~/data/site";

usePageSeo({
	title: "Cloud & Self-Hosting – Iventworks",
	description:
		"Iventworks in der Cloud mit Hosting in Deutschland oder selbst gehostet auf eurem eigenen Server: vergleicht die beiden Betriebsarten.",
	ogImage: "https://www.iventworks.de/static/og/iventworks.png",
});

const comparison = [
	{ label: "Hosting-Standort", cloud: "Deutschland", self: "Wo ihr wollt" },
	{ label: "Server-Betrieb & Updates", cloud: "Übernehmen wir", self: "Macht ihr selbst" },
	{
		label: "Verschlüsselte Backups",
		cloud: "Täglich, automatisch",
		self: "Eingebaut, ihr konfiguriert sie",
	},
	{ label: "Eigene Domain", cloud: "Möglich", self: "Möglich" },
	{ label: "Eigenes Logo und Farben", cloud: "Ja", self: "Ja" },
	{ label: "Alle Funktionen", cloud: "Ja", self: "Ja" },
	{ label: "Technisches Wissen nötig", cloud: "Nein", self: "Docker & Reverse Proxy" },
	{ label: "Support", cloud: "Per E-Mail", self: "Dokumentation" },
];

const selfHostSteps = [
	{
		icon: "i-lucide-server",
		title: "Server vorbereiten",
		description: "Ein Linux-Server mit Docker und einem Reverse Proxy für HTTPS.",
	},
	{
		icon: "i-lucide-file-cog",
		title: "Konfigurieren",
		description: "Adresse, E-Mail-Versand und Backup-Passphrase in der Compose-Datei eintragen.",
	},
	{
		icon: "i-lucide-play",
		title: "Starten",
		description: "Mit docker compose starten. Die Datenbank wird automatisch eingerichtet.",
	},
	{
		icon: "i-lucide-user-plus",
		title: "Team einladen",
		description: "Admin-Passwort setzen und euer Team per Einladung hinzufügen.",
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
					<UBadge color="primary" variant="soft" size="xl" class="mb-6">Cloud & Self-Hosting</UBadge>
					<h1 class="mb-6 text-4xl leading-[1.1] font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
						Euer Iventworks,
						<span class="bg-linear-to-tr from-primary-400 to-primary-200 bg-clip-text text-transparent">eure Wahl</span>
					</h1>
					<p class="text-lg leading-[1.6] text-slate-400 sm:text-xl">
						Lasst uns Iventworks für euch betreiben, gehostet in Deutschland. Oder installiert es auf
						eurem eigenen Server. Die Funktionen sind in beiden Fällen dieselben.
					</p>
				</div>

				<div class="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
					<div
						v-for="option in hostingOptions"
						:key="option.title"
						class="flex flex-col rounded-xl border bg-slate-900/80 p-8"
						:class="option.highlight ? 'border-primary-500/50' : 'border-slate-800'"
					>
						<div class="mb-6 flex items-center gap-3">
							<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500/10">
								<UIcon :name="option.icon" class="text-xl text-primary-400" />
							</div>
							<h2 class="text-xl font-semibold text-white">{{ option.title }}</h2>
						</div>
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

		<section id="vergleich" class="bg-slate-950/50 py-24">
			<UContainer>
				<SiteSectionHeader badge="Vergleich" title="Cloud oder Self-Hosting?" />

				<div class="mx-auto max-w-4xl overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/50">
					<table class="w-full min-w-[32rem] text-left">
						<thead>
							<tr class="border-b border-slate-800 text-sm text-slate-400">
								<th scope="col" class="p-4 font-medium" />
								<th scope="col" class="p-4 font-semibold text-primary-400">Iventworks Cloud</th>
								<th scope="col" class="p-4 font-semibold text-slate-200">Self-Hosting</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="row in comparison" :key="row.label" class="border-b border-slate-800/70 last:border-0">
								<th scope="row" class="p-4 font-medium text-slate-300">{{ row.label }}</th>
								<td class="p-4 text-slate-200">{{ row.cloud }}</td>
								<td class="p-4 text-slate-400">{{ row.self }}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</UContainer>
		</section>

		<section id="self-hosting" class="relative py-24">
			<div class="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-primary-500/5 to-transparent" />
			<UContainer class="relative z-10">
				<SiteSectionHeader
					badge="Self-Hosting"
					title="In vier Schritten zur eigenen Installation"
					description="Iventworks läuft als einzelner Docker-Container mit SQLite. Ein kleiner Server reicht für eine Organisation."
				/>

				<ol class="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
					<li
						v-for="(step, index) in selfHostSteps"
						:key="step.title"
						class="flex flex-col rounded-xl border border-slate-800 bg-slate-900/80 p-6"
					>
						<div class="mb-4 flex items-center gap-3">
							<span class="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-sm font-bold text-slate-950">
								{{ index + 1 }}
							</span>
							<UIcon :name="step.icon" class="text-xl text-primary-400" />
						</div>
						<h3 class="mb-2 text-lg font-semibold text-white">{{ step.title }}</h3>
						<p class="leading-relaxed text-slate-400">{{ step.description }}</p>
					</li>
				</ol>

				<div class="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
					<UButton to="/docs/self-hosting/installation" size="xl" color="neutral" variant="outline" class="justify-center px-8" icon="i-lucide-book-open">
						Installationsanleitung
					</UButton>
					<UButton :to="siteLinks.contactMail" size="xl" color="primary" class="justify-center px-8" icon="i-lucide-mail">
						Lieber die Cloud? Kontaktanfrage
					</UButton>
				</div>
			</UContainer>
		</section>
	</div>
</template>
