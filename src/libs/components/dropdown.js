export default function dropdown(component) {
	if (!component) return;
	const OPEN_CLASS = "w--open";
	const dropdownButton = component.querySelector(".dropdown_button");
    const dropdownButtonLabel = component.querySelector('[data-component="dropdown-button-label"]');
	const dropdownList = component.querySelector(".dropdown_list");
	let dropdownListLinks = [];
	let targetLinks = [];
    let ACTIVE_INDEX = 0;

	if (component.dataset.childList) {
		targetLinks = [
			...document.querySelector(`${component.dataset.childList}`)?.children,
		];
	}

	function closeDropdown() {
		const openElements = component.querySelectorAll(`.${OPEN_CLASS}`)

		openElements.forEach((element) => {
			element.classList.toggle(OPEN_CLASS)
		})
	}

	async function setDropdownLinks() {
		const templateLink = dropdownList.firstChild.cloneNode(true);

		dropdownList.innerHTML = "";

		targetLinks.map((item) => {
			templateLink.innerText = item.innerText;

			dropdownList.appendChild(templateLink.cloneNode(true));
		});

		dropdownListLinks = [...dropdownList.children];

		return dropdownListLinks;
	}

	function handleLinks(links) {
		if (!links) return;

		links.forEach((link) =>
			link.addEventListener("click", () => setActiveLink(link))
		);
	}

	function setActiveLink(link) {
		if (link === null || link.classList.contains("w--current")) return;

		dropdownListLinks.forEach((item) => {
			item.classList.remove("w--current");
		});

		link.classList.toggle("w--current");
		dropdownButtonLabel.innerText = link.innerText;

        // Simulate close dropdown
		// closeDropdown()

        targetLinks.find(target => target.innerText === link.innerText)?.click()
	}

	async function setUp() {
		const updatedDropdownList = await setDropdownLinks();
		handleLinks(updatedDropdownList);
        setActiveLink(updatedDropdownList[ACTIVE_INDEX])
	}

	function init() {
		setUp();
	}

	init();
}
