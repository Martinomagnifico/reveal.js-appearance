import { AppearanceConsts } from '../consts';

/**
 * Adds a base class to an HTML element if it doesn't already have it.
 *
 * This function checks if the specified HTML element has the specified base class,
 * and if not, it adds the base class to the element's class list.
 *
 * @param appearance The HTML element to which the base class should be added
 * @param consts The appearance constants object containing baseclass and fragmentClass
 */
export function addBaseClass(appearance: Element, consts: AppearanceConsts): void {
  if (!appearance.classList.contains(consts.baseclass)) {
    appearance.classList.add(consts.baseclass);
  }
  
  if (appearance.classList.contains(consts.fragmentClass)) {
    appearance.classList.add('custom');
  }
}