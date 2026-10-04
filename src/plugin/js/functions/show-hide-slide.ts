// Basic imports
import type { RevealApi } from "reveal.js";
// The entrance signal; see main.ts.
import { entranceTools } from "reveal.js-plugintoolkit";
import type { Config } from "../config";
import type { AppearanceConsts } from "../consts";
import type { RevealSlideEvent } from "../types";

const { reset } = entranceTools;

interface SlideTransition {
	from: HTMLElement | null;
	to: HTMLElement | null;
}

/**
 * Derives slide from and to from the event object.
 * It checks the event object for `fromSlide` and `toSlide` properties, which are found in the `autoanimate` event.
 *
 * @param event The event object containing slide transition details
 * @returns An object containing references to the "from" and "to" slides
 */
function fromTo(event: RevealSlideEvent): SlideTransition {
	const slides: SlideTransition = {
		from: event.fromSlide || event.previousSlide || null,
		to: event.toSlide || event.currentSlide || null,
	};
	return slides;
}

/**
 * A function that determines the appearance event for a given slide.
 *
 * This function checks the `data-appearevent` attribute of the slide and the `options.appearevent` parameter.
 * If `data-appearevent` is set to "auto", it is converted to "autoanimate". If `options.appearevent` is "auto", it is also converted to "autoanimate".
 * The function returns the appearance event, prioritizing `data-appearevent` over `options.appearevent`.
 *
 * @param toSlide The slide for which the appearance event is determined
 * @param options An object containing options for the appearance event
 * @returns The determined appearance event for the slide
 */
function slideAppearevent(toSlide: HTMLElement, options: Config): string {
	if (toSlide.dataset.appearevent && toSlide.dataset.appearevent === "auto") {
		toSlide.dataset.appearevent = "autoanimate";
	}

	let appearevent = options.appearevent;
	if (appearevent === "auto") {
		appearevent = "autoanimate";
	}

	return toSlide.dataset.appearevent || appearevent;
}

/**
 * Resolves once the slide, and the stack it moves with, have stopped moving.
 *
 * Reveal sends `slidetransitionend` for the first transition that ends on any
 * section while a slide change is running, not only on the slide that moved. A
 * section elsewhere in the deck can end one of its own straight away, and then
 * the event comes long before this slide has arrived. So the slide's own
 * transitions are waited for here. With none running, as at the real end of a
 * change or with `transition: 'none'`, this resolves at once.
 *
 * @param slide The slide that is arriving
 */
function slideSettled(slide: HTMLElement): Promise<unknown> {
	const stack = slide.parentElement?.matches("section.stack") ? slide.parentElement : null;
	const moving = [slide, stack]
		.flatMap((el) => (el ? el.getAnimations() : []))
		.filter((animation) => animation.playState === "running");
	// A transition that is cancelled, because the deck moved on, rejects `finished`.
	return Promise.all(moving.map((animation) => animation.finished.catch(() => undefined)));
}

/**
 * Remove the 'data-appearance-can-start' attribute from the 'from' slide if the 'hideagain' option is enabled.
 *
 * @param slides The container element for the slides
 * @param options An object containing configuration options
 */
function removeStartAttribute(slides: SlideTransition, options: Config): void {
	if (options.hideagain && slides.from?.dataset.appearanceCanStart) {
		slides.from.removeAttribute("data-appearance-can-start");
	}
}

/**
 * Turn off slide appearances when transitioning from one slide to another if the 'hideagain' option is enabled.
 *
 * @param slides The container element for the slides
 * @param options An object containing configuration options
 * @param consts Constants containing CSS selectors
 */
function turnOffSlideAppearances(
	slides: SlideTransition,
	options: Config,
	consts: AppearanceConsts
): void {
	if (options.hideagain && slides?.from) {
		// Remove animationended class from animated elements when moving away from that slide
		const fromAppearances = slides.from.querySelectorAll(consts.animatecss);
		if (fromAppearances) {
			for (const appearance of fromAppearances) {
				appearance.classList.remove("animationended");
				// Hidden again, so it will come in again.
				if (appearance instanceof HTMLElement && appearance.dataset.entrance)
					reset(appearance);
			}
		}

		// Remove visible class from fragments when moving away from that slide
		const fromFragments = slides.from.querySelectorAll(".fragment.visible");
		if (fromFragments) {
			for (const fragment of fromFragments) {
				fragment.classList.remove("animationended");
			}
		}
	}
}

/**
 * Handles the showing and hiding of slides based on the provided event and options.
 *
 * @param event The event object containing slide transition details
 * @param options An object containing configurations for slide appearance management
 * @param consts Constants containing CSS selectors
 * @param deck The Reveal.js deck
 */
export function showHideSlide(
	event: RevealSlideEvent,
	options: Config,
	consts: AppearanceConsts,
	deck: RevealApi,
	isInitialLoad: { value: boolean }
): void {
	const viewport = deck.getViewportElement() as HTMLElement;
	const isScroll = viewport.classList.contains("reveal-scroll");
	const etype = event.type;
	const slides = fromTo(event);

	if (slides.to) {
		if (etype === "ready") {
			// Get initdelay from slide attribute or global config
			const slideInitDelay = slides.to.dataset.initdelay
				? parseInt(slides.to.dataset.initdelay, 10)
				: options.initdelay || 0;

			if (isInitialLoad.value && slideInitDelay > 0) {
				setTimeout(() => {
					if (slides.to) {
						slides.to.dataset.appearanceCanStart = "true";
					}
					isInitialLoad.value = false; // Mark that initial load is complete
				}, slideInitDelay);
			} else {
				slides.to.dataset.appearanceCanStart = "true";
				isInitialLoad.value = false; // Mark initial load complete
			}
		}

		const appearevent = slideAppearevent(slides.to, options);

		if (
			etype === appearevent ||
			(etype === "slidetransitionend" && appearevent === "autoanimate")
		) {
			const toSlide = slides.to;
			if (etype === "slidetransitionend") {
				// Only once the slide is really there (see slideSettled), and only if
				// it is still the current slide by then.
				slideSettled(toSlide).then(() => {
					if (deck.getCurrentSlide() === toSlide) {
						toSlide.dataset.appearanceCanStart = "true";
					}
				});
			} else {
				toSlide.dataset.appearanceCanStart = "true";
			}
		}

		// Add scroll mode compatibility, does not have a slidetransitionend event yet
		if (isScroll && etype === "slidechanged") {
			removeStartAttribute(slides, options);
			turnOffSlideAppearances(slides, options, consts);

			// Add delay to allow for scroll animation to finish
			setTimeout(() => {
				if (slides.to) {
					slides.to.dataset.appearanceCanStart = "true";
				}
			}, options.delay);
		}

		if (etype === "slidetransitionend") {
			removeStartAttribute(slides, options);
			turnOffSlideAppearances(slides, options, consts);
		}

		if (etype === "slidechanged" && document.body.dataset.exitoverview) {
			removeStartAttribute(slides, options);
			slides.to.dataset.appearanceCanStart = "true";
		} else if (etype === "overviewhidden") {
			document.body.dataset.exitoverview = "true";

			setTimeout(() => {
				document.body.removeAttribute("data-exitoverview");
			}, 500);

			if (event.currentSlide) {
				removeStartAttribute(slides, options);
				slides.to.dataset.appearanceCanStart = "true";
			}
		}
	}
}
