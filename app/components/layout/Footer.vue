<script setup lang="ts">
/**
 * Footer built exactly like the LeiOS Hub footer (git.leicraftmc.de/LeiOS/Hub-Website): brand text
 * and icon buttons in the left half, three columns of short links in the right half.
 */
import type { FooterColumn } from "@nuxt/ui";
import { siteLinks, supportEmail, supportPhone } from "~/data/links";

const socialLinks = [
	{ icon: "i-lucide-mail", to: siteLinks.contactMail, label: `E-Mail an ${supportEmail}` },
	{ icon: "i-lucide-phone", to: siteLinks.phone, label: `Anrufen: ${supportPhone}` },
	{ icon: "i-lucide-gitlab", to: siteLinks.git, label: "Quellcode auf GitLab", target: "_blank" },
];

const footerColumns: FooterColumn[] = [
	{
		label: "Produkt",
		children: [
			{ label: "Funktionen", to: "/funktionen" },
			{ label: "Sicherheit", to: "/sicherheit" },
			{ label: "Hosting", to: "/hosting" },
			{ label: "Cloud", to: siteLinks.cloud, target: "_blank" },
		],
	},
	{
		label: "Hilfe",
		children: [
			{ label: "Doku", to: "/docs" },
			{ label: "FAQ", to: "/docs/faq" },
			{ label: "Kontakt", to: "/kontakt" },
			{ label: "Quellcode", to: siteLinks.source, target: "_blank" },
		],
	},
	{
		label: "Rechtliches",
		children: [
			{ label: "Impressum", to: siteLinks.impressum, target: "_blank" },
			{ label: "Datenschutz", to: siteLinks.datenschutz, target: "_blank" },
		],
	},
];

const currentYear = new Date().getFullYear();
</script>

<template>
	<USeparator />
	<UFooter
		:ui="{
			root: 'py-12',
			container: 'py-0 lg:py-0 lg:gap-x-0 gap-x-0 lg:block',
			bottom: 'p-0 lg:p-0 mt-8',
		}"
	>
		<UFooterColumns
			:columns="footerColumns"
			:ui="{
				root: 'grid gap-8 sm:grid-cols-2 xl:grid-cols-2 w-full',
				center: 'xl:col-span-1 grid',
				label: 'text-slate-100 font-semibold text-base',
				link: 'text-slate-400 hover:text-primary text-sm sm:text-base inline-block py-1 transition-colors',
				left: 'mb-0',
			}"
		>
			<template #left>
				<div class="space-y-4">
					<span
						class="inline-block bg-linear-to-tr from-primary-400 to-primary-200 bg-clip-text text-2xl font-bold text-transparent"
					>
						Iventworks
					</span>
					<p class="text-base leading-relaxed text-slate-300/80 md:max-w-3xl">
						Freizeiten und Events gemeinsam planen: Teilnehmende, Programm, Team, Dokumente und
						Finanzen an einem Ort. Gehostet in Deutschland oder auf eurem eigenen Server.
					</p>
					<div class="flex gap-2 pt-2">
						<UButton
							v-for="social in socialLinks"
							:key="social.label"
							:to="social.to"
							:target="social.target"
							:icon="social.icon"
							color="neutral"
							variant="ghost"
							size="lg"
							:aria-label="social.label"
							class="transition-transform hover:scale-110 hover:text-primary"
						/>
					</div>
				</div>
			</template>
		</UFooterColumns>

		<template #bottom>
			<UContainer>
				<div
					class="flex flex-col items-center border-t border-slate-800 pt-8 text-center md:flex-row md:justify-between md:text-left"
				>
					<p class="text-xs text-slate-500 sm:text-sm">
						&copy; {{ currentYear }} Iventworks. Open Source unter der AGPL-3.0-Lizenz.
					</p>
					<NuxtLink
						:to="siteLinks.leicraft"
						target="_blank"
						class="text-xs text-slate-500 transition-colors hover:text-primary-400 sm:text-sm"
					>
						Ein Service von <span class="font-medium text-slate-300">LeiCraft_MC</span>
					</NuxtLink>
				</div>
			</UContainer>
		</template>
	</UFooter>
</template>
