<script setup lang="ts">
import { de } from "@nuxt/ui/locale";
</script>

<template>
	<NuxtRouteAnnouncer />
	<!-- German texts for Nuxt UI's own labels (menus, slideovers, error page). -->
	<UApp :locale="de">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</UApp>
</template>
