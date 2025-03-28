/**
 * Check if a given string is valid JSON.
 * @param {string} str - The string to be checked.
 * @returns {boolean} `true` if the string is valid JSON, otherwise `false`.
 */
export const isJSON = (str: string): boolean => {
    try {
        return JSON.parse(str) && !!str;
    } catch (e) {
        return false;
    }
};

/********************************************************************************************/

/**
 * Convert a NodeList into an array based on provided selectors.
 * @param {Element} container - The root element to begin querying.
 * @param {string} selectors - A string containing one or more CSS selectors separated by commas.
 * @returns {Element[]} Array of elements that match the given selectors.
 */
export const selectionArray = (container: Element, selectors: string): Element[] => {
    const selections = container.querySelectorAll(selectors);
    return Array.from(selections);
};

/********************************************************************************************/

/**
 * Check if an element has child nodes that are `SECTION` elements.
 * @param {Element} element - The element to check for child nodes.
 * @returns {boolean} `true` if the element contains `SECTION` child nodes, otherwise `false`.
 */
export const isStack = (element: Element): boolean => {
    return Array.from(element.childNodes).some((node) => (node as Element).tagName === "SECTION");
};

/********************************************************************************************/

/**
 * Copy data attributes from a source element to a target element with an optional exception.
 * @param {Element} source - The source element from which attributes are copied.
 * @param {Element} target - The target element to copy attributes to.
 * @param {string} [not] - Optional attribute name to exclude from copying.
 */
export const copyDataAttributes = (source: Element, target: Element, not?: string): void => {
    // Use `Array.from` to ensure correct type inference
    for (const attr of Array.from(source.attributes)) {
        if (attr.nodeName.startsWith("data") && (not ? attr.nodeName !== not : true)) {
            target.setAttribute(attr.nodeName, attr.nodeValue || "");
        }
    }
};

/********************************************************************************************/

/**
 * Check if the given item is an object and not an array.
 * @param {*} item - The item to be checked.
 * @returns {boolean} `true` if the item is an object and not an array, otherwise `false`.
 */
const isObject = (item: unknown): boolean => {
    return item !== null && typeof item === "object" && !Array.isArray(item);
};

/*******************************************************************************************/

/**
 * Deep merge multiple objects into a target object.
 * @param {Record<string, any>} target - Target object to merge values into.
 * @param {...Record<string, any>} sources - Source objects to merge from.
 * @returns {Record<string, any>} The merged object.
 */
export const mergeDeep = <T extends object>(target: T, source: Partial<T>): T => {
    for (const [key, value] of Object.entries(source)) {
        if (value && typeof value === "object") {
            if (!(key in target)) {
                Object.assign(target, { [key]: {} });
            }
            const targetValue = target[key as keyof T];
            if (targetValue && typeof targetValue === "object") {
                mergeDeep(targetValue as object, value as object);
            } else {
                Object.assign(target, { [key]: value });
            }
        } else {
            Object.assign(target, { [key]: value });
        }
    }

    return target;
};

/********************************************************************************************/

/**
 * Resolves the given Promise immediately using setTimeout.
 * @param {Function} resolve - The resolve function of a Promise.
 * @returns {number} The ID value of the timer that is set.
 */
export const doneLoading = (resolve: () => void): ReturnType<typeof setTimeout> => {
    return setTimeout(resolve, 0);
};

/********************************************************************************************/

/**
 * Converts a JavaScript object or a JSON-formatted string to a JSON string.
 *
 * @param {unknown} str - The input string or object to be converted to a JSON string.
 * @returns {string} The JSON string.
 */
