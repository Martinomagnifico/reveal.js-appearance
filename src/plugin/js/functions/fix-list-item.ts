// Basic imports
import type { Config } from "../config";
import type { AppearanceConsts } from "../consts";

// Helpers import
import { copyDataAttributes } from "../helpers";

/**
 * Hoist a list item's appearance to its parent element's appearance.
 *
 * @param from The list item element
 * @param baseclass Base class to add to the parent
 * @returns void
 */
function hoistAppearance(from: Element, baseclass?: string): void {
	const to = from.parentNode;
	if (!to) return;

	// Check if any sibling has data-appear-parent
	for (const sibling of Array.from(to.children)) {
		if (sibling !== from && (sibling as HTMLElement).dataset.appearParent) return;
	}

	// Copy classes
	if (to instanceof Element) {
		to.classList.value = from.classList.value;

		// Copy data attributes
		copyDataAttributes(from, to, "data-appear-parent");

		// Update content
		to.innerHTML = from.innerHTML;

		// Add base class if provided
		if (baseclass) {
			to.classList.add(baseclass);
		}
	}
}

/**
 * Fix list items that were changed by Quarto.
 *
 * This function is designed for use with Quarto and handles the conversion of list items
 * with Appearance classes to their parent elements when a manual attribute is present.
 * It also provides automatic conversion for list items that directly contain spans, which
 * is related to Quarto's wrapping of list content in a span.
 *
 * @param appearance The list item element whose appearance will be converted
 * @param options The options object that controls the conversion behavior
 * @param consts The plugin constants containing the baseclass
 */
export function fixListItem(appearance: Element, options: Config, consts: AppearanceConsts): void {
	const baseclass = consts.baseclass;

	if (appearance.hasAttribute("data-appear-parent")) {
		hoistAppearance(appearance, baseclass);
	}

	if (options.appearparents) {
		if (appearance.parentNode && appearance.parentNode instanceof Element) {
			if (appearance.tagName === "SPAN" && appearance.parentNode.tagName === "LI") {
				const spanLength = appearance.outerHTML.length;
				const liContentLength = appearance.parentNode.innerHTML.length;

				if (spanLength === liContentLength) {
					hoistAppearance(appearance);
				}
			}
		}
	}
}
