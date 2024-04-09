export default function copyToClipboard(component) {
    if (!component) return; 

    function setUp() {
        // button.onClick = handleCopy;
        component.onsubmit = handleCopy;
    }

    function init() {
        setUp();
    }

    function copyToClipboard(text) {
		navigator.clipboard.writeText(text);

        console.log(text);
	}

    function handleCopy(event) {
        event.preventDefault();

        const formElementsMap = new Map(
			Object.entries(event.target.elements).map(([name, element]) => {
				return [name, element.value];
			})
		);

        copyToClipboard(formElementsMap.get("clipboard"));
    }

    init();
}