export const toJSONString = (str?: unknown): string => {
    if (str == null) {
        return ""; // Return an empty string if `str` is `null` or `undefined`
    }

    let JSONString = "";

    // Handle the case where str is a string
    let modifiedStr = str;
    if (typeof modifiedStr === "string") {
        modifiedStr = modifiedStr.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
    }

    // Check if str is a valid JSON string
    if (isJSON(str as string)) {
        JSONString = str as string;
    } else if (typeof str === "object") {
        JSONString = JSON.stringify(str, null, 2);
    } else if (typeof str === "string") {
        // Handle non-JSON strings
        JSONString =
            str.trim().replace(/'/g, '"').charAt(0) === "{"
                ? str.trim().replace(/'/g, '"')
                : `{${str.trim().replace(/'/g, '"')}}`;
    }

    return JSONString;
};

/********************************************************************************************/

/**
 * Dynamically loads a stylesheet from the specified URL and calls a callback function when it's loaded.
 *
 * @param {string} url - The URL of the stylesheet to load.
 * @param {(() => void) | null} callback - A callback function to be called when the stylesheet is loaded. Can be `null` if no callback is needed.
 */
export const loadStyle = (url: string, callback: (() => void) | null = null): void => {
    const head = document.querySelector("head");
    if (!head) {
        console.error("Head element not found.");
        return;
    }

    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = url;

    // Use onload to determine when the stylesheet is loaded
    style.onload = () => {
        if (callback) {
            callback();
        }
    };

    // Use onerror to handle loading errors
    style.onerror = () => {
        console.error(`Failed to load stylesheet: ${url}`);
    };

    head.appendChild(style);
};

/********************************************************************************************/

/**
 * Dynamically loads a resource from the specified URL and calls a callback function when it's loaded.
 * Will not load the resource if it has already been loaded.
 *
 * @param {string} url - The URL of the resource to load.
 * @param {string} type - The type of resource to load.
 * @param {Function} callback - A callback function to be called when the resource is loaded.
 */

export const loadResource = (
    url: string,
    type: "script" | "stylesheet",
    callback: () => void
): void => {
    const head = document.querySelector("head");
    let resource: HTMLScriptElement | HTMLLinkElement | undefined;
    let alreadyExists = false;

    if (type === "script") {
        if (!document.querySelector(`script[src="${url}"]`)) {
            resource = document.createElement("script");
            resource.type = "text/javascript";
            resource.src = url;
        } else {
            alreadyExists = true;
        }
    } else if (type === "stylesheet") {
        if (!document.querySelector(`link[href="${url}"]`)) {
            resource = document.createElement("link");
            resource.rel = "stylesheet";
            resource.href = url;
        } else {
            alreadyExists = true;
        }
    }

    if (!alreadyExists) {
        const finish = () => {
            if (typeof callback === "function") {
                callback();
            }
        };
        if (resource) {
            resource.onload = finish;

            if (resource instanceof HTMLScriptElement || resource instanceof HTMLLinkElement) {
                resource.onload = finish;
            }
            if (head) {
                head.appendChild(resource);
            } else {
                console.error("Head element not found.");
            }
        }
    }
};

/********************************************************************************************/

/**
 * Retrieves the path of a JavaScript file based on its filename.
 * @param {string} fileName - The filename of the script.
 * @returns {string} The path to the plugin's location.
 */

const isImportMetaUrlSupported = (() => {
    try {
        return !!import.meta.url;
    } catch {
        return false;
    }
})();

export const pluginPath = (fileName: string): string => {
    let path: string;
    const pluginScript = document.querySelector(`script[src$="${fileName}"]`);
    if (pluginScript) {
        path = pluginScript.getAttribute("src")?.slice(0, -fileName.length) || "";
    } else if (isImportMetaUrlSupported) {
        path = import.meta.url.slice(0, import.meta.url.lastIndexOf("/") + 1);
    } else {
        path = (document.currentScript as HTMLScriptElement)?.src.slice(0, -fileName.length) || "";
    }
    return path;
};

/********************************************************************************************/

/**
 * Check if element 'a' appears before element 'b' in the DOM tree.
 * @param {HTMLElement} a - The first HTML element to compare.
 * @param {HTMLElement} b - The second HTML element to compare.
 * @returns {boolean | undefined} `true` if element 'a' appears before element 'b', `false` if 'b' appears before 'a', and `undefined` if the elements have no relative position in the DOM tree.
 */
export const isBefore = (a: HTMLElement, b: HTMLElement): boolean | undefined => {
    const all = document.getElementsByTagName("*");

    for (let i = 0; i < all.length; ++i) {
        if (all[i] === a) {
            return true;
        }
        if (all[i] === b) {
            return false;
        }
    }
    return undefined;
};

/********************************************************************************************/

/**
 * Check the number of occurrences of a specific element in an array.
 * @param {Array<any>} array - The array in which occurrences are to be counted.
 * @param {any} element - The element to be counted within the array.
 * @returns {number} The count of occurrences of the specified element in the array.
 */
export const checkOccurrence = (array: Array<unknown>, element: unknown): number => {
    let counter = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] === element) {
            counter++;
        }
    }
    return counter;
};

/********************************************************************************************/

/**
 * Create an HTML element from a string of HTML.
 * @param {string} thehtml - The string of HTML to be converted into an HTML element.
 * @returns {HTMLElement | null} The HTML element created from the provided HTML string. Returns `null` if the element couldn't be created.
 */
export const createNode = (thehtml: string): HTMLElement | null => {
    const fragment = document.createRange().createContextualFragment(thehtml);
    return fragment.firstElementChild as HTMLElement | null;
};

/************************************************************/

/**
 * Santize a string by removing all non-alphanumeric characters and converting to lowercase.
 * @param {string} text - The text to be sanitized.
 */

export const sanitizeText = (text: string): string => {
    return text.toLowerCase()
        .replace(/\s+/g, '')
        .replace(/[^\p{L}\p{N}-]/gu, '');
};

/************************************************************/

/**
 * Debug logging utility that only logs if debugging is enabled.
 * @param {Object} options - The options object containing the debug flag.
 * @param {string} text - The text to be logged.
 */
export const debugLog = (options: { debug: boolean }, text: string): void => {
    if (options.debug) console.log(text);
};

/************************************************************/

/**
 * Debug logging utility that only logs if debugging is enabled.
 * @param isDebug - Enables or disables debug mode.
 * @param label - Custom label to include in the debug logs (default: "DEBUG")..
 * @param args - The messages or objects to log.
 */
class Debug {
    private debugMode = false;
    private label = "DEBUG";
    initialize(isDebug: boolean, label = "DEBUG"): void {
        this.debugMode = isDebug;
        this.label = label;
    }
    log = (...args: unknown[]): void => {
        if (this.debugMode) console.log(...args);
    };
    warn = (...args: unknown[]): void => {
        if (this.debugMode) console.warn(...args);
    };
    error = (...args: unknown[]): void => {
        if (this.debugMode) console.error(...args);
    };
    info = (...args: unknown[]): void => {
        if (this.debugMode) console.info(...args);
    }

    labellog = (...args: unknown[]): void => {
        if (this.debugMode) console.log(`[${this.label}]:`, ...args);
    };
    labelwarn = (...args: unknown[]): void => {
        if (this.debugMode) console.warn(`[${this.label}]:`, ...args);
    };
    labelerror = (...args: unknown[]): void => {
        if (this.debugMode) console.error(`[${this.label}]:`, ...args);
    };
    labelinfo = (...args: unknown[]): void => {
        if (this.debugMode) console.info(`[${this.label}]:`, ...args);
    };

    group = (...args: unknown[]): void => {
        if (this.debugMode) console.group(`[${this.label}]:`, ...args);
    };
    groupEnd = (...args: unknown[]): void => {
        if (this.debugMode) console.groupEnd();
    };
}

export const debug = new Debug();