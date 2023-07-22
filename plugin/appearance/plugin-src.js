
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

	const isJSON = str => {
		try {
			return (JSON.parse(str) && !!str);
		} catch (e) {
			return false;
		}
	};

	const isObj = (test) => {
		while ( Object.prototype.toString.call(test) === '[object Object]')
		if ((test = Object.getPrototypeOf(test)) === null)
		return true
		return false
	  }

	const selectionArray = function (container, selectors) {
		let selections = container.querySelectorAll(selectors);
		let selectionarray = Array.prototype.slice.call(selections);
		return selectionarray;
	};

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

	function copyDataAttributes(source, target, not) {
		[...source.attributes].filter( attr => attr.nodeName.indexOf('data') > -1).forEach( attr => {
			if ((not && attr.nodeName !== not) || !not) {
				target.setAttribute(attr.nodeName, attr.nodeValue) 
			}
		})
	}


	const appear = function (deck, options) {

		let baseclass = 'animate__animated';
		let viewport = (deck.getRevealElement()).tagName == "BODY" ? document : deck.getRevealElement();
		let appearanceSelector = options.compatibility ? `.${options.compatibilitybaseclass}` : `.${baseclass}`;
		let fragmentSelector = ".fragment";

		let speedClasses = ['slower', 'slow', 'fast', 'faster'];
		speedClasses.push(...speedClasses.map(speed => `animate__${speed}`));

		const generator = document.querySelector('[name=generator]');

		const sections = selectionArray(viewport, "section");
		const regularSections = sections.filter( section => !isStack(section) && section.dataset.visibility != "hidden");

		const fragments = deck.getRevealElement().querySelectorAll(fragmentSelector);
		let animatecss = '[class^="animate__"],[class*=" animate__"]'

		const debugLog = function(text) {
			if (options.debug) console.log(text);
		}

		let url = new URL(window.location);
		let urlparams = new URLSearchParams(url.search);
		if (urlparams.has('receiver')) {
			viewport.classList.add('sv')
			console.log(viewport)
		}

		const assignAutoClass = (section, str, kind) => {

			let index = [...section.parentElement.children].filter(s => s.tagName=="SECTION").indexOf(section) + 1;

			let warning = kind == 'global' ? `JSON Parse error, please try to correct the global "autoelements" option.` : `JSON Parse error, please try to correct the "data-autoappear" attribute on section ${index}`;

			if (typeof str === "string") str = str.replace(/[“”]/g,'"').replace(/[‘’]/g,"'");
	
			let strJSON = isJSON(str) ? str : typeof str === "object" ? JSON.stringify(str, null, 2) : str.trim().replace(/'/g, '"').charAt(0) === "{" ? str.trim().replace(/'/g, '"') : `{${str.trim().replace(/'/g, '"')}}`;


			if (!isJSON(strJSON)) {
				console.log(warning);
			} else {
				let elementsToAnimate = JSON.parse(strJSON);
	
				for (const [element, assignables] of Object.entries(elementsToAnimate)) {
	
					let elementsInSection = section.querySelectorAll(element);

					elementsInSection.forEach(elementInSection => {

						if (!elementInSection.classList.contains(baseclass) || elementInSection.dataset["autoappear"]) {

							elementInSection.dataset["autoappear"] = true;

							let newClasses = [], newDelay = null, speedClass = false;
	
							if (Array.isArray(assignables)) {
								newClasses = assignables[0].split(/[ ,]+/);
								newDelay = assignables[1];
							} else if (typeof assignables == "string"){
								newClasses = assignables.split(/[ ,]+/);
							}
	
							speedClasses.forEach(speed => {
								if (elementInSection.classList.contains(speed)) {
									speedClass = speed;
								}
							})
	
							let classesToRemove = [];
							elementInSection.classList.forEach(currentClass => {
								if (String(currentClass).includes("animate__")) {
									classesToRemove.push(currentClass);
								}
							})
							classesToRemove.forEach(currentClass => {elementInSection.classList.remove(currentClass)});
	
							newClasses.forEach(newClass => {
								if (speedClasses.includes(newClass)) {
									// There is a speed class from JSON to be assigned
									if (speedClass) { speedClass = newClass }
								}
							});
	
							newClasses.forEach(newClass => {
								elementInSection.classList.add(newClass);
							});

							if (speedClass) {
								elementInSection.classList.add(speedClass);
							}
	


							
							if (newDelay) {
								elementInSection.dataset.delay = newDelay;
							}
	
							elementInSection.classList.add(baseclass);

						}


					});
				}
			}
		};

		const findAppearancesIn = function (container, includeClass, excludeClass) {
			if (!isStack(container)) {
				let appearances = selectionArray(container, `:scope ${includeClass}`);

				appearances.forEach(appearance => {

					let convertListItem = (appearance) => {
						let from = appearance, to = appearance.parentNode;
						if (!to) return
						for (let sibling of to.children) {
							if (sibling !== appearance) { if (sibling.dataset.appearParent) return }
						}
						to.classList = from.classList;
						copyDataAttributes(from, to, "data-appear-parent");
						to.innerHTML = from.innerHTML;
					}

					// Conversion of list items with Appearance classes to the parent, needs manual attribute
					// Relates to Quarto wrapping list content in a span.
					if (appearance.hasAttribute("data-appear-parent")) {
						convertListItem(appearance);
					}

					// Automatic conversion of list items which directly contain spans.
					// Relates to Quarto wrapping list content in a span.
					if (options.appearparents) {
						if (appearance.parentNode && appearance.parentNode.tagName) {
							if (appearance.tagName == "SPAN" && appearance.parentNode.tagName == "LI") {
								let spanLength = String(appearance.outerHTML).length;
								let liContentLength = String(appearance.parentNode.innerHTML).length;
								if (spanLength == liContentLength) {
								  convertListItem(appearance);
								}
							}
						}
					}


				});

				appearances = selectionArray(container, `:scope ${includeClass}`);
				let excludes = selectionArray(container, `:scope ${excludeClass} ${includeClass}`);
				let delay = 0;

				appearances.filter(function (appearance, index) {
					if ( !(excludes.indexOf(appearance) > -1 )  ) {
						if ((index == 0 && appearance.dataset.delay) || index !=0) {

							let elementDelay = options.delay; 
							if (appearance.dataset && appearance.dataset.delay) {
								elementDelay = parseInt(appearance.dataset.delay);
							}

							delay = delay + elementDelay;

							// Allow fragments to be Appearance items
							if (appearance.classList.contains("fragment")) {
								delay = 0;
								if (appearance.querySelectorAll(`.${baseclass}`)) {
									let firstNestedAppearance = appearance.querySelectorAll(`.${baseclass}`)[0];

									if (firstNestedAppearance) {
										let elementDelay = options.delay; 
										if (firstNestedAppearance.dataset && firstNestedAppearance.dataset.delay) {
											elementDelay = parseInt(firstNestedAppearance.dataset.delay);
										}
										firstNestedAppearance.dataset.delay = elementDelay
									}
								}
							}
							appearance.style.setProperty('animation-delay', delay + "ms");
						}
					}
				})
			}
		}

		const autoAdd = function () {

			regularSections.forEach(section => {

				if (section.hasAttribute("data-autoappear")) {

					let sectDataAppear = section.dataset.autoappear;

					if (sectDataAppear == "auto" || sectDataAppear == "" || sectDataAppear.length < 1 || sectDataAppear == "true") {
						// This section should get the global autoappear classes on its objects
						if (options.autoelements) {
							if (!options.autoelements) {
								return console.log(`Please add some elements in the option "autoelements"`);
							}
							assignAutoClass(section, options.autoelements, 'global')
						}
					} else if (sectDataAppear.length > 0) {
						// This section should get the local data-autoappear classes on its objects
						assignAutoClass(section, sectDataAppear, 'local');
						//section.removeAttribute("data-autoappear");
					}
				} else {

					if (options.autoappear) {
						if (!options.autoelements) {
							return console.log(`Please add some elements in the option "autoelements"`);
						}
						// This section should get the global autoappear classes on its objects
						assignAutoClass(section, options.autoelements, 'global')
					}
				}
			});

		}

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
			appearparents: false,
			csspath: '',
			animatecsspath: {
				link : 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
				compat : 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.compat.css',
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