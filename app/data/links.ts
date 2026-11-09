/** Addresses used across the site, so they change in one place. */
export const supportEmail = "support@inventworks.de";

/** The phone number from the imprint (legal.leicraftmc.de/impressum). */
export const supportPhone = "+49 341 9625 8740";

export const siteLinks = {
	/** The Kontaktanfrage button: opens the visitor's mail program with a prepared subject. */
	contactMail: `mailto:${supportEmail}?subject=${encodeURIComponent("Kontaktanfrage Iventworks")}`,
	phone: `tel:${supportPhone.replaceAll(" ", "")}`,
	/** LeiCraft_MC, who runs Iventworks ("Ein Service von LeiCraft_MC" in the footer). */
	leicraft: "https://www.leicraft.de",
	/** The Iventworks Cloud (multi-org installation). */
	cloud: "https://app.iventworks.de",
	git: "https://git.leicraftmc.de/Iventworks",
	source: "https://git.leicraftmc.de/Iventworks/App",
	impressum: "https://legal.leicraftmc.de/impressum/",
	datenschutz: "https://legal.leicraftmc.de/datenschutz/",
} as const;
