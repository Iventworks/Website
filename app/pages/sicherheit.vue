<script setup lang="ts">
import { siteLinks } from "~/data/links";
import { trustPillars } from "~/data/site";

usePageSeo({
	title: "Sicherheit & Datenschutz – Iventworks",
	description:
		"Sicherheit zuerst, DSGVO-konform, verschlüsselte Backups und Hosting in Deutschland: so schützt Iventworks die Daten eurer Freizeiten.",
	ogImage: "https://www.iventworks.de/static/og/iventworks.png",
});

const details = [
	{
		id: "sicherheit-zuerst",
		icon: "i-lucide-shield-check",
		title: "Sicherheit zuerst",
		points: [
			"Strikte Trennung der Organisationen in drei Ebenen: jede Abfrage ist auf die eigene Organisation beschränkt, eine Datenbank-Schutzschicht blockiert jeden Zugriff ohne diese Einschränkung, und Anmeldungen gelten nur in der eigenen Organisation.",
			"Automatische Tests prüfen jede Funktion der API darauf, dass keine Organisation die Daten einer anderen lesen oder ändern kann.",
			"Passwörter werden mit Argon2 gehasht, Anmeldeversuche sind begrenzt, und fehlgeschlagene Logins verraten nicht, ob ein Benutzername existiert.",
			"Content-Security-Policy ohne unsichere Inline-Skripte, HSTS und weitere Sicherheits-Header bei jeder Antwort.",
			"Berechtigungen werden auf dem Server geprüft, nicht nur in der Oberfläche.",
		],
	},
	{
		id: "dsgvo",
		icon: "i-lucide-scale",
		title: "DSGVO-konform",
		points: [
			"Gesundheitsdaten wie Allergien und Medikamente sieht nur das Team der jeweiligen Freizeit, selbst das Kernteam nur bei Freizeiten, in deren Team es ist.",
			"Keine Tracker, keine Werbung, keine Analyse-Dienste. Icons und Schriften werden vom eigenen Server geladen.",
			"Zugang nur auf Einladung, mit klaren Rollen und Rechten.",
			"Audit-Log: wichtige Änderungen sind nachvollziehbar.",
			"Benutzer können ihr Konto selbst löschen.",
			"Freigabelinks für Externe mit Passwort und Ablaufdatum, von Admins zentral einsehbar und abschaltbar.",
		],
	},
	{
		id: "backups",
		icon: "i-lucide-database-backup",
		title: "Backups",
		points: [
			"Automatische Backups von Datenbank und hochgeladenen Dateien nach Zeitplan, in der Cloud täglich.",
			"Jedes Backup ist mit AES-256-GCM verschlüsselt, mit einem eigenen Schlüssel pro Backup.",
			"Optional zusätzlich in einem externen S3-kompatiblen Speicher.",
			"Aufbewahrungsregeln löschen alte Backups automatisch, die neuesten bleiben immer erhalten.",
			"Backups lassen sich vor der Wiederherstellung auf Unversehrtheit prüfen.",
		],
	},
	{
		id: "gehostet-in-deutschland",
		icon: "i-lucide-map-pin",
		title: "Gehostet in Deutschland",
		points: [
			"Die Iventworks Cloud wird in Deutschland gehostet und betrieben.",
			"Iventworks wird in Deutschland entwickelt.",
			"Alternativ betreibt ihr Iventworks auf eurem eigenen Server, in eurem Rechenzentrum oder bei einem Hoster eurer Wahl.",
		],
	},
];
</script>

<template>
	<div>
		<section
			class="relative overflow-hidden bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(232,121,249,0.15),transparent)] pt-20 pb-20 sm:pt-28"
		>
			<UContainer class="relative z-10">
				<div class="mx-auto max-w-3xl text-center">
					<UBadge color="primary" variant="soft" size="xl" class="mb-6 inline-flex items-center gap-1">
						<UIcon name="i-lucide-shield-check" />
						Sicherheit & Datenschutz
					</UBadge>
					<h1 class="mb-6 text-4xl leading-[1.1] font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
						Sicherheit an
						<span class="bg-linear-to-tr from-primary-400 to-primary-200 bg-clip-text text-transparent">erster Stelle</span>
					</h1>
					<p class="text-lg leading-[1.6] text-slate-400 sm:text-xl">
						Eltern vertrauen euch ihre Kinder an, und mit ihnen Adressen, Notfallkontakte und
						Gesundheitsdaten. Iventworks ist von Grund auf dafür gebaut, diese Daten zu schützen.
					</p>
				</div>

				<div class="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
					<a
						v-for="pillar in trustPillars"
						:key="pillar.title"
						:href="`#${details.find((detail) => detail.title === pillar.title)?.id ?? ''}`"
						class="group flex flex-col rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition hover:border-primary-400/50"
					>
						<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500/10">
							<UIcon :name="pillar.icon" class="text-xl text-primary-400" />
						</div>
						<h2 class="mb-2 text-lg font-semibold text-white group-hover:text-primary-400">{{ pillar.title }}</h2>
						<p class="leading-relaxed text-slate-400">{{ pillar.description }}</p>
					</a>
				</div>
			</UContainer>
		</section>

		<section class="bg-slate-950/50 py-24">
			<UContainer>
				<SiteSectionHeader badge="Im Detail" title="Wie Iventworks eure Daten schützt" />

				<div class="mx-auto max-w-4xl space-y-6">
					<div
						v-for="detail in details"
						:id="detail.id"
						:key="detail.id"
						class="scroll-mt-24 rounded-xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8"
					>
						<div class="mb-5 flex items-center gap-3">
							<div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-500/10">
								<UIcon :name="detail.icon" class="text-xl text-primary-400" />
							</div>
							<h3 class="text-2xl font-semibold text-white">{{ detail.title }}</h3>
						</div>
						<ul class="space-y-3">
							<li v-for="point in detail.points" :key="point" class="flex items-start gap-3 leading-relaxed text-slate-300">
								<UIcon name="i-lucide-check" class="mt-1 shrink-0 text-primary-400" />
								{{ point }}
							</li>
						</ul>
					</div>
				</div>

				<div class="mx-auto mt-12 max-w-4xl rounded-xl border border-primary-500/30 bg-primary-500/5 p-6 text-center sm:p-8">
					<h3 class="mb-2 text-xl font-semibold text-white">Fragen zu Datenschutz oder Sicherheit?</h3>
					<p class="mb-6 text-slate-400">
						Wir beantworten gern eure Fragen, auch für die Abstimmung mit eurem Vorstand oder
						Datenschutzbeauftragten.
					</p>
					<div class="flex flex-col justify-center gap-4 sm:flex-row">
						<UButton :to="siteLinks.contactMail" size="lg" color="primary" class="justify-center" icon="i-lucide-mail">
							Kontaktanfrage
						</UButton>
						<UButton to="/docs/self-hosting/sicherheit" size="lg" color="neutral" variant="outline" class="justify-center" icon="i-lucide-book-open">
							Technische Details
						</UButton>
					</div>
				</div>
			</UContainer>
		</section>
	</div>
</template>
