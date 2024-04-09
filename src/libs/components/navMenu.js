export default function navMenu(component) {
    if (!component) return;
  
    const button = component.querySelector('[data-component="nav-menu-button"]');
    const links = component.querySelector('[data-component="nav-menu-links"]');
  
    const classObserver = new MutationObserver((mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "style"
        ) {
          mutation.target.style = "";
        }
      }
      // observer.disconnect();
    });
  
    function handlePresetActions(event) {
      event.stopPropagation();
      event.preventDefault();
    }
  
    function setUp() {
      button.onClick = handlePresetActions;
    }
  
    function init() {
      setUp();
    }
  
    init();
  }