export default function pageIndex() {
    const component = document.querySelector(['[data-component="page-index"]']);
  
    if (!component) return;
  
    const navMenu = component.querySelector(".index-navbar_menu");
    const indexLinks = Array.from(component.querySelectorAll("a"));
    const footer = document.querySelector("footer");
    const pageScroll = component.querySelector(".index-navbar_scroll");
    const scrollIcon = pageScroll.querySelector("svg");
    const scrollPath = scrollIcon.querySelector(".index-navbar_scroll-path");
    const pathTotalLength = Math.round(scrollPath.getTotalLength());
  
    const setUpStrokeLength = (length) => {
      gsap.set(scrollPath, {
        "--stroke-dasharray": length,
        "--stroke-dashoffset": length,
      });
    };
  
    const drawStroke = (draw) => {
      gsap.set(scrollPath, {
        "--stroke-dashoffset": draw,
      });
    };
  
    const createScrollTrigger = () => {
      const startScroll = window.innerHeight;
  
      ScrollTrigger.create({
        // trigger: component,
        start: `${startScroll} top`,
        end: `bottom bottom`,
        onEnter: () => {
          component.dataset.fixed = true;
        },
        onUpdate: (self) => {
          const pathProgress = pathTotalLength * (1 - self.progress);
  
          drawStroke(pathProgress);
        },
        onLeaveBack: () => {
          component.dataset.fixed = false;
        },
      });
    };
  
    const classObserver = new MutationObserver((mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          const scrollLeft =
            mutation.target.offsetLeft +
            mutation.target.clientWidth -
            navMenu.offsetLeft;
  
          // console.log({
          // 	scrollLeft,
          // 	target: mutation.target,
          // });
          navMenu.scroll(scrollLeft, 0);
        }
      }
    });
  
    const observeLinkActive = () => {
      indexLinks.forEach((link) => {
        classObserver.observe(link, { attributes: true });
      });
    };
  
    const setUp = () => {
      setUpStrokeLength(pathTotalLength);
      createScrollTrigger();
      observeLinkActive();
    };
  
    const init = () => {
      setUp();
    };
  
    init();
  }