import type { Config } from '../config';
import { AppearanceConsts } from '../consts';

/**
 * Adds progressive animation delays to elements in an array
 * 
 * @param appearanceArray Array of elements to apply delays to
 * @param options Plugin options
 * @param consts Plugin constants
 */
export function addDelay(
  appearanceArray: Element[],
  options: Config,
  consts: AppearanceConsts
): void {
  let delay = 0;
  
  appearanceArray.forEach((appearance, index) => {
    // Apply delay if this is the first element with a data-delay attribute
    // or if this is not the first element
    if ((index === 0 && appearance instanceof HTMLElement && appearance.dataset.delay) || index !== 0) {
      let elementDelay = options.delay;

      // Use custom delay from element if available
      if (appearance instanceof HTMLElement && appearance.dataset && appearance.dataset.delay) {
        const parsedDelay = parseInt(appearance.dataset.delay);
        if (!isNaN(parsedDelay)) {
          elementDelay = parsedDelay;
        }
      }

      // Accumulate the delay value
      delay = delay + elementDelay;

      // Set the animation delay on the element
      if (appearance instanceof HTMLElement) {
        appearance.style.setProperty('animation-delay', delay + "ms");
        appearance.removeAttribute('data-delay');
      }
    }
  });
}