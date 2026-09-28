import { configTools, pluginDebug as debug } from "reveal.js-plugintoolkit";
import type { AnimationOption } from "../config";

/**
 * Decode HTML entities
 */
const decodeHtmlEntities = (str: string): string => {
	const textarea = document.createElement("textarea");
	textarea.innerHTML = str;
	return textarea.value;
};

/**
 * Parse autoelements configuration from various sources
 * Handles strings and objects. Curly quotes (from Quarto's YAML header) and
 * single quotes (from Markdown attributes) are straightened by `toJSONString`.
 *
 * @param input The input to parse (string, object, boolean, or null)
 * @param isFromAttribute Whether this input comes from a data attribute (triggers entity decoding)
 * @returns Parsed autoelements object or null
 */
export const parseAutoElements = (
	input: string | Record<string, AnimationOption> | boolean | null,
	isFromAttribute: boolean = false
): Record<string, AnimationOption> | null => {
	if (!input) return null;

	// If it's already an object, return it
	if (typeof input === "object" && input !== null && !Array.isArray(input)) {
		return input;
	}

	// If it's a boolean, return null (invalid)
	if (typeof input === "boolean") {
		return null;
	}

	// If it's a string, parse it
	if (typeof input === "string") {
		try {
			// For attributes, decode HTML entities
			const processedString = isFromAttribute ? decodeHtmlEntities(input) : input;

			return JSON.parse(configTools.toJSONString(processedString));
		} catch (e) {
			debug.log(`Error parsing autoelements: ${e} (${input})`);
			return null;
		}
	}

	return null;
};
