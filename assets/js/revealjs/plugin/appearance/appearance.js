/*****************************************************************
 * @author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/Martinomagnifico
 *
 * Appearance.js for Reveal.js 1.0.1
 *
 * @license 
 * MIT licensed
 *
 * Thanks to:
 *  - Hakim El Hattab, Reveal.js
 *  - Daniel Eden, Animate.css
******************************************************************/

const Appearance = window.Appearance || (function(){

	let options = Reveal.getConfig().appearance || {};

	let defaultOptions = {
		baseclass: 'animated',
		visibleclass: 'in',
		hideagain: true,
		delay: 300
	};

	const defaults = function (options, defaultOptions) {
		for ( var i in defaultOptions ) {
			if ( !options.hasOwnProperty( i ) ) {
				options[i] = defaultOptions[i];
			}
		}
	}
	
	const loopAppearances = function (appearances, appearancesInFragment) {
		let time = 0;
		appearances.filter(element => {
			if (!appearancesInFragment.includes(element)) {
				let timeincrement = parseInt(element.dataset.delay ? element.dataset.delay : options.delay);
				setTimeout((function () {
					element.classList.add(options.visibleclass);
				}), time);
				time += timeincrement;
			}
		});
	};

	const selectionArray = function (container, selectors) {
		let selections = container.querySelectorAll(selectors);
		let selectionarray = Array.prototype.slice.call(selections);
		return selectionarray
	};

	const showAppearances = function (container) {
		let appearances = selectionArray(container, `:scope .${options.baseclass}`);
		let appearancesInFragment = selectionArray(container, `:scope .fragment .${options.baseclass}`);
		loopAppearances(appearances, appearancesInFragment);
	};
	
	const hideAppearances = function (container) {
		let disappearances = selectionArray(container, `:scope .${options.baseclass},:scope .fragment.visible`);
		disappearances.filter(element => {
			element.classList.remove(
				element.classList.contains("fragment") ? "visible" : options.visibleclass
			);
		});
	};
	
	const showHideSlide = function (event) {
		showAppearances(event.currentSlide);
		if (event.previousSlide && options.hideagain) {
			hideAppearances(event.previousSlide);
		}
	}
	const showHideFragment = function (event) {
		if (event.type == 'fragmentshowncomplete'){
			showAppearances(event.fragment);
		} else {
			hideAppearances(event.fragment);
		}
	}
	
	const init = function () {
		defaults( options, defaultOptions );
		window.addEventListener('slidechangecomplete', showHideSlide, false);
		window.addEventListener('fragmentshowncomplete', showHideFragment, false);
		window.addEventListener('fragmenthiddencomplete', showHideFragment, false);
	};

	return {
		init: init
	};

})();

Reveal.registerPlugin('appearance', Appearance);