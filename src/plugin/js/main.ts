import type { Api } from "reveal.js";
// Helper imports
import { pluginDebug as debug, sectionTools } from "reveal.js-plugintoolkit";
import type { Config } from "./config";
import { type AppearanceConsts, initConsts } from "./consts";
// Function imports
import { addAutoAnimation } from "./functions/add-auto-animation";
import { addBaseClass } from "./functions/add-base-class";
import { addDelay } from "./functions/add-delay";
import { convertToSpans } from "./functions/convert-to-spans";
import { fixListItem } from "./functions/fix-list-item";
import { getAppearanceArrays } from "./functions/get-appearance-arrays";
import { showHideSlide } from "./functions/show-hide-slide";
import type { RevealFragmentEvent, RevealSlideEvent } from "./types";

export class Appearance {
	private readonly deck: Api;
	private readonly viewport: HTMLElement;
	private readonly slides: HTMLElement;
	private readonly options: Config;
	private readonly consts: AppearanceConsts;
	private readonly sections: NodeListOf<Element>;
	private readonly regularSections: Element[];
	private appearances: Element[];
	private isInitialLoad: boolean;

	private constructor(deck: Api, options: Config) {
		this.deck = deck;
		this.options = options;
		this.isInitialLoad = true;

		// Get Reveal.js elements
		this.viewport = deck.getViewportElement() as HTMLElement;
		this.slides = deck.getSlidesElement() as HTMLElement;

		// Initialize constants
		this.consts = initConsts(
			options.baseclass,
			options.compatibilitybaseclass,
			options.compatibility
		);

		// Get sections
		this.sections = this.slides.querySelectorAll("section");
		this.regularSections = Array.from(this.sections).filter(
			(section) => !sectionTools.isStack(section as HTMLElement)
		);

		// Initialize appearances array (will be filled later)
		this.appearances = [];

		// Check if Speaker view window
		if (/receiver/i.test(window.location.search)) {
			this.viewport.classList.add("sv");
		}
	}

	/**
	 * Prepare appearance elements
	 */
	private async prepareElements(): Promise<void> {
		// Find all appearance elements
		this.appearances = Array.from(this.slides.querySelectorAll(this.consts.animatecss));

		// Process each section for auto animations
		for (const section of this.regularSections) {
			addAutoAnimation(section, this.options, this.appearances);
		}

		// After addAutoAnimation, filter out inline elements that are redundant
		// this.appearances = this.appearances.filter((element) => {
		// 	const isInline = [
		// 		"EM",
		// 		"STRONG",
		// 		"I",
		// 		"B",
		// 		"CODE",
		// 		"SPAN",
		// 		"A",
		// 		"ABBR",
		// 		"MARK",
		// 		"SMALL",
		// 		"SUB",
		// 		"SUP",
		// 	].includes(element.tagName);

		// 	if (!isInline) {
		// 		return true;
		// 	}

		// 	const parentLi = element.closest("li");
		// 	if (!parentLi || !this.appearances.includes(parentLi)) {
		// 		return true;
		// 	}

		// 	// Get animation classes (excluding base class)
		// 	const elementAnimClasses = Array.from(element.classList).filter(
		// 		(c) => c.startsWith("animate__") && c !== this.consts.baseclass
		// 	);
		// 	const liAnimClasses = Array.from(parentLi.classList).filter(
		// 		(c) => c.startsWith("animate__") && c !== this.consts.baseclass
		// 	);

		// 	if (elementAnimClasses.length === 0 || liAnimClasses.length === 0) {
		// 		return true;
		// 	}

		// 	const hasSameClass = elementAnimClasses.some((c) => liAnimClasses.includes(c));

		// 	if (hasSameClass) {
		// 		debug.log(
		// 			`Removing redundant inline element from appearances in favor of parent LI:`,
		// 			element,
		// 			parentLi
		// 		);
		// 		return false;
		// 	}

		// 	return true;
		// });

		// Process each appearance element
		for (const element of this.appearances) {
			fixListItem(element, this.options, this.consts);
			addBaseClass(element, this.consts);

			if (element instanceof HTMLElement && element.dataset.split) {
				convertToSpans(element, element.dataset.split);
			}
		}

		// Process delays for sections
		for (const section of this.regularSections) {
			const appearanceArrays = getAppearanceArrays(
				section,
				this.consts.baseclass,
				this.consts.fragmentClass
			);

			if (appearanceArrays) {
				for (const array of appearanceArrays) {
					addDelay(array, this.options);
				}
			}
		}
	}

	/**
	 * Set up event listeners
	 */
	private setupEventListeners(): void {
		debug.log("Options:", this.options);
		debug.log("Setting up event listeners");

		const initialLoadRef = { value: this.isInitialLoad };

		// Add event listeners for all defined event names
		for (const eventname of this.consts.eventnames) {
			debug.log(`Adding listener for ${eventname} event`);

			this.deck.on(eventname, (event: unknown) => {
				const e = event as RevealSlideEvent;
				showHideSlide(e, this.options, this.consts, this.deck, initialLoadRef);
				this.isInitialLoad = initialLoadRef.value;
			});
		}

		// Animation end event
		this.viewport.addEventListener("animationend", (event) => {
			const target = event.target as Element;
			target.classList.add("animationended");
		});

		this.viewport.addEventListener("autoanimate", (event) => {
			debug.log("Autoanimate event triggered:", event);
		});

		// Fragment hidden event
		this.viewport.addEventListener("fragmenthidden", (event: unknown) => {
			const e = event as RevealFragmentEvent;

			if (e.fragment) {
				e.fragment.classList.remove("animationended");
				const endedEls = e.fragment.querySelectorAll(".animationended");
				for (const el of endedEls) {
					el.classList.remove("animationended");
				}
			}
		});
	}

	/**
	 * Create a new Appearance instance
	 */
	static async create(deck: Api, options: Config): Promise<Appearance> {
		const instance = new Appearance(deck, options);
		await instance.prepareElements();
		instance.setupEventListeners();
		return instance;
	}
}
