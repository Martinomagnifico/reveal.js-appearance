import type { AppearanceConsts } from "../consts";

/**
 * Adds the base class.
 *
 * @param appearance The HTML element to which the base class should be added
 * @param consts The appearance constants object containing baseclass and fragmentClass
 */
export function addBaseClass(appearance: Element, consts: AppearanceConsts): void {
	if (!appearance.classList.contains(consts.baseclass)) {
		appearance.classList.add(consts.baseclass);
	}

	if (appearance.classList.contains(consts.fragmentClass)) {
		appearance.classList.add("custom");
	}
}
