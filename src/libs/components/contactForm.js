export default function contactForm(component) {
    if (!component) return;
  
    const checkboxes = component.querySelectorAll('input[type="checkbox"]');
    let params = {};
  
    async function getQueyParams() {
      const urlParams = new URLSearchParams(window.location.search);
      for (let param of urlParams.entries()) {
        params[param[0]] = param[1];
      }
    }
  
    function setActiveCheckbox() {
      checkboxes.forEach((checkbox) => {
        checkbox.checked = params["serviceType"] == checkbox.name;
      });
    }
  
     function setUp() {
      getQueyParams();
      setActiveCheckbox();
    }
  
    function init() {
      setUp();
    }
  
    init();
  }