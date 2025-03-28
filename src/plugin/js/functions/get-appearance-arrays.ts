/**
 * Selects elements with a specified class that are not nested inside an element with another specified class.
 * @param targetClass The class name to select elements
 * @param excludeClass The class name to exclude elements nested inside it
 * @param el The element to find the target elements in
 * @returns Array of selected elements
 */
function elemsNotInClass(targetClass: string, excludeClass: string, el: Element): Element[] {
	return Array.from(el.querySelectorAll(`.${targetClass}`))
	  .filter(s => !s.closest(`.${excludeClass}`));
  }
  
  /**
   * Selects elements with a specified class that are nested inside an element with another specified class.
   * @param targetClass The class name to select elements
   * @param parentClass The class name of the parent to find elements in
   * @param el The element to find the target elements in
   * @returns Array of selected elements
   */
  function elemsInClass(targetClass: string, parentClass: string, el: Element): Element[] {
	return Array.from(el.querySelectorAll(`.${targetClass}`))
	  .filter(s => s.closest(`.${parentClass}`) === el);
  }
  
  /**
   * Extracts groups of elements with a specified class from the provided section element.
   * Groups are formed based on nesting inside elements with another specified class.
   * @param section The section to extract data from
   * @param targetClass The class name to select elements
   * @param groupClass The class name of the parent to find elements in
   * @returns Nested arrays of selected elements or false if no elements found
   */
  export function getAppearanceArrays(
	section: Element, 
	targetClass: string | undefined, 
	groupClass: string
  ): Element[][] | false {
	// If targetClass is undefined, return false
	if (!targetClass) return false;
	
	const result: Element[][] = [
	  elemsNotInClass(targetClass, groupClass, section),
	  ...Array.from(section.querySelectorAll(`.${groupClass}`))
		.map(frag => elemsInClass(targetClass, groupClass, frag))
	];
  
	if (result.some(group => group.length > 0)) {
	  return result;
	} else {
	  return false;
	}
  }