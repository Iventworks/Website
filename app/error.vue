<script setup lang="ts">
import { de } from "@nuxt/ui/locale";
import type { NuxtError } from "#app";

const props = defineProps<{
	error: NuxtError;
}>();
</script>

<template>

    <NuxtRouteAnnouncer />
	
    <UApp :locale="de">

        <div class="app-layout main-bg-color">

            <LayoutHeader />

            <UMain class="py-8 main-content">
                <UContainer>
                    <UError :error="props.error" />
                </UContainer>
            </UMain>

            <LayoutFooter />

        </div>

    </UApp>

</template>

<style scoped>
.app-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.main-content {
    flex: 1;
}
</style>
