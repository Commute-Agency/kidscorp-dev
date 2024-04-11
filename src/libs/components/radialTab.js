export default function radialTab(component) {
	if (!component) return;

	const closeButtonArray = component.querySelectorAll(
		'[data-component="close-button"]'
	);
	const closeTabButton = component.querySelector('[data-component="close-tabs-button"]');
	const hiddenPane = component.querySelector('[data-component="hidden-pane"]');

	function closeTab() {
		closeTabButton.click();
	}

	function handleEventListeners() {
		closeButtonArray.forEach((button) => (button.onclick = closeTab));
	}

	function setUp() {
		hiddenPane.remove()
		handleEventListeners();
	}

	function init() {
		setUp();
	}

	init();
}
