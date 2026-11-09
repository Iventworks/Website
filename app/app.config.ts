import { codeIcons } from "./data/code-icons";

export default defineAppConfig({
	ui: {
		colors: {
			// The Iventworks app's default org colour.
			primary: "fuchsia",
			neutral: "slate",
		},
		prose: {
			codeIcon: codeIcons,
		},
	},
	theme: {
		radius: 0.5,
		blackAsPrimary: false,
	},
});
