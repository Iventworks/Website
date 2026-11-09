<script setup lang="ts">
/**
 * Laptop + phone mockup for the page heroes, built exactly like the DeviceShowcase of the Delivr
 * website (github.com/Delivr-Project/Website). Shows the screenshots from app/data/screenshots.ts.
 * Sizes are relative (%, cqw) so the composition scales with its container.
 */
import type { DeviceScreens } from "~/data/screenshots";

const { screens } = defineProps<{
	screens: DeviceScreens;
}>();
</script>

<template>
	<div class="relative mx-auto w-full max-w-5xl pr-[2%] pb-[5%]">
		<div
			class="pointer-events-none absolute inset-x-[8%] top-[8%] bottom-0 rounded-full bg-primary-500/20 blur-3xl"
			aria-hidden="true"
		></div>

		<!-- Laptop -->
		<div class="relative w-[88%]">
			<div
				class="rounded-t-[1.1rem] border border-slate-700/80 bg-slate-900 p-[1.6%] pb-[2%] shadow-2xl shadow-primary-950/60"
			>
				<div class="@container relative aspect-[16/10] overflow-hidden rounded-[0.3rem] bg-black ring-1 ring-slate-800">
					<img
						:src="screens.laptop.src"
						:alt="screens.laptop.alt"
						:width="screens.laptop.width"
						:height="screens.laptop.height"
						class="h-full w-full object-cover object-top"
						loading="eager"
						fetchpriority="high"
					/>
				</div>
			</div>
			<!-- Base -->
			<div
				class="relative -mx-[6%] h-[0.7rem] rounded-b-[1.2rem] border-t border-slate-500/60 bg-linear-to-b from-slate-600 to-slate-800 shadow-xl sm:h-4"
				aria-hidden="true"
			>
				<div class="absolute top-0 left-1/2 h-1/2 w-[14%] -translate-x-1/2 rounded-b-md bg-slate-900/70"></div>
			</div>
		</div>

		<!-- Phone -->
		<div class="@container absolute right-0 bottom-0 w-[23%] max-w-60">
			<div class="rounded-[16cqw] border border-slate-600 bg-slate-950 p-[4cqw] shadow-2xl shadow-black ring-4 ring-black">
				<div class="@container relative aspect-[9/19.5] overflow-hidden rounded-[12cqw] bg-black">
					<div
						class="absolute top-[2%] left-1/2 z-10 h-[3.2%] w-[32%] -translate-x-1/2 rounded-full bg-slate-900"
						aria-hidden="true"
					></div>
					<img
						:src="screens.phone.src"
						:alt="screens.phone.alt"
						:width="screens.phone.width"
						:height="screens.phone.height"
						class="h-full w-full object-cover object-top"
						loading="eager"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
