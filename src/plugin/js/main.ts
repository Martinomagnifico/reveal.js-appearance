import type { Api } from "reveal.js";
// Helper imports
import { sectionTools } from "reveal.js-plugintoolkit";
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
	private readonly revealEl: HTMLElement;
	private readonly slides: HTMLElement;
	private readonly options: Config;
	private readonly consts: AppearanceConsts;
	private readonly sections: NodeListOf<Element>;
	private readonly regularSections: Element[];
	private readonly fragments: NodeListOf<Element>;
	private appearances: Element[];

	private constructor(deck: Api, options: Config) {
		this.deck = deck;
		this.options = options;

		// Get Reveal.js elements
		this.viewport = deck.getViewportElement() as HTMLElement;
		this.revealEl = deck.getRevealElement() as HTMLElement;
		this.slides = deck.getSlidesElement() as HTMLElement;

		// Initialize constants
		this.consts = initConsts(
			options.baseclass,
			options.compatibilitybaseclass,
			options.compatibility
		);

		// Get sections and fragments
		this.sections = this.slides.querySelectorAll("section");
		this.regularSections = Array.from(this.sections).filter(
			(section) => !sectionTools.isStack(section as HTMLElement)
		);
		this.fragments = this.slides.querySelectorAll(this.consts.fragmentSelector);

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
		// Add event listeners for all defined event names
		for (const eventname of this.consts.eventnames) {
			this.deck.on(eventname, (event: unknown) => {
				// Handle slide show/hide (placeholder)
				const e = event as RevealSlideEvent;
				showHideSlide(e, this.options, this.consts, this.deck);
			});
		}

		// Animation end event
		this.viewport.addEventListener("animationend", (event) => {
			const target = event.target as Element;
			target.classList.add("animationended");
		});

		this.viewport.addEventListener("autoanimate", (event) => {
			console.log("Autoanimate event triggered:", event);
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
