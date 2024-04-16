(function (h) {
	typeof define == "function" && define.amd ? define(h) : h();
})(function () {
	"use strict";
	var h = document.createElement("style");
	(h.textContent = `.is-algorithm-powered .cards{position:sticky;bottom:-100%;z-index:1}@media screen and (min-width: 991px){.radial-features_tab-content:not(:has(.w--tab-active)){visibility:hidden;pointer-events:none}}.radial-features_tab-pane-background:after{content:"";position:absolute;top:0;left:50%;width:100%;height:100%;background:inherit}.dropdown .w-nav-overlay{overflow:unset}.dropdown_button,.dropdown_list{min-width:max-content}.dropdown_link{white-space:nowrap}.dropdown_icon{width:unset}.dropdown_link.w--current{background-color:var(--hot-pink);color:var(--black);font-weight:500}.interactive-adds_tab-link-icon{--transition-duration: .3s;--transition-easing: cubic-bezier(.68, -.6, .32, 1.6);transition:.1s ease-in;position:relative}.interactive-adds_tab-link-icon:before{content:"";position:absolute;top:0;left:0;width:100%;height:100%;background:var(--hot-pink);border-radius:var(--corners--round);z-index:-1;transform:scale(1.4);transition:var(--transition-duration) var(--transition-easing);opacity:.15}[aria-selected=false] .interactive-adds_tab-link-icon:before{transform:scale(0);opacity:0}[aria-selected=false] .interactive-adds_tab-link-icon{transform:scale(.8)}.service-features_link:not(:last-child):after{content:"";position:absolute;top:0;right:0;width:1px;height:100%;background:currentColor}
`),
		document.head.appendChild(h);
	function y(t) {
		if (!t) return;
		const s = t.querySelectorAll('[data-component="close-button"]'),
			i = t.querySelector('[data-component="close-tabs-button"]'),
			e = t.querySelector('[data-component="hidden-pane"]');
		function a() {
			i.click(), window.removeEventListener("keydown", o);
		}
		function o({ key: r }) {
			r === "Escape" && a();
		}
		window.addEventListener("keydown", (r) => {
			r.key === "Escape" && a();
		});
		function u() {
			s.forEach((r) => {
				window.addEventListener("keydown", o), (r.onclick = a);
			});
		}
		function f() {
			e.remove(), u();
		}
		function c() {
			f();
		}
		c();
	}
	function E(t) {
		var p;
		if (!t) return;
		const s = t.querySelector('[data-component="dropdown-button-label"]'),
			i = t.querySelector(".dropdown_list"),
			e = "w--current";
		let a = [],
			o = [],
			u = 0;
		t.dataset.childList &&
			(o = [
				...((p = document.querySelector(`${t.dataset.childList}`)) == null
					? void 0
					: p.children),
			]);
		async function f() {
			var d;
			const n =
				(d = i == null ? void 0 : i.firstElementChild) == null
					? void 0
					: d.cloneNode(!0);
			if (!n) return [];
			i.innerHTML = "";
			const l = o.map((g) => {
				const b = n.cloneNode(!0);
				return (b.innerText = g.innerText), b;
			});
			return i.append(...l), (a = Array.from(i.children)), a;
		}
		function c(n) {
			n && n.forEach((l) => l.addEventListener("click", () => r(l)));
		}
		function r(n) {
			var l;
			n === null ||
				n.classList.contains(e) ||
				(a.forEach((d) => {
					d.classList.remove(e);
				}),
				n.classList.toggle(e),
				(s.innerText = n.innerText),
				(l = o.find((d) => d.innerText === n.innerText)) == null || l.click());
		}
		async function w() {
			const n = await f();
			c(n), r(n[u]);
		}
		function v() {
			w();
		}
		v();
	}
	function k(t) {
		const s = [...t.querySelectorAll("[data-parallax-speed]")];
		if (!t || s.length === 0 || t.length === 0) return;
		function i() {
			const o = gsap.timeline();
			return (
				s.forEach((u) => {
					o.from(
						u,
						{
							y: (f, c) => t.clientHeight * c.dataset.parallaxSpeed,
							ease: "none",
						},
						"initial"
					);
				}),
				o
			);
		}
		function e() {
			ScrollTrigger.create({
				trigger: t,
				start: "top-=100% bottom",
				end: "bottom+=50% bottom",
				scrub: 1,
				animation: i(),
			});
		}
		function a() {
			e(), i();
		}
		a();
	}
	function L(t) {
		if (!t) return;
		const s = [...t.querySelectorAll("[data-layer]")];
		let i = gsap.matchMedia();
		const e = gsap.timeline({ defaults: { ease: "back.out(1.7)" } });
		function a() {
			const c = { rotateX: 0, rotateY: 0, rotateZ: 0 };
			return (
				e.from(t, { ...c }).to(s, { translateZ: (r) => r * 50, stagger: 0.05 }),
				ScrollTrigger.create({
					trigger: t,
					start: "top-=50% center",
					end: "bottom+=50% center",
					onLeave: () => e.reverse(),
					onEnterBack: () => e.play(),
					onLeaveBack: () => e.reverse(),
					onEnter: () => e.play(),
					animation: e,
				}),
				e
			);
		}
		function o({ type: c, mouseX: r, clientX: w, clientY: v }) {
			const p = e,
				n = {
					mouseenter: () => p.reverse(),
					mouseleave: () => p.play(),
					mousemove: () => {
						const {
								left: l,
								top: d,
								width: g,
								height: b,
							} = t.getBoundingClientRect(),
							S = ((w - l) / g) * 2 - 1,
							A = ((v - d) / b) * 2 - 1,
							m = 25;
						e.totalProgress() === 0 &&
							gsap.to(t, { rotateX: A * -m, rotateY: S * m });
					},
				};
			n[c]() || n[mouseleave]();
		}
		function u() {
			a(),
				i.add("(min-width: 769px)", () => {
					(t.onmouseenter = o), (t.onmouseleave = o), (t.onmousemove = o);
				});
		}
		function f() {
			u();
		}
		f();
	}
	const _ = [
		{ "radial-tab": y },
		{ dropdown: E },
		{ parallax: k },
		{ layers: L },
	];
	function x(t = _) {
		!t ||
			t.length === 0 ||
			t.forEach((s) => {
				Object.entries(s).forEach(([i, e]) => {
					const a =
						document.querySelectorAll(`[data-component="${i}"]`) || null;
					if (a.length === 0) return console.warn(`Component ${i} not found`);
					a.forEach((o) => {
						e(o);
					});
				});
			});
	}
	function T() {
		x();
	}
	T();
});
