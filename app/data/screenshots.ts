/**
 * Screens shown in the laptop and phone frames (components/device/Showcase.vue). The files in
 * public/static/screenshots/ are empty placeholder PNGs: replace them with real screenshots of the
 * app at the same size (laptop 16:10, 1600 × 1000; phone 9:19.5, 900 × 1950) and adjust `alt`.
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

const laptop = (file: string, alt: string): Screenshot => ({
	src: `/static/screenshots/${file}`,
	alt,
	width: 1600,
	height: 1000,
});

const phone = (file: string, alt: string): Screenshot => ({
	src: `/static/screenshots/${file}`,
	alt,
	width: 900,
	height: 1950,
});

export const deviceScreens = {
	/** Landing page hero. */
	overview: {
		laptop: laptop("laptop-uebersicht.png", "Die persönliche Übersicht von Iventworks im Browser."),
		phone: phone("handy-programm.png", "Das Tagesprogramm einer Freizeit in der Iventworks-App."),
	},
	/** Features page. */
	event: {
		laptop: laptop("laptop-teilnehmende.png", "Die Teilnehmendenliste einer Freizeit in Iventworks."),
		phone: phone("handy-chat.png", "Der Team-Chat einer Freizeit in der Iventworks-App."),
	},
} satisfies Record<string, DeviceScreens>;
