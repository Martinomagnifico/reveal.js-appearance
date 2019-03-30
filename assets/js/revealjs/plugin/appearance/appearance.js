/*****************************************************************
 * Author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/Martinomagnifico
 *
 * Appearance.js for Reveal.js 1.0.0
 *
 * @license 
 * MIT licensed
 *
 * Credits:
 *  - Hakim El Hattab, Reveal.js
 *  - Daniel Eden, Animate.css
******************************************************************/

const Appearance = window.Appearance || (function () {

	const defaultoptions = {
		baseclass: 'animated',
		visibleclass: 'in',
		hideagain: true,
		delay: 300
	}

	let config = Reveal.getConfig();
	let useroptions = config.appearance || {};
	let baseClass = useroptions.baseclass || defaultoptions.baseclass;
	let visibleClass = useroptions.visibleclass || defaultoptions.visibleclass;
	let hideAgain = (useroptions.hideagain === false) ? false : true;
	let delay = useroptions.delay || defaultoptions.delay;


	const loopAppearances = function (appearances, appearancesInFragment) {
		let time = 0;
		appearances.filter(element => {
			if (!appearancesInFragment.includes(element)) {
				timeincrement = parseInt(element.dataset.delay ? element.dataset.delay : delay);
				setTimeout((function () {
					element.classList.add(visibleClass);
				}), time);
				time += timeincrement;
			}
		});
	};


	const slideAppear = function (event) {

		let parent = document.querySelector(".slides");
		if (event.currentSlide) {
			parent = event.currentSlide.parentNode;
		}

		const showAppearances = function (slide) {
			let appearances = slide.querySelectorAll(`:scope .${baseClass}`);
			let appearancesInFragment = slide.querySelectorAll(`:scope .fragment .${baseClass}`);

			appearances = Array.prototype.slice.call(appearances);
			appearancesInFragment = Array.prototype.slice.call(appearancesInFragment);
			loopAppearances(appearances, appearancesInFragment);

		};


		const slideChanged = function () {
			let thisSlide = Reveal.getCurrentSlide();
			showAppearances(thisSlide);
			thisSlide.parentNode.removeEventListener('transitionend', waitForFadeOut);
		};
		const waitForFadeOut = function (newevent) {
			if (newevent.target.tagName == "SECTION" && newevent.propertyName == "transform") {
				slideChanged() ;
			}
		};
		if (event.type == "ready") {
			slideChanged()
		}

		if ((hideAgain === true) && event.previousSlide) {
			let lastslide = event.previousSlide;
			let disappearances = lastslide.querySelectorAll(`:scope .${baseClass}, .fragment.visible`);
			let disarr = Array.prototype.slice.call(disappearances);

			disarr.filter(element => {
				element.classList.remove(
					element.classList.contains("fragment") ? "visible" : visibleClass
				);
			});
		}

		parent.addEventListener('transitionend', waitForFadeOut);
	};

	const fragmentAppear = function (event) {

		let parent = document.querySelector(".fragment");

		if (event.type == "fragmentshown" || event.type == "fragmenthidden") {
			arent = event.fragment;
		}

		const showAppearances = function (parent) {
			let appearances = parent.querySelectorAll(`:scope .${baseClass}`);
			appearances = Array.prototype.slice.call(appearances);

			if (hideAgain && event.type == "fragmenthidden") {
				appearances.filter(element => {
					element.classList.remove(visibleClass);
				});
			} else {
				loopAppearances(appearances, '');
			}
		};
		showAppearances(parent);
	};


	Reveal.addEventListener('slidechanged', slideAppear, false);
	Reveal.addEventListener('ready', slideAppear), false;
	Reveal.addEventListener('fragmentshown', fragmentAppear, false);
	Reveal.addEventListener('fragmenthidden', fragmentAppear, false);

})();
