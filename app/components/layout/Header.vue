<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { siteLinks } from "~/data/links";

const route = useRoute();

const links = computed<NavigationMenuItem[]>(() => [
	{
		label: "Funktionen",
		to: "/funktionen",
	},
	{
		label: "Sicherheit & Datenschutz",
		to: "/sicherheit",
	},
	{
		label: "Cloud & Self-Hosting",
		to: "/hosting",
	},
	{
		label: "Dokumentation",
		to: "/docs",
		active: route.path.startsWith("/docs"),
	},
	{
		label: "Kontakt",
		to: "/kontakt",
	},
]);

const socialLinks = [{ icon: "i-lucide-gitlab", to: siteLinks.git, label: "Quellcode auf GitLab" }];

const mobileLinks = computed<NavigationMenuItem[][]>(() => [
	links.value,
	[
		{
			label: "Kontaktanfrage",
			to: siteLinks.contactMail,
			icon: "i-lucide-mail",
		},
		...socialLinks.map((social) => ({
			label: social.label,
			to: social.to,
			target: "_blank",
			icon: social.icon,
		})),
	],
]);
</script>

<template>
	<!-- The title is only a logo, so `title` gives UHeader's home link its accessible name. -->
	<UHeader title="Iventworks" class="backdrop-blur-xl">
		<template #title>
			<ImgIventworksLogo />
		</template>

		<UNavigationMenu :items="[links]" />

		<template #body>
			<UNavigationMenu :items="mobileLinks" orientation="vertical" class="w-full" />
		</template>

		<template #right>
			<div class="hidden items-center gap-2 lg:flex">
				<UButton
					v-for="social in socialLinks"
					:key="social.label"
					:to="social.to"
					target="_blank"
					:icon="social.icon"
					color="neutral"
					variant="ghost"
					size="lg"
					:aria-label="social.label"
					class="transition-transform duration-200 hover:scale-110"
				/>
			</div>
			<UButton
				:to="siteLinks.contactMail"
				color="primary"
				variant="solid"
				icon="i-lucide-mail"
				class="hidden font-medium sm:inline-flex"
			>
				Kontaktanfrage
			</UButton>
		</template>
	</UHeader>
</template>
