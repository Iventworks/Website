// Static site + docs (nuxt generate). Nuxt 4 (app/ srcDir is the default).
export default defineNuxtConfig({
	compatibilityDate: "2026-09-01",
	devtools: { enabled: true },
	modules: ["@nuxt/ui", "@nuxt/content"],

	app: {
		head: {
			htmlAttrs: {
				lang: "de-DE",
			},
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
			meta: [
				{ name: "author", content: "Iventworks" },
				{ name: "robots", content: "index, follow, max-image-preview:large" },
				{ name: "theme-color", content: "#020617" },
				{
					name: "keywords",
					content:
						"Iventworks, Freizeitplanung, Eventplanung, Jugendfreizeit, Ferienlager, Teilnehmerverwaltung, Ehrenamt, DSGVO, Self-Hosting",
				},
				{ property: "og:type", content: "website" },
				{ property: "og:site_name", content: "Iventworks" },
				{ property: "og:locale", content: "de_DE" },
				{ name: "twitter:card", content: "summary_large_image" },
			],
			link: [
				{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
				{ rel: "icon", type: "image/svg+xml", href: "/static/logo/favicon.svg" },
				{ rel: "apple-touch-icon", href: "/static/logo/apple-touch-icon.png" },
			],
		},
	},

	colorMode: {
		preference: "dark",
		fallback: "dark",
		classSuffix: "",
	},

	ssr: true,

	css: ["~/assets/css/main.css"],

	runtimeConfig: {
		public: {
			// Public site origin; `usePageSeo` resolves canonical and og:url against it.
			appUrl: "https://www.iventworks.de",
		},
	},

	// Bundle every icon at build time; "none" never fetches from the Iconify API at runtime.
	// The scan also covers `.ts` files (e.g. `app/data/`), which the default patterns skip.
	icon: {
		provider: "none",
		clientBundle: {
			scan: {
				globInclude: ["app/**/*.{vue,ts}", "content/**/*.md"],
			},
		},
	},

	// Nuxt Content's default languages plus the ones the self-hosting docs use (.env files).
	content: {
		build: {
			markdown: {
				highlight: {
					langs: [
						"js",
						"json",
						"ts",
						"vue",
						"css",
						"html",
						"bash",
						"md",
						"mdc",
						"yaml",
						"ini",
						"dotenv",
					],
				},
			},
		},
	},

	routeRules: {
		"/__nuxt_content/**": { prerender: false },
	},

	nitro: {
		preset: "static",
		prerender: {
			crawlLinks: true,
			routes: ["/"],
			ignore: ["/__nuxt_content/**"],
			failOnError: true,
		},
	},

	telemetry: false,
});
