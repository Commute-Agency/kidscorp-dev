import {slugify} from '../utils.js'

export default function pricingForm(component) {
    if (!component) return;
    // depends on inputs from a form estimate the price of a service/product
    let price = 0;
    const form = component.querySelector("form");
    const inputs = form.querySelectorAll("input");
    const priceInput = component.querySelector('[data-component="price-value"]');
    const image = component.querySelector('[data-component="price-cover-image"]');
  
    function calculatePrice() {
      const formData = new FormData(form);
      const values = [...formData.values()];
  
      const totalPrice = values.reduce((total, value) => {
        const parsedValue = parseFloat(value);
        if (isNaN(parsedValue)) {
          return total;
        }
        return total + parsedValue;
      }, 0);
  
      return totalPrice;
    }
  
    function updatePrice() {
      price = calculatePrice();
      priceInput.innerText = price;
    }
  
    function updateAttributes() {
      const formData = new FormData(form);
      const values = [...formData.entries()];
  
      values.forEach(([key, value]) => {
        const inputIndex =
          Array.from(inputs)
            .filter((input) => input.name === key)
            .findIndex((input) => input.name === key && input.value === value) +
          1;
  
        component.setAttribute(`data-${key}`, `option-${inputIndex}`);
      });
    }
  
    function setFormRedirect() {
      const redirection = form.getAttribute("redirect");
      const newRedirection = slugify(
        component.closest("[data-w-tab]").dataset.wTab
      );
  
      // form.setAttribute('redirect', `${redirection}?${newRedirection}`)
      form.dataset["redirect"] = `${redirection}?serviceType=${newRedirection}`;
    }
  
    function handleChange() {
      updatePrice();
      updateAttributes();
    }
  
    const setUp = () => {
      inputs.forEach((input) => {
        input.addEventListener("change", handleChange);
      });
      setFormRedirect();
    };
    const init = () => {
      setUp();
    };
  
    init();
  }