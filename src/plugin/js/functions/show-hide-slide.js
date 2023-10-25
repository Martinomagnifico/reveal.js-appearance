/**
 * Derives slide from and to from the event object.
 *
 * @param {Object} event - The event object containing slide transition details.
 * @returns {Object} - An object containing references to the "from" and "to" slides.
 */
const fromTo = (event) => {
	let slides = {};
	slides.from = event.fromSlide || event.previousSlide || null;
	slides.to = event.toSlide || event.currentSlide || null;
	return slides;
};

/**
 * A function that determines the appearance event for a given slide.
 *
 * This function checks the `data-appearevent` attribute of the slide and the `options.appearevent` parameter.
 * If `data-appearevent` is set to "auto", it is converted to "autoanimate". If `options.appearevent` is "auto", it is also converted to "autoanimate".
 * The function returns the appearance event, prioritizing `data-appearevent` over `options.appearevent`.
 *
 * @param {HTMLElement} toSlide - The slide for which the appearance event is determined.
 * @param {Object} options - An object containing options for the appearance event.
 * @param {string} options.appearevent - The appearance event option provided in the `options` object.
 *
 * @returns {string} - The determined appearance event for the slide, either from `data-appearevent` or `options.appearevent`.
 */
const slideAppearevent = (toSlide, options) => {

	if (toSlide.dataset.appearevent && toSlide.dataset.appearevent === "auto" ) {
		toSlide.dataset.appearevent = "autoanimate"
	}
	if (options.appearevent == "auto") {options.appearevent = "autoanimate"}
	return toSlide.dataset.appearevent ? toSlide.dataset.appearevent : options.appearevent;
};

/**
 * Remove the 'data-appearance-can-start' attribute from the 'from' slide if the 'hideagain' option is enabled.
 *
 * @param {HTMLElement} slides - The container element for the slides.
 * @param {Object} options - An object containing configuration options.
 * @param {boolean} options.hideagain - A flag indicating whether to remove the attribute when 'hideagain' is true.
 */
const removeStartAttribute = (slides, options) => {
	if (options.hideagain) {
		if (slides.from && slides.from.dataset.appearanceCanStart ) {
			slides.from.removeAttribute('data-appearance-can-start');
		}
	}
};


/**
 * Turn off slide appearances when transitioning from one slide to another if the 'hideagain' option is enabled.
 *
 * @param {HTMLElement} slides - The container element for the slides.
 * @param {Object} options - An object containing configuration options.
 * @param {string} names.animatecss - The CSS selector for animated elements.
 */
const turnOffSlideAppearances = (slides, options, names) => {
	if (options.hideagain) {
		let fromAppearances = slides.from.querySelectorAll(names.animatecss);
		fromAppearances.forEach( appearance => {
			appearance.classList.remove('animationended');
		} );
		// Remove visible class from fragments when moving away from that slide
		let fromFragments = slides.from.querySelectorAll(`.fragment.visible`);
		if (fromFragments) {
			fromFragments.forEach(fragment => {
				fragment.classList.remove('visible');
			})
		}
	}
};


/**
 * Handles the showing and hiding of slides based on the provided event and options.
 *
 * @param {Object} event - The event object containing slide transition details.
 * @param {Object} options - An object containing configurations for slide appearance management.
 */
export const showHideSlide = (event, options, names, vars) => {

	let view = vars.deck.getConfig().view;
	let etype = event.type;
	let slides = fromTo(event);

	if (slides.to) {

		if (etype == "ready") {
			slides.to.dataset.appearanceCanStart = true;
		}

		let appearevent = slideAppearevent(slides.to, options)

		if (etype == appearevent || (etype == "slidetransitionend" && appearevent == "autoanimate")) {
			slides.to.dataset.appearanceCanStart = true;
		}

		// Add experimental Reader mode compatibility, does not have a slidetransitionend event yet
		if (view == "scroll" && etype == 'slidechanged' ) {

			removeStartAttribute(slides, options);
			turnOffSlideAppearances(slides, options, names);

			// Add delay to allow for scroll animation to finish
			setTimeout(() => {
				slides.to.dataset.appearanceCanStart = true;
			}, options.delay)
		}


		if (etype == "slidetransitionend" ) {

			removeStartAttribute(slides, options);
			turnOffSlideAppearances(slides, options, names);
		}
		
		if (etype == 'slidechanged' && document.body.dataset.exitoverview) {
			removeStartAttribute(slides, options);
			slides.to.dataset.appearanceCanStart = true;

		} else if (etype == 'overviewhidden' ) {

			document.body.dataset.exitoverview = true;

			setTimeout(() => {
				document.body.removeAttribute('data-exitoverview')
			}, 500)

			if (event.currentSlide ) {
				removeStartAttribute(slides, options);
				slides.to.dataset.appearanceCanStart = true;
			}
		}
	}
}