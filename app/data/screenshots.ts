/**
 * Screens shown in the laptop and phone frames (components/device/Showcase.vue). Files live in
 * public/static/screenshots/. Laptop screenshots are 16:10 (e.g. 2560 × 1600), phone screenshots
 * about 9:19.5; the frames crop from the top if the ratio differs slightly.
 */
export interface Screenshot {
	src: string;
	alt: string;
	width: number;
	height: number;
}

export interface DeviceScreens {
	laptop: Screenshot;
	phone: Screenshot;
}

/** The overview of an event ("Sommercamp 2027") in the app, on a laptop and on a phone. */
const eventOverview: DeviceScreens = {
	laptop: {
		src: "/static/screenshots/laptop-freizeit.webp",
		alt: "Iventworks im Browser: die Übersicht der Freizeit „Sommercamp 2027“ mit Teilnehmenden, Team, offenen Aufgaben und Ausgaben, dem nächsten Programm, Neuigkeiten und der Seitenleiste mit allen Bereichen der Freizeit.",
		width: 2560,
		height: 1600,
	},
	phone: {
		src: "/static/screenshots/handy-freizeit.webp",
		alt: "Iventworks auf dem Handy: dieselbe Übersicht des „Sommercamp 2027“ mit Kennzahlen und dem Programm, in dem die eigenen Programmpunkte mit „Du bist zuständig“ markiert sind.",
		width: 891,
		height: 1977,
	},
};

export const deviceScreens = {
	/** Landing page hero. */
	overview: eventOverview,
	/** Features page. */
	event: eventOverview,
} satisfies Record<string, DeviceScreens>;
