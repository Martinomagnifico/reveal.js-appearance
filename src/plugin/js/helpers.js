/**
 * Check if a given string is valid JSON.
 * @param {string} str - The string to be checked.
 * @returns {boolean} `true` if the string is valid JSON, otherwise `false`.
 */
export const isJSON = str => {
	try {
		return (JSON.parse(str) && !!str);
	} catch (e) {
		return false;
	}
};

/**
 * Convert a NodeList into an array based on provided selectors.
 * @param {Element} container - The root element to begin querying.
 * @param {string} selectors - A string containing one or more CSS selectors separated by commas.
 * @returns {Element[]} Array of elements that match the given selectors.
 */
export const selectionArray = (container, selectors) => {
	let selections = container.querySelectorAll(selectors);
	let selectionarray = Array.prototype.slice.call(selections);
	return selectionarray;
};

/**
 * Check if an element has child nodes that are `SECTION` elements.
 * @param {Object} param0 - Object with childNodes property.
 * @param {NodeListOf<ChildNode>} param0.childNodes - List of child nodes of the element.
 * @returns {boolean} `true` if the element contains `SECTION` child nodes, otherwise `false`.
 */
export const isStack = ({childNodes}) => {
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
export const copyDataAttributes = ({attributes}, target, not) => {
	[...attributes].filter(({nodeName}) => nodeName.includes('data')).forEach(({nodeName, nodeValue}) => {
		if ((not && nodeName !== not) || !not) {
			target.setAttribute(nodeName, nodeValue);
		}
	});
};

/**
 * Check if the given item is an object and not an array.
 * @param {*} item - The item to be checked.
 * @returns {boolean} `true` if the item is an object and not an array, otherwise `false`.
 */
export const isObject = (item) => {
	return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge multiple objects into a target object.
 * @param {Object} target - Target object to merge values into.
 * @param {...Object} sources - Source objects to merge from.
 * @returns {Object} The merged object.
 */
export const mergeDeep = (target, ...sources) => {
	if (!sources.length) return target;
	const source = sources.shift();

	if (isObject(target) && isObject(source)) {
		for (const key in source) {
			if (isObject(source[key])) {
				if (!target[key]) Object.assign(target, { [key]: {} });
				mergeDeep(target[key], source[key]);
			} else {
				Object.assign(target, { [key]: source[key] });
			}
		}
	}
	return mergeDeep(target, ...sources);
}

/**
 * Resolves the given Promise immediately using setTimeout.
 * @param {Function} resolve - The resolve function of a Promise.
 * @returns {number} The ID value of the timer that is set.
 */
export const doneLoading = (resolve) => {
	return setTimeout(resolve, 0);
}


/**
 * Converts a JavaScript object or a JSON-formatted string to a JSON string.
 *
 * @param {Object|string} str - The input string or object to be converted to a JSON string.
 * @returns {string} The JSON string.
 */
export const toJSONString = (str) => {
	let JSONString = ''

	if (typeof str === "string") str = str.replace(/[“”]/g,'"').replace(/[‘’]/g,"'");

	if (isJSON(str)) {
		JSONString = str
	} else {
		if (typeof str === "object") {
			JSONString = JSON.stringify(str, null, 2)
		} else {
			JSONString = str.trim().replace(/'/g, '"').charAt(0) === "{" ? str.trim().replace(/'/g, '"') : `{${str.trim().replace(/'/g, '"')}}`;
		}
	}
	return JSONString;
}


/**
 * Dynamically loads a resource from the specified URL and calls a callback function when it's loaded.
 * Will not load the resource if it has already been loaded.
 *
 * @param {string} url - The URL of the resource to load.
 * @param {string} type - The type of resource to load.
 * @param {Function} callback - A callback function to be called when the resource is loaded.
 */

export const loadResource = (url, type, callback) => {
	let head = document.querySelector('head');
	let resource;
	let alreadyExists = false;

	if (type === 'script') {
		if (!document.querySelector(`script[src="${url}"]`)) {
			resource = document.createElement('script');
			resource.type = 'text/javascript';
			resource.src = url;
		} else { alreadyExists = true }

	} else if (type === 'stylesheet') {

		if (!document.querySelector(`link[href="${url}"]`)) {
			resource = document.createElement('link');
			resource.rel = 'stylesheet';
			resource.href = url;
		} else { alreadyExists = true }
	}

	if (!alreadyExists) {
		const finish = () => {
			if (typeof callback === 'function') {
			callback.call();
			callback = null;
			}
		};
		resource.onload = finish;
		resource.onreadystatechange = function () {
			if (this.readyState === 'loaded') {
				finish();
			}
		};
		head.appendChild(resource);
	}
}


/**
 * Retrieves the path of a JavaScript file based on its filename.
 *
 * @param {string} fileName - The filename of the script.
 * @returns {string} The path to the plugin's location.
 */
export const pluginPath = (fileName) => {
	let path;
	let pluginScript = document.querySelector(`script[src$="${fileName}"]`);
	if (pluginScript) {
		path = pluginScript.getAttribute("src").slice(0, -1 * (fileName.length));
	} else {
		path = import.meta.url.slice(0, import.meta.url.lastIndexOf('/') + 1);
	}
	return path;
}


/**
 * Check if element 'a' appears before element 'b' in the DOM tree.
 *
 * @param {HTMLElement} a - The first HTML element to compare.
 * @param {HTMLElement} b - The second HTML element to compare.
 * @returns {boolean|undefined} - Returns `true` if element 'a' appears before element 'b', `false` if 'b' appears before 'a', and `undefined` if the elements have no relative position in the DOM tree.
 */
export const isBefore = (a, b) => {
    var all = document.getElementsByTagName('*');

    for (var i = 0; i < all.length; ++i) {
        if (all[i] === a) {
            return true;
        } else if (all[i] === b) {
            return false;
        }
    }
    // If the elements have no relative position in the DOM tree
    return undefined;
};


/**
 * Check the number of occurrences of a specific element in an array.
 *
 * @param {Array} array - The array in which occurrences are to be counted.
 * @param {*} element - The element to be counted within the array.
 * @returns {number} - The count of occurrences of the specified element in the array.
 */
export const checkOccurrence = (array, element) => {
    let counter = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] == element) {
            counter++;
        }
    }
    return counter;
};


/**
 * Create an HTML element from a string of HTML.
 *
 * @param {string} thehtml - The string of HTML to be converted into an HTML element.
 * @returns {HTMLElement | null} - The HTML element created from the provided HTML string. Returns `null` if the element couldn't be created.
 */
export const createNode = (thehtml) => {
    const fragment = document.createRange().createContextualFragment(thehtml);
    return fragment.firstElementChild;
};


/**
 * Gets the index of the given DOM element within its parent's children.
 * @param {HTMLElement} elm - The target element.
 * @returns {number} - The index of the element within its parent's children.
 */
export const getNodeIndex = (elm) => [...elm.parentNode.children].indexOf(elm);


export const debugLog = (options, text) => {
	if (options.debug) console.log(text);
}

