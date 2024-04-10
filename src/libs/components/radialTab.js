export default function radialTab(component) {
	if (!component) return;
	const ACTIVE_CLASS = "w--tab-active";
	const closeButtonArray = component.querySelectorAll(
		'[data-component="close-button"]'
	);

	function closeTab() {
		this.closest(`.${ACTIVE_CLASS}`).classList.toggle(ACTIVE_CLASS);
	}

	function setUp() {
		closeButtonArray.forEach((button) => (button.onclick = closeTab));
	}

	function init() {
		setUp();
	}

	init();
}
