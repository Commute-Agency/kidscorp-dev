export default function projectApproach() {
    const component = document.querySelector(
      '[data-component="project-approach"]'
    );
  
    if (!component) return;
  
    const approachList = component.querySelector(".approach-list-container ul");
    const approachListItems = [...approachList.children];
    const masterTimeline = gsap.timeline();
    const fullPageImage = component.querySelector(".fullpage_image");
  
    function setListItems() {
      approachListItems.forEach((item, index, array) => {
        const animation = gsap.timeline();
        // const animation = gsap.timeline({ paused: true });
        const itemTop = (component.clientHeight / array.length) * index;
        // const itemBottom = itemTop + component.clientHeight / array.length;
  
        const initialSettings = {
          opacity: 0.5,
          scale: 0.95,
        };
  
        gsap.set(item, {
          ...initialSettings,
        });
  
        animation
          .fromTo(
            item,
            {
              ...initialSettings,
            },
            {
              scale: 1,
              opacity: 1,
            }
          )
          .to(item, {
            ...initialSettings,
          });
  
        masterTimeline.add(animation);
      });
    }
  
    function setScrollTrigger() {
      ScrollTrigger.create({
        trigger: component,
        start: `top top`,
        end: `bottom top`,
        animation: masterTimeline,
        scrub: true,
        // markers: true,
      });
    }
  
    function setUp() {
      setListItems();
      fullPageImage.onload = setScrollTrigger;
    }
  
    function init() {
      setUp();
    }
  
    init();
  }