export default function stackedSectionsAnimation(component) {
	const sectionsArray = [... component.querySelectorAll('[data-component="parallax"]')];

	if (!component || sectionsArray.length === 0 ) return;

	const tl = gsap.timeline()

	function stackSections() {
		gsap.set(sectionsArray, {
			yPercent: (i) => i * -100,
			opacity: (i) => i === 0 ? 1:  0,
			position: 'sticky',
			top: 0,
		})
	}

	function animateSections() {
		sectionsArray.forEach((section, index) => {
			tl.to(section, {
				opacity: index == 0 ? 0 : 1,
				duration: 1,
				scrollTrigger: {
					trigger: section,
					start: "top center",
					end: "bottom center",
					markers: true,
					// toggleActions
					// onEnter: () => tl.play(),
					// onLeave: () => tl.reverse(),
					// onEnterBack: () => tl.play(),
					// onLeaveBack: () => tl.reverse(),
				}
			})
		})
		
	}

	function handleScroll() {

		ScrollTrigger.create({
			trigger: component,
			start: "top center",
			end: "bottom center",
			markers: true,
			animation: animateSections()
		})
	}
	

	function setUp() {
		// handleScroll()
		// stackSections()
	}

	function init() {
		setUp();
	}

	init();
}
