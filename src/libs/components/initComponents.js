import * as componentsList from "./index.js";

const COMPONENTS_LIB = [
	{
		"radial-tab": componentsList.radialTab,
	},
	{
		"dropdown": componentsList.dropdown,
	},
	{
		"parallax": componentsList.parallaxAnimation,
	},
	{
		"layers": componentsList.layersAnimation,
	},
	{
		"stacked-sections": componentsList.stackedSectionsAnimation,
	},
	{
		"auto-scroll": componentsList.autoScroll,
	},
];
export default function initComponents(components = COMPONENTS_LIB) {
	if (!components || components.length === 0) return;

	components.forEach((component) => {
		Object.entries(component).forEach(([name, fn]) => {
			const componentsArray =
				document.querySelectorAll(`[data-component="${name}"]`) || null;

			if (componentsArray.length === 0)
				return console.warn(`Component ${name} not found`);

			componentsArray.forEach((component) => {
				fn(component);
			});
		});
	});
}

