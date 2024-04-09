import * as componentsList from "./index.js";

const COMPONENTS_LIB = [
	{
		"auto-scroll": componentsList.autoScroll,
	},
	{
		"follow-mouse-list": componentsList.followMouseList,
	},
	{
		"features-works": componentsList.featuresWorks,
	},
	{
		"infinite-slider": componentsList.infiniteSlider,
	},
	{
		"nav-menu": componentsList.navMenu,
	},
	{
		"page-index": componentsList.pageIndex,
	},
	{
		"project-approach": componentsList.projectApproach,
	},
	{
		"pricing-card": componentsList.pricingForm,
	},
	{
		"contact-form": componentsList.contactForm,
	},
	{
		"copy-to-clipboard": componentsList.copyToClipboard,
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

