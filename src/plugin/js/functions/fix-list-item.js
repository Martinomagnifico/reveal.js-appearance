import { copyDataAttributes } from '../helpers';

/**
 * Hoist a list item's appearance to its parent element's appearance.
 *
 * @param {HTMLElement} from - The list item element.
 * @returns {undefined}
 */
const hoistAppearance = (from, baseclass) => {
	let to = from.parentNode;
	if (!to) return;
  
	for (const sibling of to.children) {
	  if (sibling !== from && sibling.dataset.appearParent) return;
	}
  
	to.classList = from.classList;
	copyDataAttributes(from, to, "data-appear-parent");
	to.innerHTML = from.innerHTML;
	to.classList.add(baseclass);
};


/**
 * Fix list items that were changed by Quarto.
 *
 * This function is designed for use with Quarto and handles the conversion of list items
 * with Appearance classes to their parent elements when a manual attribute is present.
 * It also provides automatic conversion for list items that directly contain spans, which
 * is related to Quarto's wrapping of list content in a span.
 *
 * @param {HTMLElement} appearance - The list item element whose appearance will be converted.
 * @param {Object} options - An options object that controls the conversion behavior.
 * @param {boolean} options.appearparents - If `true`, automatic conversion of list items with spans is enabled.
 * @returns {undefined}
 */
export const fixListItem = (appearance, options, names) => {

	let baseclass = names.baseclass
	if (appearance.hasAttribute("data-appear-parent")) {
		hoistAppearance(appearance, baseclass);
	}

	if (options.appearparents) {
		if (appearance.parentNode && appearance.parentNode.tagName) {
			if (appearance.tagName == "SPAN" && appearance.parentNode.tagName == "LI") {
				let spanLength = String(appearance.outerHTML).length;
				let liContentLength = String(appearance.parentNode.innerHTML).length;
				if (spanLength == liContentLength) {
					hoistAppearance(appearance);
				}
			}
		}
	}
}
