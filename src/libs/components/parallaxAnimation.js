import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

export default function parallaxAnimation(component) {
	const parallaxChildren = [... component.querySelectorAll("[data-parallax-speed]")];

	console.log({component, parallaxChildren});

	if (!component || parallaxChildren.length === 0 || component.length === 0)
		return;

	function animateParallax() {
		const tl = gsap.timeline();
		
		parallaxChildren.forEach((item) => {
			tl.from(item, {
				y: (i, target) =>
					component.clientHeight * target.dataset.parallaxSpeed,
				ease: "none",
			}, 'initial');
		});	
		return tl
	}

	function setUp() {
		ScrollTrigger.create({
			trigger: component,
			start: "top-=50% bottom",
			end: "bottom+=50% bottom",
			scrub: 1,
			animation: animateParallax()
		})
	}

	function init() {
		setUp();
		animateParallax()
	}

	init();
}
