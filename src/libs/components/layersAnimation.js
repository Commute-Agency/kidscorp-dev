export default function layersAnimation(component) {
	if (!component) return;

	const layersChildren = [...component.querySelectorAll("[data-layer]")];

    // let mm = gsap.matchMedia();
	const tl = gsap.timeline({ defaults: {ease: "back.out(1.7)" } });


	function animateLayers() {

		const ROTATION_PROPS = {
			rotateX: 0,
			rotateY: 0,
			rotateZ: 0,
		};

		tl.from(component, {
			...ROTATION_PROPS,
		}).to(layersChildren, {
			translateZ: (i) => i * 50,
			stagger: 0.05,
		});

		ScrollTrigger.create({
			trigger: component,
			start: "top-=50% center",
			end: "bottom+=50% center",
            // markers: true,

			onLeave: () => tl.reverse(),
			onEnterBack: () => tl.play(),
			onLeaveBack: () => tl.reverse(),
			onEnter: () => tl.play(),

			animation: tl,
		});

		return tl;
	}

	function handleHover({ type, clientX, clientY}) {
		const animation = tl;
		
        const EVENT_TYPE = {
			mouseenter: () => 
                animation.reverse(),
			mouseleave: () => animation.play(),
			mousemove: () => {
                const {left, top, width, height} = component.getBoundingClientRect()
                const yPos = ((clientX - left) / width) * 2  - 1
                const xPos = ((clientY - top) / height) * 2  - 1;

                const DEGREE_DEVIATION = 25

                const animationEnd = animation.totalProgress() === 0 ? true : false;

                if(animationEnd) {
                    gsap.to(component, {
                        rotateX: xPos * -DEGREE_DEVIATION,
                        rotateY: yPos * DEGREE_DEVIATION
                    })
                }
                
            },
		};

		EVENT_TYPE[type]() || EVENT_TYPE['mouseleave']();
	}

	function setUp() {
        animateLayers();
        component.onmouseenter = handleHover;
        component.onmouseleave = handleHover;
        component.onmousemove = handleHover;
	}
	function init() {
		setUp();
	}

	init();
}
