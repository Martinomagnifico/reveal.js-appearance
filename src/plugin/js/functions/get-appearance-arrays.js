/**
 * Selects elements with a specified class that are not nested inside an element with another specified class.
 * @param {string} targetClass - The class name to select elements.
 * @param {string} excludeClass - The class name to exclude elements nested inside it.
 * @param {Element} el - The element to find the target elements in.
 * @returns {Element[]} - Array of selected elements.
 */
const elemsNotInClass = (targetClass, excludeClass, el) => 
    Array.from(el.querySelectorAll(`.${targetClass}`))
        .filter(s => !s.closest(`.${excludeClass}`));

/**
 * Selects elements with a specified class that are nested inside an element with another specified class.
 * @param {string} targetClass - The class name to select elements.
 * @param {string} parentClass - The class name of the parent to find elements in.
 * @param {Element} el - The element to find the target elements in.
 * @returns {Element[]} - Array of selected elements.
 */
const elemsInClass = (targetClass, parentClass, el) =>
    Array.from(el.querySelectorAll(`.${targetClass}`))
        .filter(s => s.closest(`.${parentClass}`) === el);

/**
 * Extracts groups of elements with a specified class from the provided section element.
 * Groups are formed based on nesting inside elements with another specified class.
 * @param {Element} section - The section to extract data from.
 * @returns {Element[][]} - Nested arrays of selected elements.
 */


/**
 * Extracts groups of elements with a specified class from the provided section element.
 * Groups are formed based on nesting inside elements with another specified class.
 * @param {Element} section - The section to extract data from.
 * @param {string} targetClass - The class name to select elements.
 * @param {string} groupClass - The class name of the parent to find elements in.
 * @returns {Element[][]} - Nested arrays of selected elements.
 */
export const getAppearanceArrays = (section, targetClass, groupClass) => {
    const result = [
        elemsNotInClass(targetClass, groupClass, section), 
        ...Array.from(section.querySelectorAll(`.${groupClass}`))
            .map(frag => elemsInClass(targetClass, groupClass, frag))
    ];

	if (result.some(group => group.length > 0)) {
        return result;
    } else {
		return false;
	}
};
