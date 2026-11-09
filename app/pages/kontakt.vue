<script setup lang="ts">
import { siteLinks, supportEmail, supportPhone } from "~/data/links";

usePageSeo({
	title: "Kontakt – Iventworks",
	description: `Fragen zu Iventworks, zur Cloud oder zum Self-Hosting? Schreibt uns an ${supportEmail}.`,
});

const topics = [
	{
		icon: "i-lucide-cloud",
		title: "Iventworks Cloud",
		description: "Ihr möchtet Iventworks nutzen, ohne einen eigenen Server zu betreiben.",
	},
	{
		icon: "i-lucide-server",
		title: "Self-Hosting",
		description: "Ihr habt Fragen zur Installation auf eurem eigenen Server.",
	},
	{
		icon: "i-lucide-scale",
		title: "Datenschutz",
		description: "Ihr braucht Informationen für Vorstand oder Datenschutzbeauftragte.",
	},
	{
		icon: "i-lucide-life-buoy",
		title: "Support",
		description: "Etwas funktioniert nicht wie erwartet oder ihr habt eine Idee.",
	},
];
</script>

<template>
	<section
		class="relative overflow-hidden bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(232,121,249,0.15),transparent)] pt-20 pb-24 sm:pt-28"
	>
		<UContainer class="relative z-10">
			<div class="mx-auto max-w-3xl text-center">
				<UBadge color="primary" variant="soft" size="xl" class="mb-6">Kontakt</UBadge>
				<h1 class="mb-6 text-4xl leading-[1.1] font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
					Lasst uns
					<span class="bg-linear-to-tr from-primary-400 to-primary-200 bg-clip-text text-transparent">sprechen</span>
				</h1>
				<p class="mb-10 text-lg leading-[1.6] text-slate-400 sm:text-xl">
					Ihr wollt Iventworks für eure Organisation nutzen oder habt Fragen? Schickt uns eine
					Kontaktanfrage, wir melden uns so schnell wie möglich.
				</p>

				<UButton :to="siteLinks.contactMail" size="xl" color="primary" class="justify-center px-10" icon="i-lucide-mail">
					Kontaktanfrage senden
				</UButton>
				<p class="mt-4 text-slate-400">
					oder per E-Mail an
					<NuxtLink :to="siteLinks.contactMail" class="font-medium text-primary-400 hover:underline">{{ supportEmail }}</NuxtLink>
				</p>
				<p class="mt-1 text-slate-400">
					oder telefonisch unter
					<NuxtLink :to="siteLinks.phone" class="font-medium text-primary-400 hover:underline">{{ supportPhone }}</NuxtLink>
				</p>
			</div>

			<div class="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
				<div
					v-for="topic in topics"
					:key="topic.title"
					class="rounded-xl border border-slate-800 bg-slate-900/50 p-6"
				>
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500/10">
						<UIcon :name="topic.icon" class="text-xl text-primary-400" />
					</div>
					<h2 class="mb-2 text-lg font-semibold text-white">{{ topic.title }}</h2>
					<p class="text-sm leading-relaxed text-slate-400">{{ topic.description }}</p>
				</div>
			</div>
		</UContainer>
	</section>
</template>
