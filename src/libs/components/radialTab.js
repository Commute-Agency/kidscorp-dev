export default function radialTab(component) {
	if (!component) return;

	const closeButtonArray = component.querySelectorAll(
		'[data-component="close-button"]'
	);
	const closeTabButton = component.querySelector(
		'[data-component="close-tabs-button"]'
	);
	const hiddenPane = component.querySelector('[data-component="hidden-pane"]');

	function closeTab() {
		closeTabButton.click();
		window.removeEventListener("keydown", closeWithEsc)
	}

	function closeWithEsc({ key }) {
		if (key === "Escape") {
			closeTab();
		}
	}

	window.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			closeTab();
		}
	});

	function handleEventListeners() {
		closeButtonArray.forEach((button) => {
			window.addEventListener("keydown", closeWithEsc)
			button.onclick = closeTab;
		});
	}

	function setUp() {
		hiddenPane.remove();
		handleEventListeners();
	}

	function init() {
		setUp();
	}

	init();
}
