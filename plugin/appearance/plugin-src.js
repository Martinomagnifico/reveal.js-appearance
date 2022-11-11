
const Plugin = () => {

	// Scope support polyfill
	try{document.querySelector(":scope *")}catch(t){!function(t){let e=/:scope(?![\w-])/gi,r=u(t.querySelector);t.querySelector=function(t){return r.apply(this,arguments)};let c=u(t.querySelectorAll);if(t.querySelectorAll=function(t){return c.apply(this,arguments)},t.matches){let n=u(t.matches);t.matches=function(t){return n.apply(this,arguments)}}if(t.closest){let o=u(t.closest);t.closest=function(t){return o.apply(this,arguments)}}function u(t){return function(r){if(r&&e.test(r)){let c="q"+Math.floor(9e6*Math.random())+1e6;arguments[0]=r.replace(e,"["+c+"]"),this.setAttribute(c,"");let n=t.apply(this,arguments);return this.removeAttribute(c),n}return t.apply(this,arguments)}}}(Element.prototype)}

	const loadStyle = function(url, type, callback) {
		let head = document.querySelector('head');
		let style;
		style = document.createElement('link');
		style.rel = 'stylesheet';
		style.href = url;

		let finish = function () {
			if (typeof callback === 'function') {
				callback.call();
				callback = null;
			}
		};
	
		style.onload = finish;
	
		style.onreadystatechange = function () {
			if (this.readyState === 'loaded') {
				finish();
			}
		};
		head.appendChild(style);
	}

	const selectionArray = function (container, selectors) {
		let selections = container.querySelectorAll(selectors);
		let selectionarray = Array.prototype.slice.call(selections);
		return selectionarray;
	};

	const appear = function (deck, options) {

		let baseclass = 'animate__animated';
		let appearanceSelector = options.compatibility ? `.${options.compatibilitybaseclass}` : `.${baseclass}`;
		let fragmentSelector = ".fragment"

		const sections = deck.getRevealElement().querySelectorAll(`.slides section`);
		const fragments = deck.getRevealElement().querySelectorAll(fragmentSelector);
		let animatecss = '[class^="animate__"],[class*=" animate__"]'

		const debugLog = function(text) {
			if (options.debug) console.log(text);
		}

		const findAppearancesIn = function (container, includeClass, excludeClass) {
			if (!isStack(container)) {
				let appearances = selectionArray(container, `:scope ${includeClass}`);
				let excludes = selectionArray(container, `:scope ${excludeClass} ${includeClass}`);
				let delay = 0;
		
				appearances.filter(function (appearance, index) {
					if (  !(excludes.indexOf(appearance) > -1 )  ) {
						if ((index == 0 && appearance.dataset.delay) || index !=0) {
							let elementDelay = appearance.dataset.delay ? (parseInt(appearance.dataset.delay)) : options.delay; 
							delay = delay + elementDelay;
							appearance.style.setProperty('animation-delay', delay + "ms");
						}
					}
				})
			}
		}

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
							if (!autoAppearance.classList.contains(baseclass)) {
								autoAppearance.classList.add(baseclass);
								autoAppearance.classList.add(autoanimation);
							}
						});
					}
				}
			} else if (options.autoappear) {
				console.log(`Please set an "autoelements" object.`);
			}
		}

		const isStack = function (section) {
			let isStack = false;
			for (let i = 0; i < section.childNodes.length; i++) {
				if (section.childNodes[i].tagName == "SECTION") {
					isStack = true
					break;
				}
			}
			return isStack;
		};

		if (options.compatibility) {
			animatecss = '.backInDown, .backInLeft, .backInRight, .backInUp, .bounceIn, .bounceInDown, .bounceInLeft, .bounceInRight, .bounceInUp, .fadeIn, .fadeInDown, .fadeInDownBig, .fadeInLeft, .fadeInLeftBig, .fadeInRight, .fadeInRightBig, .fadeInUp, .fadeInUpBig, .fadeInTopLeft, .fadeInTopRight, .fadeInBottomLeft, .fadeInBottomRight, .flipInX, .flipInY, .lightSpeedInRight, .lightSpeedInLeft, .rotateIn, .rotateInDownLeft, .rotateInDownRight, .rotateInUpLeft, .rotateInUpRight, .jackInTheBox, .rollIn, .zoomIn, .zoomInDown, .zoomInLeft, .zoomInRight, .zoomInUp, .slideInDown, .slideInLeft, .slideInRight, .slideInUp, .skidLeft, .skidLeftBig, .skidRight, .skidRightBig, .shrinkIn, .shrinkInBlur';
			baseclass = options.compatibilitybaseclass
		}

		let allappearances = deck.getRevealElement().querySelectorAll(animatecss);

		allappearances.forEach(appearance => {
			if (!appearance.classList.contains(baseclass)) {
				appearance.classList.add(baseclass);
			}
		});

		autoAdd();

		sections.forEach(section => {
			findAppearancesIn(section, appearanceSelector, fragmentSelector);
		})
	
		fragments.forEach(fragment => {
			findAppearancesIn(fragment, appearanceSelector, fragmentSelector);
		})

		const fromTo = function (event) {
			let slides = {}
			slides.from = event.fromSlide ? event.fromSlide : event.previousSlide ? event.previousSlide : null;
			slides.to = event.toSlide ? event.toSlide : event.currentSlide ? event.currentSlide : null;
			return slides
		}

		const showHideSlide = function(event) {

			let etype = event.type;
			let slides = fromTo(event);
			debugLog(etype);

			if (slides.to?.dataset.appearevent == "auto") {slides.to.dataset.appearevent = "autoanimate"}
			if (options.appearevent == "auto") {options.appearevent = "autoanimate"}

			if (etype == "ready") {
				slides.to.dataset.appearanceCanStart = true;
			}

			if (slides.to) {

				let appearevent = slides.to.dataset.appearevent ? slides.to.dataset.appearevent : options.appearevent;

				if (etype == appearevent || (etype == "slidetransitionend" && appearevent == "autoanimate")) {
					slides.to.dataset.appearanceCanStart = true;
				}

				if (etype == "slidetransitionend") {
					if (options.hideagain) {
						if (slides.from) {
							if (slides.from.dataset.appearanceCanStart) {
								delete slides.from.dataset.appearanceCanStart;
							}
							let fromFragments = slides.from.querySelectorAll(`.fragment.visible`);
							if (fromFragments) {
								fromFragments.forEach(fragment => {
									fragment.classList.remove('visible');
								})
							}
						}
					}
				}
				
				if (event.type == 'slidechanged' && document.body.dataset.exitoverview) {
					if (options.hideagain) {
						delete slides.from?.dataset.appearanceCanStart;
					}
					slides.to.dataset.appearanceCanStart = true;

				} else if (event.type == 'overviewhidden' ) {

					document.body.dataset.exitoverview = true;

					setTimeout(function () {
						document.body.removeAttribute('data-exitoverview')
					}, 500)
		
					if (event.currentSlide ) {
						if (options.hideagain) {
							delete slides.from?.dataset.appearanceCanStart;
						}
						slides.to.dataset.appearanceCanStart = true;
					}
				}
			}
		}

		const eventnames = ['ready', 'slidechanged', 'slidetransitionend', 'autoanimate', 'overviewhidden'];
		eventnames.forEach( (eventname) => deck.on( eventname, event => { showHideSlide(event) } ) )
	};

	const init = function (deck) {

		let es5Filename = "appearance.js"

		let defaultOptions = {
			baseclass: 'animate__animated',
			hideagain: true,
			delay: 300,
			debug: false,
			appearevent: 'slidetransitionend',
			autoappear: false,
			autoelements: false,
			csspath: '',
			animatecsspath: {
				link : 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
				compat : 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.compat.css',
			},
			compatibility: false,
			compatibilitybaseclass: 'animated'
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

		function pluginPath() {
			let path;
			let pluginScript = document.querySelector(`script[src$="${es5Filename}"]`);
			if (pluginScript) {
				path = pluginScript.getAttribute("src").slice(0, -1 * (es5Filename.length));
			} else {
				path = import.meta.url.slice(0, import.meta.url.lastIndexOf('/') + 1);
			}
			return path;
		}

		let AppearanceStylePath = options.csspath.appearance ? options.csspath.appearance : null || `${pluginPath()}appearance.css` || 'plugin/appearance/appearance.css'
		let AnimateCSSPath = !options.compatibility ? options.animatecsspath.link : options.animatecsspath.compat;

		if (options.debug) {
			console.log(`Plugin path = ${pluginPath()}`);
			console.log(`Compatibility mode: ${options.compatibility}`)
			console.log(`Appearance CSS path = ${AppearanceStylePath}`);
			console.log(`AnimateCSS CSS path = ${AnimateCSSPath}`);
		}

		loadStyle(AnimateCSSPath, 'stylesheet', function () {
			loadStyle(AppearanceStylePath, 'stylesheet');
		});

		appear(deck, options);
	};

	return {
		id: 'appearance',
		init: init
	};
};

export default Plugin;