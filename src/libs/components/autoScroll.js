export default function autoScroll(component) {
    if (!component) return;
  
    const dragToScrollX = (element, cleanup) => {
      if (!element) return;
  
      let mouseDown = false;
      let startX,
        scrollLeft = 0;
      const slider = element;
  
      if (cleanup) {
        return () =>
          Object.entries(events).forEach(([event, handler]) => {
            slider.removeEventListener(event, handler, false);
          });
      }
  
      const handleDown = (e) => {
        e.stopPropagation();
        mouseDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      };
  
      const handleUp = (e) => {
        mouseDown = false;
      };
  
      const handleMove = (e) => {
        e.preventDefault();
        if (!mouseDown) {
          return;
        }
        const x = e.pageX - slider.offsetLeft;
        const scroll = x - startX;
        slider.scrollLeft = scrollLeft - scroll;
      };
  
      const events = {
        mousemove: handleMove,
        mousedown: handleDown,
        mouseup: handleUp,
        mouseleave: handleUp,
      };
  
      Object.entries(events).forEach(([event, handler]) => {
        slider.addEventListener(event, handler, false);
      });
    };
  
    const handleScroll = (event) => {
      const { scrollLeft, scrollWidth } = event.target;
  
      const scrollProgress =
        scrollLeft / (scrollWidth - event.target.clientWidth) || 0;
  
      const isScrollAtStart = scrollProgress < 0.001;
      const isScrollAtEnd = scrollProgress > 0.99;
      const isScrollAtMiddle = !isScrollAtStart && !isScrollAtEnd;
  
      const STATES = {
        start: "start",
        middle: "middle",
        end: "end",
      };
  
      if (isScrollAtStart) {
        event.target.dataset.scrollVisibility = STATES.start;
      } else if (isScrollAtEnd) {
        event.target.dataset.scrollVisibility = STATES.end;
      } else if (isScrollAtMiddle) {
        event.target.dataset.scrollVisibility = STATES.middle;
      }
    };
  
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const isScrollable = entry.target.scrollWidth > entry.target.clientWidth;
  
        entry.target.dataset.scrollable = isScrollable;
  
        if (isScrollable) {
          dragToScrollX(entry.target, false);
          entry.target.dataset.scrollVisibility = "start";
          entry.target.addEventListener("scroll", handleScroll);
        } else {
          dragToScrollX(entry.target, true);
          entry.target.removeEventListener("scroll", handleScroll);
          delete entry.target.dataset.scrollVisibility;
        }
      });
    });
  
    const setUp = () => {
      resizeObserver.observe(component, { childList: true });
    };
    const init = () => {
      setUp();
    };
  
    init();
  }