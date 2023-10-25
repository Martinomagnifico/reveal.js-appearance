import { toJSONString } from '../helpers';


/**
 * Adds automatic animations to elements within a section based on specified criteria.
 *
 * This function examines the provided section for attributes and options to determine
 * which classes should be added to its elements to enable automatic animations.
 *
 * @param {HTMLElement} section - The section element to which automatic animations will be applied.
 * @param {Object} options - The existing user options object
 * @param {Object} vars - The existing vars object
 * @returns {undefined}
 */
export const addAutoAnimation = (section, options, vars) => {

	let sectionAutoSelectors = null;

	if (section.hasAttribute("data-autoappear")) {

		let sectDataAppear = section.dataset.autoappear;

		if (sectDataAppear == "auto" || sectDataAppear == "" || sectDataAppear.length < 1 || sectDataAppear == "true") {
			// This section should get the global autoappear classes on its objects
			sectionAutoSelectors = options.autoelements ? options.autoelements : null;
		} else {
			// This section should get the local autoappear classes on its objects
			sectionAutoSelectors = sectDataAppear;
		}

	} else if ( options.autoappear && options.autoelements ) {
		// This section should get the global autoappear classes on its objects
		sectionAutoSelectors = options.autoelements;
	}

	if (sectionAutoSelectors) {

		let elementsToAnimate = JSON.parse(toJSONString(sectionAutoSelectors));

		Object.entries(elementsToAnimate).forEach(([selector, assignables]) => {


			// Exclude the elements from vars.appearances
			let elements = Array.from(section.querySelectorAll(selector)).filter( element => !vars.appearances.includes(element) );

			if (elements.length) {

				elements.forEach((element) => {

					vars.appearances.push(element)

					let newClasses = [], newDelay = null, speedClass = false, elementSplit = null, containerDelay = null;

					if (Array.isArray(assignables)) {

						newClasses = assignables[0].split(/[ ,]+/);
						newDelay = assignables[1];

					} else if (typeof assignables == "string"){

						newClasses = assignables.split(/[ ,]+/);

					} else if (assignables.constructor === Object) {

						if (assignables.class || assignables.animation) {
							let animationClass = assignables.animation ? assignables.animation : assignables.class;
							newClasses = animationClass.split(/[ ,]+/);
						}
						if (assignables.speed) {
							speedClass = String(assignables.speed);
							if (!speedClass.includes("animate__")) {
								speedClass = `animate__${speedClass}`
							}
						}
						if (assignables.delay) {
							newDelay = String(assignables.delay);
						}
						if (assignables.split) {
							elementSplit = String(assignables.split);
						}
						if (assignables["container-delay"]) {
							containerDelay = String(assignables["container-delay"]);
						}
					}

					element.classList.add(...newClasses);
					if (speedClass) { element.classList.add(speedClass)}
					if (newDelay) {element.dataset.delay = newDelay};
					if (elementSplit) {element.dataset.split = elementSplit};
					if (containerDelay) {element.dataset.containerDelay = containerDelay};
				});
			}
		});
	}
}
