
/*****************************************************************
 *
 * Appearance for Reveal.js 
 * Version 1.3.0
 * 
 * @author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/martinomagnifico
 *
 * @license 
 * MIT licensed
 * 
 * Copyright (C) 2023 Martijn De Jongh (Martino)
 *
 ******************************************************************/

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Appearance = factory());
})(this, (function () { 'use strict';

	/**
	 * Check if a given string is valid JSON.
	 * @param {string} str - The string to be checked.
	 * @returns {boolean} `true` if the string is valid JSON, otherwise `false`.
	 */
	const isJSON = str => {
	  try {
	    return JSON.parse(str) && !!str;
	  } catch (e) {
	    return false;
	  }
	};

	/**
	 * Check if an element has child nodes that are `SECTION` elements.
	 * @param {Object} param0 - Object with childNodes property.
	 * @param {NodeListOf<ChildNode>} param0.childNodes - List of child nodes of the element.
	 * @returns {boolean} `true` if the element contains `SECTION` child nodes, otherwise `false`.
	 */
	const isStack = _ref => {
	  let {
	    childNodes
	  } = _ref;
	  let isStack = false;
	  for (let i = 0; i < childNodes.length; i++) {
	    if (childNodes[i].tagName == "SECTION") {
	      isStack = true;
	      break;
	    }
	  }
	  return isStack;
	};

	/**
	 * Copy data attributes from a source element to a target element with an optional exception.
	 * @param {Object} param0 - Object with attributes property.
	 * @param {NamedNodeMap} param0.attributes - Map of attributes of the source element.
	 * @param {Element} target - Target element to copy attributes to.
	 * @param {string} [not] - Optional attribute name to exclude from copying.
	 */
	const copyDataAttributes = (_ref2, target, not) => {
	  let {
	    attributes
	  } = _ref2;
	  [...attributes].filter(_ref3 => {
	    let {
	      nodeName
	    } = _ref3;
	    return nodeName.includes('data');
	  }).forEach(_ref4 => {
	    let {
	      nodeName,
	      nodeValue
	    } = _ref4;
	    if (not && nodeName !== not || !not) {
	      target.setAttribute(nodeName, nodeValue);
	    }
	  });
	};

	/**
	 * Check if the given item is an object and not an array.
	 * @param {*} item - The item to be checked.
	 * @returns {boolean} `true` if the item is an object and not an array, otherwise `false`.
	 */
	const isObject = item => {
	  return item && typeof item === 'object' && !Array.isArray(item);
	};

	/**
	 * Deep merge multiple objects into a target object.
	 * @param {Object} target - Target object to merge values into.
	 * @param {...Object} sources - Source objects to merge from.
	 * @returns {Object} The merged object.
	 */
	const mergeDeep = function (target) {
	  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    sources[_key - 1] = arguments[_key];
	  }
	  if (!sources.length) return target;
	  const source = sources.shift();
	  if (isObject(target) && isObject(source)) {
	    for (const key in source) {
	      if (isObject(source[key])) {
	        if (!target[key]) Object.assign(target, {
	          [key]: {}
	        });
	        mergeDeep(target[key], source[key]);
	      } else {
	        Object.assign(target, {
	          [key]: source[key]
	        });
	      }
	    }
	  }
	  return mergeDeep(target, ...sources);
	};

	/**
	 * Resolves the given Promise immediately using setTimeout.
	 * @param {Function} resolve - The resolve function of a Promise.
	 * @returns {number} The ID value of the timer that is set.
	 */
	const doneLoading = resolve => {
	  return setTimeout(resolve, 0);
	};

	/**
	 * Converts a JavaScript object or a JSON-formatted string to a JSON string.
	 *
	 * @param {Object|string} str - The input string or object to be converted to a JSON string.
	 * @returns {string} The JSON string.
	 */
	const toJSONString = str => {
	  let JSONString = '';
	  if (typeof str === "string") str = str.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
	  if (isJSON(str)) {
	    JSONString = str;
	  } else {
	    if (typeof str === "object") {
	      JSONString = JSON.stringify(str, null, 2);
	    } else {
	      JSONString = str.trim().replace(/'/g, '"').charAt(0) === "{" ? str.trim().replace(/'/g, '"') : `{${str.trim().replace(/'/g, '"')}}`;
	    }
	  }
	  return JSONString;
	};

	/**
	 * Dynamically loads a stylesheet from the specified URL and calls a callback function when it's loaded.
	 *
	 * @param {string} url - The URL of the stylesheet to load.
	 * @param {Function} callback - A callback function to be called when the stylesheet is loaded.
	 */
	const loadStyle = (url, callback) => {
	  const head = document.querySelector('head');
	  const style = document.createElement('link');
	  style.rel = 'stylesheet';
	  style.href = url;
	  style.onload = () => {
	    if (typeof callback === 'function') {
	      callback.call();
	      callback = null;
	    }
	  };
	  style.onreadystatechange = () => {
	    if (style.readyState === 'loaded') {
	      style.onload();
	    }
	  };
	  head.appendChild(style);
	};

	/**
	 * Retrieves the path of a JavaScript file based on its filename.
	 *
	 * @param {string} fileName - The filename of the script.
	 * @returns {string} The path to the plugin's location.
	 */
	const pluginPath = fileName => {
	  let path;
	  let pluginScript = document.querySelector(`script[src$="${fileName}"]`);
	  if (pluginScript) {
	    path = pluginScript.getAttribute("src").slice(0, -1 * fileName.length);
	  } else {
	    path = (typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('appearance.js', document.baseURI).href)).slice(0, (typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('appearance.js', document.baseURI).href)).lastIndexOf('/') + 1);
	  }
	  return path;
	};
	const debugLog = (options, text) => {
	  if (options.debug) console.log(text);
	};

	/**
	 * Retrieves and loads CSS stylesheets based on the provided options and ES5 filename.
	 *
	 * @param {Object} options - Configuration options for loading CSS.
	 * @param {string} fileName - The filename of the script.
	 */

	const getAndLoadCSS = (options, fileName) => {
	  let thePath = pluginPath(fileName);
	  let pluginBaseName = fileName.replace(/\.[^/.]+$/, "");
	  let AppearanceStylePath = options.csspath.appearance ? options.csspath.appearance : `${thePath}${pluginBaseName}.css` || `plugin/${pluginBaseName}/${pluginBaseName}.css`;
	  let AnimateCSSPath = !options.compatibility ? options.animatecsspath.link : options.animatecsspath.compat;
	  if (options.debug) {
	    console.log(`Paths:`);
	    console.log(`  - Plugin path = ${thePath}`);
	    console.log(`  - Appearance CSS path = ${AppearanceStylePath}`);
	    console.log(`  - AnimateCSS CSS path = ${AnimateCSSPath}`);
	  }
	  loadStyle(AnimateCSSPath, function () {
	    loadStyle(AppearanceStylePath);
	  });
	};

	/**
	 * Adds automatic animations to elements within a section based on specified criteria.
	 *
	 * This function examines the provided section for attributes and options to determine
	 * which classes should be added to its elements to enable automatic animations.
	 *
	 * @param {HTMLElement} section - The section element to which automatic animations will be applied.
	 * @param {Object} options - The existing user options object
	 * @param {Object} vars - The existing vars object
	 * @returns {undefined}
	 */
	const addAutoAnimation = (section, options, vars) => {
	  let sectionAutoSelectors = null;
	  if (section.hasAttribute("data-autoappear")) {
	    let sectDataAppear = section.dataset.autoappear;
	    if (sectDataAppear == "auto" || sectDataAppear == "" || sectDataAppear.length < 1 || sectDataAppear == "true") {
	      // This section should get the global autoappear classes on its objects
	      sectionAutoSelectors = options.autoelements ? options.autoelements : null;
	    } else {
	      // This section should get the local autoappear classes on its objects
	      sectionAutoSelectors = sectDataAppear;
	    }
	  } else if (options.autoappear && options.autoelements) {
	    // This section should get the global autoappear classes on its objects
	    sectionAutoSelectors = options.autoelements;
	  }
	  if (sectionAutoSelectors) {
	    let elementsToAnimate = JSON.parse(toJSONString(sectionAutoSelectors));
	    Object.entries(elementsToAnimate).forEach(_ref => {
	      let [selector, assignables] = _ref;
	      // Exclude the elements from vars.appearances
	      let elements = Array.from(section.querySelectorAll(selector)).filter(element => !vars.appearances.includes(element));
	      if (elements.length) {
	        elements.forEach(element => {
	          vars.appearances.push(element);
	          let newClasses = [],
	            newDelay = null,
	            speedClass = false,
	            elementSplit = null,
	            containerDelay = null;
	          if (Array.isArray(assignables)) {
	            newClasses = assignables[0].split(/[ ,]+/);
	            newDelay = assignables[1];
	          } else if (typeof assignables == "string") {
	            newClasses = assignables.split(/[ ,]+/);
	          } else if (assignables.constructor === Object) {
	            if (assignables.class || assignables.animation) {
	              let animationClass = assignables.animation ? assignables.animation : assignables.class;
	              newClasses = animationClass.split(/[ ,]+/);
	            }
	            if (assignables.speed) {
	              speedClass = String(assignables.speed);
	              if (!speedClass.includes("animate__")) {
	                speedClass = `animate__${speedClass}`;
	              }
	            }
	            if (assignables.delay) {
	              newDelay = String(assignables.delay);
	            }
	            if (assignables.split) {
	              elementSplit = String(assignables.split);
	            }
	            if (assignables["container-delay"]) {
	              containerDelay = String(assignables["container-delay"]);
	            }
	          }
	          element.classList.add(...newClasses);
	          if (speedClass) {
	            element.classList.add(speedClass);
	          }
	          if (newDelay) {
	            element.dataset.delay = newDelay;
	          }
	          if (elementSplit) {
	            element.dataset.split = elementSplit;
	          }
	          if (containerDelay) {
	            element.dataset.containerDelay = containerDelay;
	          }
	        });
	      }
	    });
	  }
	};

	/**
	 * Hoist a list item's appearance to its parent element's appearance.
	 *
	 * @param {HTMLElement} from - The list item element.
	 * @returns {undefined}
	 */
	const hoistAppearance = (from, baseclass) => {
	  let to = from.parentNode;
	  if (!to) return;
	  for (const sibling of to.children) {
	    if (sibling !== from && sibling.dataset.appearParent) return;
	  }
	  to.classList = from.classList;
	  copyDataAttributes(from, to, "data-appear-parent");
	  to.innerHTML = from.innerHTML;
	  to.classList.add(baseclass);
	};

	/**
	 * Fix list items that were changed by Quarto.
	 *
	 * This function is designed for use with Quarto and handles the conversion of list items
	 * with Appearance classes to their parent elements when a manual attribute is present.
	 * It also provides automatic conversion for list items that directly contain spans, which
	 * is related to Quarto's wrapping of list content in a span.
	 *
	 * @param {HTMLElement} appearance - The list item element whose appearance will be converted.
	 * @param {Object} options - An options object that controls the conversion behavior.
	 * @param {boolean} options.appearparents - If `true`, automatic conversion of list items with spans is enabled.
	 * @returns {undefined}
	 */
	const fixListItem = (appearance, options, names) => {
	  let baseclass = names.baseclass;
	  if (appearance.hasAttribute("data-appear-parent")) {
	    hoistAppearance(appearance, baseclass);
	  }
	  if (options.appearparents) {
	    if (appearance.parentNode && appearance.parentNode.tagName) {
	      if (appearance.tagName == "SPAN" && appearance.parentNode.tagName == "LI") {
	        let spanLength = String(appearance.outerHTML).length;
	        let liContentLength = String(appearance.parentNode.innerHTML).length;
	        if (spanLength == liContentLength) {
	          hoistAppearance(appearance);
	        }
	      }
	    }
	  }
	};

	/**
	 * Adds a base class to an HTML element if it doesn't already have it.
	 *
	 * This function checks if the specified HTML element has the specified base class,
	 * and if not, it adds the base class to the element's class list.
	 *
	 * @param {HTMLElement} appearance - The HTML element to which the base class should be added.
	 * @param {Object} names - The existing 'names' object
	 * @returns {undefined}
	 */

	const addBaseClass = (appearance, names) => {
	  if (!appearance.classList.contains(names.baseclass)) {
	    appearance.classList.add(names.baseclass);
	  }
	  if (appearance.classList.contains(names.fragmentClass)) {
	    appearance.classList.add('custom');
	  }
	};

	const addDelay = (appearanceArray, options, names) => {
	  let delay = 0;
	  appearanceArray.forEach((appearance, index) => {
	    if (index == 0 && appearance.dataset.delay || index != 0) {
	      let elementDelay = options.delay;
	      if (appearance.dataset && appearance.dataset.delay) {
	        elementDelay = parseInt(appearance.dataset.delay);
	      }
	      delay = delay + elementDelay;
	      appearance.style.setProperty('animation-delay', delay + "ms");
	      appearance.removeAttribute('data-delay');
	    }
	  });
	};

	/**
	 * Selects elements with a specified class that are not nested inside an element with another specified class.
	 * @param {string} targetClass - The class name to select elements.
	 * @param {string} excludeClass - The class name to exclude elements nested inside it.
	 * @param {Element} el - The element to find the target elements in.
	 * @returns {Element[]} - Array of selected elements.
	 */
	const elemsNotInClass = (targetClass, excludeClass, el) => Array.from(el.querySelectorAll(`.${targetClass}`)).filter(s => !s.closest(`.${excludeClass}`));

	/**
	 * Selects elements with a specified class that are nested inside an element with another specified class.
	 * @param {string} targetClass - The class name to select elements.
	 * @param {string} parentClass - The class name of the parent to find elements in.
	 * @param {Element} el - The element to find the target elements in.
	 * @returns {Element[]} - Array of selected elements.
	 */
	const elemsInClass = (targetClass, parentClass, el) => Array.from(el.querySelectorAll(`.${targetClass}`)).filter(s => s.closest(`.${parentClass}`) === el);

	/**
	 * Extracts groups of elements with a specified class from the provided section element.
	 * Groups are formed based on nesting inside elements with another specified class.
	 * @param {Element} section - The section to extract data from.
	 * @returns {Element[][]} - Nested arrays of selected elements.
	 */

	/**
	 * Extracts groups of elements with a specified class from the provided section element.
	 * Groups are formed based on nesting inside elements with another specified class.
	 * @param {Element} section - The section to extract data from.
	 * @param {string} targetClass - The class name to select elements.
	 * @param {string} groupClass - The class name of the parent to find elements in.
	 * @returns {Element[][]} - Nested arrays of selected elements.
	 */
	const getAppearanceArrays = (section, targetClass, groupClass) => {
	  const result = [elemsNotInClass(targetClass, groupClass, section), ...Array.from(section.querySelectorAll(`.${groupClass}`)).map(frag => elemsInClass(targetClass, groupClass, frag))];
	  if (result.some(group => group.length > 0)) {
	    return result;
	  } else {
	    return false;
	  }
	};

	const convertToSpans = (parent, kind) => {
	  let splitElements = false;
	  let joinChar = ' ';
	  if (kind == "words") {
	    splitElements = parent.textContent.trim().split(/\s+/);
	  } else if (kind == "letters") {
	    splitElements = parent.textContent.trim().split('');
	    joinChar = '';
	  }
	  if (splitElements) {
	    const parentAnimateClasses = Array.from(parent.classList).filter(className => className.startsWith('animate__'));
	    const newHtml = splitElements.map((element, index) => {
	      const span = document.createElement('span');
	      span.textContent = element;
	      if (element == " ") {
	        span.textContent = "\u00A0";
	      }
	      if (parent.dataset.delay && index !== 0) {
	        span.dataset.delay = parent.dataset.delay;
	      }
	      if (parent.dataset.containerDelay && index === 0) {
	        span.dataset.delay = parent.dataset.containerDelay;
	      }
	      parent.classList.forEach(className => className.startsWith('animate__') && span.classList.add(className));
	      return span.outerHTML;
	    }).join(joinChar);
	    parentAnimateClasses.forEach(className => parent.classList.remove(className));
	    parent.removeAttribute('data-delay');
	    parent.removeAttribute('data-split');
	    parent.removeAttribute('data-container-delay');
	    parent.innerHTML = newHtml;
	  }
	};

	/**
	 * Derives slide from and to from the event object.
	 *
	 * @param {Object} event - The event object containing slide transition details.
	 * @returns {Object} - An object containing references to the "from" and "to" slides.
	 */
	const fromTo = event => {
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
	  if (toSlide.dataset.appearevent && toSlide.dataset.appearevent === "auto") {
	    toSlide.dataset.appearevent = "autoanimate";
	  }
	  if (options.appearevent == "auto") {
	    options.appearevent = "autoanimate";
	  }
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
	    if (slides.from && slides.from.dataset.appearanceCanStart) {
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
	    fromAppearances.forEach(appearance => {
	      appearance.classList.remove('animationended');
	    });
	    // Remove visible class from fragments when moving away from that slide
	    let fromFragments = slides.from.querySelectorAll(`.fragment.visible`);
	    if (fromFragments) {
	      fromFragments.forEach(fragment => {
	        fragment.classList.remove('visible');
	      });
	    }
	  }
	};

	/**
	 * Handles the showing and hiding of slides based on the provided event and options.
	 *
	 * @param {Object} event - The event object containing slide transition details.
	 * @param {Object} options - An object containing configurations for slide appearance management.
	 */
	const showHideSlide = (event, options, names, vars) => {
	  let view = vars.deck.getConfig().view;
	  let etype = event.type;
	  let slides = fromTo(event);
	  if (slides.to) {
	    if (etype == "ready") {
	      slides.to.dataset.appearanceCanStart = true;
	    }
	    let appearevent = slideAppearevent(slides.to, options);
	    if (etype == appearevent || etype == "slidetransitionend" && appearevent == "autoanimate") {
	      slides.to.dataset.appearanceCanStart = true;
	    }

	    // Add experimental Reader mode compatibility, does not have a slidetransitionend event yet
	    if (view == "scroll" && etype == 'slidechanged') {
	      removeStartAttribute(slides, options);
	      turnOffSlideAppearances(slides, options, names);

	      // Add delay to allow for scroll animation to finish
	      setTimeout(() => {
	        slides.to.dataset.appearanceCanStart = true;
	      }, options.delay);
	    }
	    if (etype == "slidetransitionend") {
	      removeStartAttribute(slides, options);
	      turnOffSlideAppearances(slides, options, names);
	    }
	    if (etype == 'slidechanged' && document.body.dataset.exitoverview) {
	      removeStartAttribute(slides, options);
	      slides.to.dataset.appearanceCanStart = true;
	    } else if (etype == 'overviewhidden') {
	      document.body.dataset.exitoverview = true;
	      setTimeout(() => {
	        document.body.removeAttribute('data-exitoverview');
	      }, 500);
	      if (event.currentSlide) {
	        removeStartAttribute(slides, options);
	        slides.to.dataset.appearanceCanStart = true;
	      }
	    }
	  }
	};

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
	      names.baseclass = options.compatibilitybaseclass;
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
	        appearanceArrays.forEach(appearanceArray => {
	          // Add the delays to each appearance in the array
	          addDelay(appearanceArray, options);
	        });
	      }
	    });
	    doneLoading(resolve);
	  };

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
	    vars.regularSections = Array.from(vars.sections).filter(section => !isStack(section));
	    if (/receiver/i.test(window.location.search)) vars.viewport.classList.add('sv');
	    names.eventnames.forEach(eventname => deck.on(eventname, event => {
	      showHideSlide(event, options, names, vars);
	    }));
	    vars.viewport.addEventListener("animationend", event => {
	      event.target.classList.add('animationended');
	    });
	    vars.viewport.addEventListener("fragmenthidden", event => {
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
	        link: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
	        compat: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.compat.css'
	      },
	      compatibility: false,
	      compatibilitybaseclass: 'animated'
	    };
	    options = mergeDeep(defaultOptions, deck.getConfig().appearance || {});
	    return Appear(deck, options, "appearance.js");
	  };
	  return {
	    id: 'appearance',
	    init: init
	  };
	};

	return Plugin;

}));
//# sourceMappingURL=appearance.js.map
