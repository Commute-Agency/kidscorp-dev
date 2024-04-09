export default function followMouseList(component) {
    if (!component) return;
  
    const projectList = component.querySelector('[data-component="list"]');
    const projectListItems = [...projectList.children];
    const cover = component.querySelector('[data-component="cover"]');
    const coverList = component.querySelector('[data-component="cover-list"]');
    const coverSize = cover.clientHeight;
  
    const ANIMATION = {
      duration: 0.5,
      ease: "power2",
    };
  
    function coverFollowYAxis(cover) {
      if (!cover || !projectListItems.length) return;
  
      const baseTop = projectList.offsetTop;
      const coverCenter = cover.clientHeight / 2;
  
      function setImageFromIndex(index) {
        if (!coverList) return;
  
        const childHeight = coverList.children[0].clientHeight;
        const y = index * childHeight;
  
        gsap.to(coverList, {
          y: `-${y}`,
          ease: ANIMATION.ease,
          duration: ANIMATION.duration,
        });
      }
  
      function followMouse(listItem) {
        const centerY =
          listItem.offsetTop - baseTop + listItem.offsetHeight / 2 - coverCenter;
  
        gsap.to(cover, {
          y: `${centerY}`,
          ease: ANIMATION.ease,
          duration: ANIMATION.duration,
        });
      }
  
      projectListItems.forEach((listItem, index) => {
        const handleMouseEnter = () => {
          followMouse(listItem);
          // scrollToItem(index);
          setImageFromIndex(index);
        };
  
        listItem.addEventListener("mouseenter", handleMouseEnter);
      });
  
      function coverFollowMouse(event) {
        event.preventDefault();
        if (!cover) return;
  
        const marginX = cover.clientWidth * 0.2;
        const marginY = cover.clientHeight * 0.2;
  
        const x = event.clientX / marginX;
        const y = event.clientY / marginY;
  
        gsap.to(cover, {
          x,
          y,
          duration: 0.4,
          ease: "power2",
        });
      }
    }
  
    function setHoverEvents() {
      projectListItems.forEach((item) => {
        item.onmouseenter = () => {
          projectListItems.forEach((item) => {
            item.classList.remove("is-active");
          });
          item.classList.add("is-active");
        };
      });
    }
  
    function setUp() {
      coverFollowYAxis(cover);
      setHoverEvents();
    }
  
    function init() {
      setUp();
    }
  
    init();
  }