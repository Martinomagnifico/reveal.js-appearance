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

    // Check if str is a valid JSON string (needs the isJSON function)
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
