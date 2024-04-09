export default function infiniteSlider(component) {
    if (!component) return;
  
    const container = component.querySelector(
      '[data-component="infinite-slider-container"]'
    );
    let xPercent = 0;
    let direction = 0;
    let velocity = 0.08;
  
    const createScrollTrigger = () => {
      ScrollTrigger.create({
        trigger: component,
        start: `top-=${window.innerHeight} center`,
        end: `bottom+=${window.innerHeight} center`,
        onUpdate: (e) => {
          direction = e.direction * -1;
          // xPercent += xPercent * 0.009 * -direction;
        },
      });
    };
  
    const animate = () => {
      if (xPercent > 0) {
        xPercent = -100;
      } else if (xPercent < -100) {
        xPercent = 0;
      }
  
      gsap.set(container.children, { xPercent: xPercent });
  
      requestAnimationFrame(animate);
      xPercent += velocity * direction;
    };
  
    const init = () => {
      createScrollTrigger();
      requestAnimationFrame(animate);
    };
  
    init();
  }