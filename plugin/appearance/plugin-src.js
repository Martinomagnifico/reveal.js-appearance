
const Plugin = () => {

	// Scope support polyfill
	try{document.querySelector(":scope *")}catch(t){!function(t){let e=/:scope(?![\w-])/gi,r=u(t.querySelector);t.querySelector=function(t){return r.apply(this,arguments)};let c=u(t.querySelectorAll);if(t.querySelectorAll=function(t){return c.apply(this,arguments)},t.matches){let n=u(t.matches);t.matches=function(t){return n.apply(this,arguments)}}if(t.closest){let o=u(t.closest);t.closest=function(t){return o.apply(this,arguments)}}function u(t){return function(r){if(r&&e.test(r)){let c="q"+Math.floor(9e6*Math.random())+1e6;arguments[0]=r.replace(e,"["+c+"]"),this.setAttribute(c,"");let n=t.apply(this,arguments);return this.removeAttribute(c),n}return t.apply(this,arguments)}}}(Element.prototype)}

	const appear = function (deck, options) {

		const debugLog = function(text) {
			if (options.debug) console.log(text);
		}

		let timeouts = [];

		const clearTimeOuts = function (timeouts) {
			for (let i=0; i<timeouts.length; i++) {
				clearTimeout(timeouts[i]);
			}
			timeouts = [];
		};

		const loopAppearances = function (appearances, appearancesInFragment) {
			let delay = 0;

			appearances.filter(function (element, i) {
				if (!(appearancesInFragment.indexOf(element) > -1)) {
					let delayincrement = parseInt(element.dataset.delay ? element.dataset.delay : i > 0 ? options.delay : 0);
					delay += delayincrement;
					timeouts.push(
						setTimeout(function () {
							element.classList.add(options.visibleclass);
						}, delay)
					);
				}
			});
		};
	
		const selectionArray = function (container, selectors) {
			let selections = container.querySelectorAll(selectors);
			let selectionarray = Array.prototype.slice.call(selections);
			return selectionarray;
		};

		const autoAdd = function () {

			if (options.autoelements) {

				for (const [autoelement, autoanimation] of Object.entries(options.autoelements)) {

					if (options.autoappear) {
						debugLog(`All "${autoelement}"" elements will animate with ${autoanimation}`);
					}
					let autosection = options.autoappear ? "" : "[data-autoappear] ";
					let autoAppearances = deck.getRevealElement().querySelectorAll(`.slides ${autosection}${autoelement}`);

					if (autoAppearances.length > 0) {
						autoAppearances.forEach(autoAppearance => {
							if (!autoAppearance.classList.contains(options.baseclass)) {
								autoAppearance.classList.add(options.baseclass);
								autoAppearance.classList.add(autoanimation);
							}
						});
					}

				}
			} else if (options.autoappear) {
				console.log(`Please set an "autoelements" object.`);
			}
		}
	
		const showAppearances = function (container) {
			clearTimeOuts(timeouts);
			let appearances = selectionArray(container, ":scope ." + options.baseclass);
			let appearancesInFragment = selectionArray(container, ":scope .fragment .".concat(options.baseclass));

			loopAppearances(appearances, appearancesInFragment);
		};
	
		const hideAppearances = function (container) {
			let disappearances = selectionArray(container, ":scope .".concat(options.baseclass, ", :scope .fragment.visible"));
			disappearances.filter(function (element) {
				element.classList.remove(element.classList.contains("fragment") ? "visible" : options.visibleclass);
			});
		};

		const fromTo = function (event) {
			let slides = {}
			slides.from = event.fromSlide ? event.fromSlide : event.previousSlide ? event.previousSlide : null;
			slides.to = event.toSlide ? event.toSlide : event.currentSlide ? event.currentSlide : null;
			return slides
		}

		const showHideSlide = function (event) {

			let slides = fromTo(event);

			if (slides.to.dataset.appearevent == "auto") {slides.to.dataset.appearevent = "autoanimate"}
			if (options.appearevent == "auto") {options.appearevent = "autoanimate"}

			if ( !slides.to.dataset.eventdone ) {

				debugLog(`Event: '${event.type}'`);

				if (event.type == "ready") {
					showAppearances(slides.to);

				} else if (event.type == slides.to.dataset.appearevent) {
					slides.to.dataset.eventdone = true;
					showAppearances(slides.to);

				} else if (event.type == options.appearevent) {
					
					slides.to.dataset.eventdone = true;
					showAppearances(slides.to);

				} else if (event.type == "slidetransitionend" && options.appearevent == "autoanimate" ) {
					slides.to.dataset.eventdone = true;
					showAppearances(slides.to);

				} else if (event.type == 'slidechanged' && document.body.dataset.exitoverview) {
					if (slides.from && options.hideagain) {
						hideAppearances(slides.to);
					}
					showAppearances(slides.to);
					slides.to.dataset.eventdone = true;

				} else if (event.type == 'overviewhidden' ) {

					document.body.dataset.exitoverview = true;

					setTimeout(function () {
						document.body.removeAttribute('data-exitoverview')
					}, 500)
		
					if (event.currentSlide ) {

						if (slides.from && options.hideagain) {
							hideAppearances(event.previousSlide);
						}
						showAppearances(slides.to);
						event.currentSlide.dataset.eventdone = true;
					}
				}
			}
			if (event.type == "slidechanged" && slides.from) {
				slides.from.removeAttribute('data-eventdone');
			} 

			if (slides.from ) {
				if (event.type == 'slidetransitionend' && options.hideagain) {
					hideAppearances(slides.from);
				}
			}
		};
	
		const showHideFragment = function (event) {
			if (event.type == "fragmentshowncomplete" || event.type == "fragmentshown") {
				showAppearances(event.fragment);
			} else {
				hideAppearances(event.fragment);
			}
		};

		deck.on( 'ready', event => { autoAdd(); showHideSlide(event) } );
		deck.on( 'slidechanged', event => { showHideSlide(event) } );
		deck.on( 'slidetransitionend', event => { showHideSlide(event) } );
		deck.on( 'autoanimate', event => { showHideSlide(event) } );
		deck.on( 'overviewhidden', event => { showHideSlide(event) } );
		deck.on( 'fragmentshown', event => { showHideFragment(event) });
		deck.on( 'fragmenthidden', event => { showHideFragment(event) });
	};

	const init = function (deck) {

		let defaultOptions = {
			baseclass: 'animated',
			visibleclass: 'in',
			hideagain: true,
			delay: 300,
			debug: false,
			appearevent: 'slidetransitionend',
			autoappear: false,
			autoelements: null
		};

		const defaults = function (options, defaultOptions) {
			for ( let i in defaultOptions ) {
				if ( !options.hasOwnProperty( i ) ) {
					options[i] = defaultOptions[i];
				}
			}
		}

		let options = deck.getConfig().appearance || {};
		defaults(options, defaultOptions);

		appear(deck, options);

	};

	return {
		id: 'appearance',
		init: init
	};
};

export default Plugin;