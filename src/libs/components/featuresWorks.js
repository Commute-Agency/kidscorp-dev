export default function featuresWorks(component) {
    // const component = document.querySelector('[data-component="features-works"]');
  
    if (!component) return;
  
    const cover = component.querySelector('[data-component="cover"]');
    const imagesList = [...cover.children];
    const projectList = component.querySelector('[data-component="list"]');
    const projectListItems = [...projectList.children];
  
    const componentSize = component.offsetHeight;
    const coverSize = cover.offsetHeight;
  
    cover.style.setProperty("--size", `${coverSize}px`);
  
    projectListItems.forEach((item, index) => {
      item.onmouseenter = () => scrollToItem(index);
    });
  
    function scrollToItem(index) {
      const itemSize = componentSize / projectListItems.length;
      const targetOffset = index * itemSize;
      const targetPercentage = (targetOffset / componentSize) * 100;
  
      const ANIMATION = {
        duration: 0.5,
        ease: "power2",
      };
  
      gsap.to(imagesList, {
        yPercent: `-${100 * index}`,
        ease: ANIMATION.ease,
        duration: ANIMATION.duration,
      });
      gsap.to(cover, {
        "--percentage": targetPercentage,
        ease: ANIMATION.ease,
        duration: ANIMATION.duration,
      });
    }
  
    function followMouseY(event) {
      event.stopPropagation();
  
      const y = event.pageY - component.offsetTop;
      const max = componentSize - coverSize;
      const percent = (y / componentSize) * 100;
  
      // console.log({percent, y, max, event})
  
      gsap.set(cover, { "--percentage": percent });
    }
  
    // component.addEventListener('mousemove', followMouseY)
  }