import { debugLog, mergeDeep, doneLoading, isStack } from './helpers';

import {getAndLoadCSS} from './functions/get-load-css.js';
import {addAutoAnimation} from './functions/add-auto-animation.js';
import {fixListItem} from './functions/fix-list-item';
import {addBaseClass} from './functions/add-base-class.js';
import {addDelay} from './functions/add-delay.js';
import {getAppearanceArrays} from './functions/get-appearance-arrays.js';
import {convertToSpans} from './functions/convert-to-spans';
import {showHideSlide} from './functions/show-hide-slide.js';


const Plugin = () => {

	const vars = {};
	vars.names = {};
	let options = {};

	/**
	* Prepare the plugin to find Appearance elements
	* @param {Object} vars - The variables to be prepared.
	* @param {Object} names - The names to be prepared.
	* @param {Function} resolve - The callback function to be called when preparation is complete.
	* @throws {Error} Throws an error if the 'options' object is not defined.
	*/
	const prepare = (options, vars, resolve) => {

		debugLog(options, "-------------   Preloading   -------------");

		let names = vars.names;

		getAndLoadCSS(options, names.es5Filename);

		if (options.compatibility) {
			names.animatecss = '.backInDown, .backInLeft, .backInRight, .backInUp, .bounceIn, .bounceInDown, .bounceInLeft, .bounceInRight, .bounceInUp, .fadeIn, .fadeInDown, .fadeInDownBig, .fadeInLeft, .fadeInLeftBig, .fadeInRight, .fadeInRightBig, .fadeInUp, .fadeInUpBig, .fadeInTopLeft, .fadeInTopRight, .fadeInBottomLeft, .fadeInBottomRight, .flipInX, .flipInY, .lightSpeedInRight, .lightSpeedInLeft, .rotateIn, .rotateInDownLeft, .rotateInDownRight, .rotateInUpLeft, .rotateInUpRight, .jackInTheBox, .rollIn, .zoomIn, .zoomInDown, .zoomInLeft, .zoomInRight, .zoomInUp, .slideInDown, .slideInLeft, .slideInRight, .slideInUp, .skidLeft, .skidLeftBig, .skidRight, .skidRightBig, .shrinkIn, .shrinkInBlur';
			names.baseclass = options.compatibilitybaseclass
		}

		vars.appearances = Array.from(vars.slides.querySelectorAll(names.animatecss));

		// Go through each section to see if there are any (auto) selectors that need animation classes
		vars.regularSections.forEach(theSection => addAutoAnimation(theSection, options, vars));

		vars.appearances.forEach((theAppearance, index) => {
			// Fix any list item where the Appearance classes were moved to the span (Quarto does this)
			fixListItem(theAppearance, options, names);

			// Go through each appearance element and add the baseclass if it doesn't have it
			addBaseClass(theAppearance, names);

			if (theAppearance.hasAttribute('data-split')) {
				convertToSpans(theAppearance, theAppearance.dataset.split);
			}
		});

		vars.regularSections.forEach((theSection, index) => {
			// Get all the Appearances in the section as separate arrays per delay loop
			let appearanceArrays = getAppearanceArrays(theSection, names.baseclass, names.fragmentClass);

			if (appearanceArrays) {
				appearanceArrays.forEach((appearanceArray) => {
					// Add the delays to each appearance in the array
					addDelay(appearanceArray, options, names)
				})
			}
		});

		doneLoading(resolve);
	}

	/**
	* The main function of the plugin
	* @param {object} deck - The deck object
	* @param {object} options - The options object
	* @param {string} es5Filename - The name of the file that will be used
	*/
	const Appear = function (deck, options, es5Filename) {

		let names = vars.names;

		// Set up names
		names.baseclass = options.baseclass;
		names.compatibilitybaseclass = options.compatibilitybaseclass;
		names.fragmentSelector = ".fragment";
		names.fragmentClass = "fragment";
		names.speedClasses = ['slower', 'slow', 'fast', 'faster'];
		names.speedClasses.push(...names.speedClasses.map(speed => `animate__${speed}`));
		names.animatecss = '[class^="animate__"],[class*=" animate__"]';
		names.es5Filename = es5Filename;
		names.eventnames = ['ready', 'slidechanged', 'slidetransitionend', 'autoanimate', 'overviewhidden', 'scrolle'];
	
		// Set up variables
		vars.deck = deck;
		vars.dom = deck.getRevealElement();
		vars.viewport = deck.getViewportElement();
		vars.slides = deck.getSlidesElement();

		vars.sections = vars.slides.querySelectorAll('section');
		vars.fragments = vars.slides.querySelectorAll(names.fragmentSelector);
		vars.regularSections = Array.from(vars.sections).filter( section => !isStack(section));

		if( /receiver/i.test( window.location.search ) ) vars.viewport.classList.add('sv');

		names.eventnames.forEach( (eventname) => deck.on( eventname, event => { showHideSlide(event, options, names, vars) } ) );

		vars.viewport.addEventListener("animationend", (event) => {
			event.target.classList.add('animationended');
		});
		vars.viewport.addEventListener("fragmenthidden", (event) => {
			event.fragment.classList.remove('animationended');
			event.fragment.querySelectorAll('.animationended').forEach(el => {
				el.classList.remove('animationended');
			});
		});

		return new Promise(resolve => {
			prepare(options, vars, resolve);
			debugLog(options, "----------   Done preloading   ----------");
		});
	};


	/**
	* Initialize the plugin
	* @param {object} deck - The deck object
	*/
	const init = function (deck) {

		let defaultOptions = {
			baseclass: 'animate__animated',
			hideagain: true,
			delay: 300,
			debug: false,
			appearevent: 'slidetransitionend',
			autoappear: false,
			autoelements: false,
			appearparents: false,
			csspath: '',
			animatecsspath: {
				link : 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
				compat : 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.compat.css',
			},
			compatibility: false,
			compatibilitybaseclass: 'animated'
		};

		options = mergeDeep(defaultOptions, deck.getConfig().appearance || {});

		return Appear(deck, options, "appearance.js");
	};

	return { id: 'appearance', init: init };
};

export default Plugin;