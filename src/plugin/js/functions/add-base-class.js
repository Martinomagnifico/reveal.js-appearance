/**
 * Adds a base class to an HTML element if it doesn't already have it.
 *
 * This function checks if the specified HTML element has the specified base class,
 * and if not, it adds the base class to the element's class list.
 *
 * @param {HTMLElement} appearance - The HTML element to which the base class should be added.
 * @param {Object} names - The existing 'names' object
 * @returns {undefined}
 */

export const addBaseClass = (appearance, names) => {
	if (!appearance.classList.contains(names.baseclass)) {
		appearance.classList.add(names.baseclass);
	}
	if (appearance.classList.contains(names.fragmentClass)) {
		appearance.classList.add('custom');
	}
}
