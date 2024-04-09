export default function radialTab(component) {
	if (!component) return;
    const ACTIVE_CLASS = 'w--tab-active'
    const closeButton = component.querySelector('.radial-features_tab-close-btn');
    const activeTab = component.querySelector(`.${ACTIVE_CLASS}`);

    function closeTab() {
        activeTab ? activeTab.classList.remove(ACTIVE_CLASS) : this.closest(`.${ACTIVE_CLASS}`);
    }

	function setUp() {
        closeButton.onClick = closeTab
    }

	function init() {
		setUp();
		console.log({ component });
	}

	init();
}
