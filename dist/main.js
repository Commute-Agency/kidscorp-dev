(function(d){typeof define=="function"&&define.amd?define(d):d()})(function(){"use strict";var d=document.createElement("style");d.textContent=`.radial-features_tab-content:not(:has(.w--tab-active)){visibility:hidden;pointer-events:none}.dropdown .w-nav-overlay{overflow:unset}.dropdown_button,.dropdown_list{min-width:max-content}.dropdown_link{white-space:nowrap}.dropdown_icon{width:unset}.dropdown_link.w--current{background-color:var(--hot-pink);color:var(--black);font-weight:500}
`,document.head.appendChild(d);function L(n){if(!n)return;const s=n.querySelectorAll('[data-component="close-button"]'),e=n.querySelector('[data-component="close-tabs-button"]'),r=n.querySelector('[data-component="hidden-pane"]');function o(){e.click()}function i(){s.forEach(f=>f.onclick=o)}function l(){r.remove(),i()}function u(){l()}u()}function b(n){var h;if(!n)return;const s=n.querySelector('[data-component="dropdown-button-label"]'),e=n.querySelector(".dropdown_list"),r="w--current";let o=[],i=[],l=0;n.dataset.childList&&(i=[...(h=document.querySelector(`${n.dataset.childList}`))==null?void 0:h.children]);async function u(){var a;const t=(a=e==null?void 0:e.firstElementChild)==null?void 0:a.cloneNode(!0);if(!t)return[];e.innerHTML="";const c=i.map(m=>{const w=t.cloneNode(!0);return w.innerText=m.innerText,w});return e.append(...c),o=Array.from(e.children),o}function f(t){t&&t.forEach(c=>c.addEventListener("click",()=>p(c)))}function p(t){var c;t===null||t.classList.contains(r)||(o.forEach(a=>{a.classList.remove(r)}),t.classList.toggle(r),s.innerText=t.innerText,(c=i.find(a=>a.innerText===t.innerText))==null||c.click())}async function E(){const t=await u();f(t),p(t[l])}function T(){E()}T()}const y=[{"radial-tab":L},{dropdown:b}];function v(n=y){!n||n.length===0||n.forEach(s=>{Object.entries(s).forEach(([e,r])=>{const o=document.querySelectorAll(`[data-component="${e}"]`)||null;if(o.length===0)return console.warn(`Component ${e} not found`);o.forEach(i=>{r(i)})})})}function _(){v()}_()});
