import { parallaxAnimation } from "./index.js";

export default function stackedSectionsAnimation(component) {
	const sectionsArray = [
		...component.querySelectorAll('[data-component="parallax"]'),
	];

	if (!component || sectionsArray.length === 0) return;

	const tl = gsap.timeline();

	function stackSections() {
		component.style.setProperty("--num-sections", sectionsArray.length);
		gsap.set(sectionsArray, { opacity: 0 });
	}

	async function animateSections() {
		sectionsArray.forEach((section, index, array) => {
			const startOffset = index * section.clientHeight;
			const endOffset = startOffset + section.clientHeight;

			// Elements
			const background = section.querySelector(".background_container");
			const device = section.querySelector(".experiences_image-container");
			const content = [
				...section.querySelectorAll(".experiences_content-wrapper *"),
			];

			// Timeline
			const animation = gsap.timeline({
				defaults: {
					// duration: 0.5,
					// ease: "power3.out",
				},
			});

			// animation
			// 	// .from(background, {
			// 	// 	opacity: 0,
			// 	// 	duration: 0
			// 	// })
			// 	.to(section, {
			// 		opacity: 1,
			// 	},'start')
			// 	.from(device, {
			// 		opacity: 0,
			// 	},'start')
			// 	.from(content, {
			// 		opacity: 0,
			// 		yPercent: 20,
			// 		stagger: 0.1,
			// 	},'start')
			// 	.to(content, {
			// 		opacity: 0,
			// 		yPercent: 20,
			// 		duration: 0.2
			// 	},'end')
			// 	.to(device, {
			// 		opacity: 0,
			// 		duration: 0
			// 	},'end')
			// 	.to(background, {
			// 		opacity: 0,
			// 		duration: 0
			// 	},'end')
			// 	// .to(section, {
			// 	// 	opacity: 0,
			// 	// })

			animation
				.to(section, {
					opacity: 1,
				})
				.to(section, {
					opacity: (i) => {
						const isLastSection = index === array.length - 1;

						console.log({isLastSection, i})
						return isLastSection ? 1 : 0;
					},
				});

			// animation.fromTo(background, {
			// 	opacity: 1
			// }, {
			// 	opacity: 0
			// })

			ScrollTrigger.create({
				trigger: component,
				start: `top+=${startOffset} bottom`,
				end: `top+=${endOffset} bottom`,
				// markers: true,
				scrub: 1,
				animation: animation,

				// onEnter: () => gsap.set(section, { opacity: 1 }),
				// onLeave: () => gsap.set(section, { opacity: 0 }),
				// onEnterBack: () => gsap.set(section, { opacity: 1 }),
				// onLeaveBack: () => gsap.set(section, { opacity: 0 }),

				toggleActions: "play reverse play reverse",
				// scrub: true,
			});

			tl.add(animation, index);
		});
	}

	function setUp() {
		stackSections();
		animateSections();
	}

	function init() {
		setUp();
	}

	init();
}
