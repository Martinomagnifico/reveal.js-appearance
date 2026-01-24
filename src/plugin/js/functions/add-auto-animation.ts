// Basic imports
import { pluginDebug as debug } from "reveal.js-plugintoolkit";
import type { AnimationOption, Config } from "../config";

// Helper imports
import { toJSONString } from "../helpers";

const isAnimationObject = (
	obj: unknown
): obj is {
	class?: string;
	animation?: string;
	speed?: string;
	delay?: string | number;
	split?: string;
	"container-delay"?: string | number;
} => typeof obj === "object" && obj !== null;

/**
 * addAutoAnimation
 *
 * @param section The section element
 * @param options The existing user options object
 * @param appearances Array of appearance elements to update
 */
export const addAutoAnimation = (
	section: Element,
	options: Config,
	appearances: Element[]
): void => {
	let sectionAutoSelectors: Record<string, AnimationOption> | null = null;

	// Determine which auto selectors to use for this section
	if (section instanceof HTMLElement && section.hasAttribute("data-autoappear")) {
		const sectDataAppear = section.dataset.autoappear;

		// Case 1: Section has data-autoappear="auto" (or empty, or true)
		const isDefaultAutoAppear =
			sectDataAppear === "auto" || sectDataAppear === "" || sectDataAppear === "true";

		if (isDefaultAutoAppear) {
			// Use global auto elements configuration
			sectionAutoSelectors =
				options.autoelements && typeof options.autoelements === "object"
					? options.autoelements
					: null;
		} else {
			// Use local auto elements configuration from the section attribute
			try {
				sectionAutoSelectors = sectDataAppear ? JSON.parse(sectDataAppear) : null;
			} catch (e) {
				debug.log(options, `Error parsing data-autoappear: ${e}`);
				sectionAutoSelectors = null;
			}
		}
	}
	// Case 2: Global autoappear is enabled
	else if (
		options.autoappear &&
		options.autoelements &&
		typeof options.autoelements === "object"
	) {
		sectionAutoSelectors = options.autoelements;
	}

	// If no selectors were found or they're invalid, exit early
	if (!sectionAutoSelectors) return;

	try {
		// Parse the selectors safely
		const elementsToAnimate = JSON.parse(toJSONString(sectionAutoSelectors));

		// Process each selector and its animation configuration
		for (const [selector, animConfig] of Object.entries(elementsToAnimate)) {
			// Find elements matching the selector that aren't already in the appearances array
			const elements = Array.from(section.querySelectorAll(selector)).filter(
				(element) => !appearances.includes(element)
			);

			if (elements.length === 0) continue;

			// Track containers to know when we hit the first element of a new container
			let lastContainer: Element | null = null;
			let containerIndex = 0;

			// Process each matching element
			for (let index = 0; index < elements.length; index++) {
				const element = elements[index];

				// Check if we're in a new container
				const currentContainer = element.parentElement;
				if (currentContainer !== lastContainer) {
					lastContainer = currentContainer;
					containerIndex = 0;
				}

				// Add this element to the appearances array
				appearances.push(element);

				// Initialize animation properties
				let newClasses: string[] = [];
				let newDelay: string | null = null;
				let speedClass: string | false = false;
				let elementSplit: string | null = null;
				let containerDelay: string | null = null;

				// Handle different types of animation configurations
				if (Array.isArray(animConfig)) {
					// Format: ["animation-class", delay]
					newClasses = String(animConfig[0]).split(/[ ,]+/);
					newDelay = animConfig[1] !== undefined ? String(animConfig[1]) : null;
				} else if (typeof animConfig === "string") {
					// Format: "animation-class"
					newClasses = animConfig.split(/[ ,]+/);
				} else if (isAnimationObject(animConfig)) {
					// Format: { class/animation: "...", speed: "...", delay: "...", ... }
					if (animConfig.class || animConfig.animation) {
						const animationClass = animConfig.animation || animConfig.class;
						newClasses = String(animationClass).split(/[ ,]+/);
					}

					if (animConfig.speed) {
						speedClass = String(animConfig.speed);
						if (!speedClass.includes("animate__")) {
							speedClass = `animate__${speedClass}`;
						}
					}

					if (animConfig.delay !== undefined) {
						newDelay = String(animConfig.delay);
					}

					if (animConfig.split !== undefined) {
						elementSplit = String(animConfig.split);
					}

					if (animConfig["container-delay"] !== undefined) {
						containerDelay = String(animConfig["container-delay"]);
					}
				}

				// Apply classes to the element
				if (newClasses.length > 0) {
					element.classList.add(...newClasses);
				}

				if (speedClass) {
					element.classList.add(speedClass);
				}

				// Apply data attributes if the element is an HTMLElement
				if (element instanceof HTMLElement) {
					// Apply container-delay to the first element of each container
					if (containerDelay && containerIndex === 0) {
						element.dataset.delay = containerDelay;
					}
					// Only apply delay to elements after the first in each container
					else if (newDelay && containerIndex > 0 && !element.dataset.delay) {
						element.dataset.delay = newDelay;
					}

					if (elementSplit) {
						element.dataset.split = elementSplit;
					}
				}

				containerIndex++;
			}
		}
	} catch (error) {
		debug.log(options, `Error processing auto animations: ${error}`);
	}
};
