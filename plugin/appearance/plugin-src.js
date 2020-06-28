
const Plugin = () => {

	// Scope support polyfill
	try{document.querySelector(":scope *")}catch(t){!function(t){let e=/:scope(?![\w-])/gi,r=u(t.querySelector);t.querySelector=function(t){return r.apply(this,arguments)};let c=u(t.querySelectorAll);if(t.querySelectorAll=function(t){return c.apply(this,arguments)},t.matches){let n=u(t.matches);t.matches=function(t){return n.apply(this,arguments)}}if(t.closest){let o=u(t.closest);t.closest=function(t){return o.apply(this,arguments)}}function u(t){return function(r){if(r&&e.test(r)){let c="q"+Math.floor(9e6*Math.random())+1e6;arguments[0]=r.replace(e,"["+c+"]"),this.setAttribute(c,"");let n=t.apply(this,arguments);return this.removeAttribute(c),n}return t.apply(this,arguments)}}}(Element.prototype)}

	const appear = function (deck, options) {

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
	
		const showAppearances = function (container) {
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
	
		const showHideSlide = function (event) {

			clearTimeOuts(timeouts);
			showAppearances(event.currentSlide);
	
			if (event.previousSlide && options.hideagain) {
				hideAppearances(event.previousSlide);
			}
		};
	
		const showHideFragment = function (event) {
			if (event.type == "fragmentshowncomplete" || event.type == "fragmentshown") {
				showAppearances(event.fragment);
			} else {
				hideAppearances(event.fragment);
			}
		};

		deck.on( 'ready', event => { showHideSlide(event) } );
		deck.on( 'slidetransitionend', event => {showHideSlide(event)  });
		deck.on( 'fragmentshown', event => {showHideFragment(event)  });
		deck.on( 'fragmenthidden', event => {showHideFragment(event)  });
	};

	const init = function (deck) {

		let defaultOptions = {
			baseclass: 'animated',
			visibleclass: 'in',
			hideagain: true,
			delay: 300
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