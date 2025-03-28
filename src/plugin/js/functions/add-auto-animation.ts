import type { Api } from 'reveal.js';
import type { Config } from '../config';
import { AppearanceConsts } from '../consts';
import { toJSONString, debug } from '../helpers';

/**
 * Adds automatic animations to elements within a section based on specified criteria.
 *
 * This function examines the provided section for attributes and options to determine
 * which classes should be added to its elements to enable automatic animations.
 *
 * @param section The section element to which automatic animations will be applied
 * @param options The existing user options object
 * @param appearances Array of appearance elements to update
 * @param consts Plugin constants
 */
export function addAutoAnimation(
  section: Element, 
  options: Config, 
  appearances: Element[]
): void {
  let sectionAutoSelectors: any = null;

  if (section instanceof HTMLElement && section.hasAttribute("data-autoappear")) {
    let sectDataAppear = section.dataset.autoappear;

    if (sectDataAppear == "auto" || sectDataAppear == "" || sectDataAppear == "true") {
      // This section should get the global autoappear classes on its objects
      sectionAutoSelectors = options.autoelements ? options.autoelements : null;
    } else {
      // This section should get the local autoappear classes on its objects
      sectionAutoSelectors = sectDataAppear;
    }
  } else if (options.autoappear && options.autoelements) {
    // This section should get the global autoappear classes on its objects
    sectionAutoSelectors = options.autoelements;
  }

  if (sectionAutoSelectors) {
    let elementsToAnimate = JSON.parse(toJSONString(sectionAutoSelectors));

    Object.entries(elementsToAnimate).forEach(([selector, assignables]: [string, any]) => {
      // Exclude the elements from appearances
      let elements = Array.from(section.querySelectorAll(selector))
        .filter(element => !appearances.includes(element));

      if (elements.length) {
        elements.forEach((element) => {
          // Add this element to the appearances array
          appearances.push(element);

          let newClasses: string[] = [];
          let newDelay: string | null = null;
          let speedClass: string | false = false;
          let elementSplit: string | null = null;
          let containerDelay: string | null = null;

          if (Array.isArray(assignables)) {
            newClasses = assignables[0].split(/[ ,]+/);
            newDelay = assignables[1];
          } else if (typeof assignables == "string") {
            newClasses = assignables.split(/[ ,]+/);
          } else if (assignables && typeof assignables === 'object') {
            if (assignables.class || assignables.animation) {
              let animationClass = assignables.animation ? assignables.animation : assignables.class;
              newClasses = animationClass.split(/[ ,]+/);
            }
            if (assignables.speed) {
              speedClass = String(assignables.speed);
              if (!speedClass.includes("animate__")) {
                speedClass = `animate__${speedClass}`;
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
          if (speedClass) { element.classList.add(speedClass); }

          if (element instanceof HTMLElement) {
            if (newDelay) {
              if (!element.dataset.delay) {
                element.dataset.delay = newDelay;
              }
            }
            if (elementSplit) { element.dataset.split = elementSplit; }
            if (containerDelay) { element.dataset.containerDelay = containerDelay; }
          }
        });
      }
    });
  }
}