import { parallaxAnimation } from "./index.js";

export default function stackedSectionsAnimation(component) {
	const sectionsArray = [
		...component.querySelectorAll('[data-component="parallax"]'),
	];

	if (!component || sectionsArray.length === 0) return;

	const tl = gsap.timeline();

	function stackSections() {
		component.style.setProperty("--num-sections", sectionsArray.length);
		gsap.set(component, {
			display: "grid",
			gridTemplateColumns: "1fr",
		});
		gsap.set(sectionsArray, {
			opacity: 0,
			gridArea: "1/1",
			position: "sticky",
			top: 0,
		});
	}

	async function animateSections() {
		sectionsArray.forEach((section, index, array) => {
			const isFirstSection = index === 0;
			const isLastSection = index === array.length - 1;

			const startOffset = index * section.clientHeight;
			const endOffset = startOffset + section.clientHeight;

			// Timeline
			const animation = gsap.timeline();

			animation
				.to(section, {
					opacity: 1,
				})
				.to(section, {
					opacity: isLastSection ? 1 : 0,
				});

			tl.add(animation);
		});

		ScrollTrigger.create({
			trigger: component,
			start: `top center`,
			end: `bottom center`,
			// markers: true,
			scrub: 1,
			animation: tl,
		});
	}

	function setUp() {
		stackSections();
		animateSections();
	}

	function init() {
		setUp();
	}

	setTimeout(() => {
		init();
	}, 500);
}
