export default function dropdown(component) {
	if (!component) return;

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

	async function setDropdownLinks() {
		const templateLink = dropdownList?.firstElementChild?.cloneNode(true);

		if (!templateLink) {
			return [];
		}

		dropdownList.innerHTML = '';

		const links = targetLinks.map((item) => {
			const link = templateLink.cloneNode(true);
			link.innerText = item.innerText;
			return link;
		});

		dropdownList.append(...links);

		dropdownListLinks = Array.from(dropdownList.children);

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
